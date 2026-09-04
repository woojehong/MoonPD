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
      base.child("current").set({ cellKey: cellKey, reveal: 0, answer: false });
    },
    closeCell: function () {
      base.child("current").set({ cellKey: "", reveal: 0, answer: false });
    },
    setReveal: function (n) { base.child("current/reveal").set(n); },
    showAnswer: function (v) { base.child("current/answer").set(!!v); },

    // ----- scoring / capture -----
    award: function (cellKey, teamId) {
      var points = pointsOf(cellKey);
      base.child("teams").once("value").then(function (ts) {
        var teams = ts.val() || {};
        base.child("owners/" + cellKey).once("value").then(function (os) {
          var prevOwner = os.val();
          if (prevOwner === teamId) return; // already owned by this team
          var updates = {};
          if (prevOwner && teams[prevOwner]) {
            updates["teams/" + prevOwner + "/score"] = (teams[prevOwner].score || 0) - points;
          }
          if (teams[teamId]) {
            updates["teams/" + teamId + "/score"] = (teams[teamId].score || 0) + points;
          }
          updates["owners/" + cellKey] = teamId;
          var logId = base.child("log").push().key;
          updates["log/" + logId] = {
            cellKey: cellKey, teamId: teamId, prevOwner: prevOwner || null,
            points: points, ts: Date.now()
          };
          base.update(updates);
        });
      });
    },

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
          updates["log/" + logId] = {
            cellKey: cellKey, teamId: null, prevOwner: owner, points: points, ts: Date.now()
          };
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
            if (e.teamId && teams[e.teamId]) {
              updates["teams/" + e.teamId + "/score"] = (teams[e.teamId].score || 0) - e.points;
            }
            if (e.prevOwner && teams[e.prevOwner]) {
              updates["teams/" + e.prevOwner + "/score"] = (teams[e.prevOwner].score || 0) + e.points;
            }
            updates["owners/" + e.cellKey] = e.prevOwner || null;
            updates["log/" + ch.key] = null;
            base.update(updates);
          });
        });
      });
    },

    resetAll: function () {
      base.update({ current: { cellKey: "", reveal: 0, answer: false }, owners: null, log: null });
    },
    resetScores: function () {
      base.child("teams").once("value").then(function (ts) {
        var teams = ts.val() || {}; var updates = {};
        Object.keys(teams).forEach(function (id) { updates["teams/" + id + "/score"] = 0; });
        updates["owners"] = null; updates["log"] = null;
        base.update(updates);
      });
    }
  };

  window.MoonStore = Store;
})();
