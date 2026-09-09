// MoonPD - Realtime state store (Firebase RTDB, compat SDK)
// State shape at rooms/main:
//   teams:  { [id]: { name, color, score, ts } }
//   activeRound: "r1"
//   current: { cellKey, reveal, answer }   // what the display currently shows
//   owners:  { [cellKey]: teamId }         // which team captured each cell
//   log:     { [pushId]: { cellKey, teamId, prevOwner, points, ts } }
(function () {
  var ROOM = "main";
  var db = firebase.database();
  var base = db.ref("rooms/" + ROOM);

  function pointsOf(cellKey) {
    var parts = String(cellKey).split("|");
    return parseInt(parts[parts.length - 1], 10) || 0;
  }

  var Store = {
    base: base,
    pointsOf: pointsOf,

    subscribe: function (cb) {
      base.on("value", function (snap) { cb(snap.val() || {}); });
    },

    // ----- teams -----
    addTeam: function (name, color) {
      base.child("teams").push({ name: name, color: color, score: 0, ts: Date.now() });
    },
    updateTeam: function (id, patch) { base.child("teams/" + id).update(patch); },
    removeTeam: function (id) { base.child("teams/" + id).remove(); },

    // ----- round & current question -----
    setActiveRound: function (roundId) {
      base.child("activeRound").set(roundId);
      this.closeCell();
    },
    openCell: function (cellKey) {
      base.child("current").set({ cellKey: cellKey, reveal: 0, answer: false, show: false });
      base.child("used/" + cellKey).set(true);
    },
    setShow: function (v) { base.child("current/show").set(!!v); },
    closeCell: function () {
      base.child("current").set({ cellKey: "", reveal: 0, answer: false });
    },
    setReveal: function (n) { base.child("current/reveal").set(n); },
    showAnswer: function (v) { base.child("current/answer").set(!!v); },

    // ----- scoring -----
    // 정답: 점수 가산 + 칸 팀색 점령 + 문제 종료
    award: function (cellKey, teamId) {
      var points = pointsOf(cellKey);
      base.child("teams").once("value").then(function (ts) {
        var teams = ts.val() || {};
        base.child("owners/" + cellKey).once("value").then(function (os) {
          var prevOwner = os.val();
          var updates = {};
          if (prevOwner && prevOwner !== teamId && teams[prevOwner]) {
            updates["teams/" + prevOwner + "/score"] = (teams[prevOwner].score || 0) - points;
          }
          if (prevOwner !== teamId && teams[teamId]) {
            updates["teams/" + teamId + "/score"] = (teams[teamId].score || 0) + points;
          }
          updates["owners/" + cellKey] = teamId;
          var logId = base.child("log").push().key;
          updates["log/" + logId] = {
            type: "correct", cellKey: cellKey, teamId: teamId, prevOwner: prevOwner || null,
            points: points, ts: Date.now()
          };
          base.update(updates);
        });
      });
    },

    // 오답: 해당 문제 점수만큼 감점 (문제는 계속 진행)
    wrong: function (cellKey, teamId) {
      var points = pointsOf(cellKey);
      base.child("teams/" + teamId).once("value").then(function (s) {
        var t = s.val(); if (!t) return;
        var updates = {};
        updates["teams/" + teamId + "/score"] = (t.score || 0) - points;
        var logId = base.child("log").push().key;
        updates["log/" + logId] = { type: "wrong", cellKey: cellKey, teamId: teamId, points: points, ts: Date.now() };
        base.update(updates);
      });
    },

    // 돌발 보너스: 특정 팀 가산 (감점 없음)
    bonus: function (cellKey, teamId, amt) {
      base.child("teams/" + teamId).once("value").then(function (s) {
        var t = s.val(); if (!t) return;
        var updates = {};
        updates["teams/" + teamId + "/score"] = (t.score || 0) + (amt || 0);
        var logId = base.child("log").push().key;
        updates["log/" + logId] = { type: "bonus", cellKey: cellKey || "", teamId: teamId, points: (amt || 0), ts: Date.now() };
        base.update(updates);
      });
    },

    // 칸 점령 수동 해제
    clearCell: function (cellKey) {
      var points = pointsOf(cellKey);
      base.child("teams").once("value").then(function (ts) {
        var teams = ts.val() || {};
        base.child("owners/" + cellKey).once("value").then(function (os) {
          var owner = os.val();
          if (!owner) return;
          var updates = {};
          if (teams[owner]) updates["teams/" + owner + "/score"] = (teams[owner].score || 0) - points;
          updates["owners/" + cellKey] = null;
          var logId = base.child("log").push().key;
          updates["log/" + logId] = { type: "clear", cellKey: cellKey, teamId: owner, points: points, ts: Date.now() };
          base.update(updates);
        });
      });
    },

    undo: function () {
      base.child("log").orderByKey().limitToLast(1).once("value").then(function (s) {
        s.forEach(function (ch) {
          var e = ch.val();
          base.child("teams").once("value").then(function (ts) {
            var teams = ts.val() || {};
            var updates = {};
            var sc = function (id) { return (teams[id] && teams[id].score) || 0; };
            if (e.type === "wrong") {
              if (e.teamId && teams[e.teamId]) updates["teams/" + e.teamId + "/score"] = sc(e.teamId) + e.points;
            } else if (e.type === "bonus") {
              if (e.teamId && teams[e.teamId]) updates["teams/" + e.teamId + "/score"] = sc(e.teamId) - e.points;
            } else if (e.type === "clear") {
              if (e.teamId && teams[e.teamId]) updates["teams/" + e.teamId + "/score"] = sc(e.teamId) + e.points;
              updates["owners/" + e.cellKey] = e.teamId;
            } else {
              if (e.teamId && teams[e.teamId]) updates["teams/" + e.teamId + "/score"] = sc(e.teamId) - e.points;
              if (e.prevOwner && teams[e.prevOwner]) updates["teams/" + e.prevOwner + "/score"] = sc(e.prevOwner) + e.points;
              updates["owners/" + e.cellKey] = e.prevOwner || null;
            }
            updates["log/" + ch.key] = null;
            base.update(updates);
          });
        });
      });
    },

    resetGame: function () {
      base.update({ teams: null, owners: null, used: null, log: null, current: { cellKey: "", reveal: 0, answer: false } });
    },
    resetAll: function () {
      base.update({ current: { cellKey: "", reveal: 0, answer: false }, owners: null, used: null, log: null });
    },
    resetScores: function () {
      base.child("teams").once("value").then(function (ts) {
        var teams = ts.val() || {}; var updates = {};
        Object.keys(teams).forEach(function (id) { updates["teams/" + id + "/score"] = 0; });
        updates["owners"] = null; updates["used"] = null; updates["log"] = null;
        base.update(updates);
      });
    }
  };

  window.MoonStore = Store;
})();
