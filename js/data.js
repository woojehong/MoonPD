// MoonPD - Question data. 제시어(clue)는 대표님이 직접 채움(수진은 제안하지 않음).
//   음악: youtubeId+start(문제 재생) / ansYoutubeId+ansStart(정답 재생, 없으면 문제와 동일)
//   인물(추후 단순 뷰어로 재구성 예정): image
function mkImg(prefix){ var q={}; [10,20,30,40,50].forEach(function(p){ q[p]={type:"image",clue:"",answer:["샘플 "+p],image:"images/"+prefix+"_"+p+".jpg"}; }); return q; }
function mkMusic(prefix){ var q={}; [10,20,30,40,50].forEach(function(p){ q[p]={type:"music",clue:"",answer:["샘플 "+p],youtubeId:"",start:0,ansYoutubeId:"",ansStart:0}; }); return q; }
window.MOONPD_DATA = {
  pointTiers: [10, 20, 30, 40, 50],
  rounds: [
    {
      id: "r1", name: "1라운드 · 인물",
      categories: [
        { id: "c_actor",     name: "배우",   questions: mkImg("r1_actor") },
        { id: "c_singer",    name: "가수",   questions: mkImg("r1_singer") },
        { id: "c_sport",     name: "스포츠", questions: mkImg("r1_sport") },
        { id: "c_character", name: "캐릭터", questions: mkImg("r1_char") },
        { id: "c_etc",       name: "기타",   questions: mkImg("r1_etc") }
      ]
    },
    {
      id: "r2", name: "2라운드 · 음악",
      categories: [
        { id: "c_pre80",   name: "80년대 이전", questions: mkMusic("r2_pre80") },
        { id: "c_90",      name: "90년대",      questions: mkMusic("r2_90") },
        { id: "c_00",      name: "00년대",      questions: mkMusic("r2_00") },
        { id: "c_10",      name: "10년대",      questions: mkMusic("r2_10") },
        { id: "c_20",      name: "20년대",      questions: mkMusic("r2_20") },
        { id: "c_2026",    name: "2026",        questions: mkMusic("r2_2026") },
        { id: "c_classic", name: "클래식",      questions: mkMusic("r2_classic") },
        { id: "c_ost",     name: "OST",  questions: mkMusic("r2_ost") }
      ]
    }
  ]
};
// 카테고리마다 보너스 셀(배점 없음, 혜택). 혜택 문구는 대표님이 지정.
window.MOONPD_DATA.rounds.forEach(function(r){ (r.categories||[]).forEach(function(c){ if(!c.questions.bonus){ c.questions.bonus={ type:"music", benefit:"특별 혜택 (추후 지정)", clue:"", answer:["샘플"], youtubeId:"", start:0, ansYoutubeId:"", ansStart:0 }; } }); });
// 인물 배우 10점 샘플(공유) - 인물은 추후 재구성 예정
window.MOONPD_DATA.rounds[0].categories[0].questions[10] = { type:"image", clue:"에어드롭", answer:["공유"], image:"images/r1_actor_10.jpg" };
// 2026 카테고리 실제 음원(공식 오디오, start=0 전주부터). 정답=현재 동일 음원, ansStart(후렴)·제시어는 추후 지정.
(function(){
  var r2=window.MOONPD_DATA.rounds.find(function(r){return r.id==="r2";});
  var c=r2.categories.find(function(x){return x.id==="c_2026";});
  c.questions[10]  ={type:"music",clue:"",answer:["Golden","골든"],           youtubeId:"q0rY1HRwOsw",start:0,ansYoutubeId:"q0rY1HRwOsw",ansStart:0};
  c.questions[20]  ={type:"music",clue:"",answer:["Blue Valentine","블루 발렌타인"],youtubeId:"k1WbiVmq3-U",start:0,ansYoutubeId:"k1WbiVmq3-U",ansStart:0};
  c.questions[30]  ={type:"music",clue:"",answer:["Good Goodbye","굿굿바이"],    youtubeId:"-COVx822UK0",start:0,ansYoutubeId:"-COVx822UK0",ansStart:0};
  c.questions[40]  ={type:"music",clue:"",answer:["REDRED","레드레드"],         youtubeId:"tSSI7ntBKIs",start:0,ansYoutubeId:"tSSI7ntBKIs",ansStart:0};
  c.questions[50]  ={type:"music",clue:"",answer:["Catch Catch","캐치 캐치"],    youtubeId:"uOotfe0KFxU",start:0,ansYoutubeId:"uOotfe0KFxU",ansStart:0};
  c.questions.bonus={type:"music",benefit:"특별 혜택 (추후 지정)",clue:"",answer:["Bad","배드"],youtubeId:"OHxYsZgq_6U",start:0,ansYoutubeId:"OHxYsZgq_6U",ansStart:0};
})();
// 20년대(2020~2025) 음원 링크. start=0(전주부터). 정답=현재 동일, ansStart(후렴)·제시어 추후.
(function(){
  var r2=window.MOONPD_DATA.rounds.find(function(r){return r.id==="r2";});
  var c=r2.categories.find(function(x){return x.id==="c_20";});
  c.questions[10]  ={type:"music",clue:"",answer:["신호등","Traffic Light"],   youtubeId:"SK6Sm2Ki9tI",start:0,ansYoutubeId:"SK6Sm2Ki9tI",ansStart:0};
  c.questions[20]  ={type:"music",clue:"",answer:["Blinding Lights"],           youtubeId:"1nILQE2pscY",start:0,ansYoutubeId:"1nILQE2pscY",ansStart:0};
  c.questions[30]  ={type:"music",clue:"",answer:["퀸카","Queencard"],          youtubeId:"JuJBr9v6BGA",start:0,ansYoutubeId:"JuJBr9v6BGA",ansStart:0};
  c.questions[40]  ={type:"music",clue:"",answer:["사건의 지평선","Event Horizon"],youtubeId:"N7r1BYQ3vJ0",start:0,ansYoutubeId:"N7r1BYQ3vJ0",ansStart:0};
  c.questions[50]  ={type:"music",clue:"",answer:["손오공","Super"],            youtubeId:"-GQg25oP0S4",start:0,ansYoutubeId:"-GQg25oP0S4",ansStart:0};
  c.questions.bonus={type:"music",benefit:"특별 혜택 (추후 지정)",clue:"",answer:["APT.","아파트"],youtubeId:"NdURL6QjuLM",start:0,ansYoutubeId:"NdURL6QjuLM",ansStart:0};
})();
// 10년대(2010~2019) 음원 + 20년대 50점 ON 교체. start=0. 후렴·제시어·혜택 추후.
(function(){
  var r2=window.MOONPD_DATA.rounds.find(function(r){return r.id==="r2";});
  var c10=r2.categories.find(function(x){return x.id==="c_10";});
  c10.questions[10]  ={type:"music",clue:"",answer:["판타스틱 베이비","Fantastic Baby"],youtubeId:"mKyobEw3s90",start:0,ansYoutubeId:"mKyobEw3s90",ansStart:0};
  c10.questions[20]  ={type:"music",clue:"",answer:["아주 NICE","Very Nice"],youtubeId:"6oMQS6Pc6wA",start:0,ansYoutubeId:"6oMQS6Pc6wA",ansStart:0};
  c10.questions[30]  ={type:"music",clue:"",answer:["Shape of You"],youtubeId:"MmWy_WQj43E",start:0,ansYoutubeId:"MmWy_WQj43E",ansStart:0};
  c10.questions[40]  ={type:"music",clue:"",answer:["넌 is 뭔들","You're the Best"],youtubeId:"3oQ1vk_1hbs",start:0,ansYoutubeId:"3oQ1vk_1hbs",ansStart:0};
  c10.questions[50]  ={type:"music",clue:"",answer:["그건 아마 우리의 잘못은 아닐 거야","Maybe It's Not Our Fault"],youtubeId:"IRNBtocmQ58",start:0,ansYoutubeId:"IRNBtocmQ58",ansStart:0};
  c10.questions.bonus={type:"music",benefit:"특별 혜택 (추후 지정)",clue:"",answer:["선물","Gift"],youtubeId:"qYYJqWsBb1U",start:0,ansYoutubeId:"qYYJqWsBb1U",ansStart:0};
  var c20=r2.categories.find(function(x){return x.id==="c_20";});
  c20.questions[50] ={type:"music",clue:"",answer:["ON"],youtubeId:"mPVDGOVjRQ0",start:0,ansYoutubeId:"mPVDGOVjRQ0",ansStart:0};
})();
// 00년대(2000~2009) 음원. start=0. 후렴·제시어·혜택 추후.
(function(){
  var r2=window.MOONPD_DATA.rounds.find(function(r){return r.id==="r2";});
  var c=r2.categories.find(function(x){return x.id==="c_00";});
  c.questions[10]  ={type:"music",clue:"",answer:["Poker Face","포커페이스"],youtubeId:"s1A3X_VA-us",start:0,ansYoutubeId:"s1A3X_VA-us",ansStart:0};
  c.questions[20]  ={type:"music",clue:"",answer:["주문","MIROTIC","주문 - MIROTIC"],youtubeId:"HtJS32n6LNQ",start:0,ansYoutubeId:"HtJS32n6LNQ",ansStart:0};
  c.questions[30]  ={type:"music",clue:"",answer:["It's Raining","잇츠 레이닝"],youtubeId:"j492N1OX47I",start:0,ansYoutubeId:"j492N1OX47I",ansStart:0};
  c.questions[40]  ={type:"music",clue:"",answer:["어머나"],youtubeId:"P3Gde3RwTzA",start:0,ansYoutubeId:"P3Gde3RwTzA",ansStart:0};
  c.questions[50]  ={type:"music",clue:"",answer:["감사","Thanks"],youtubeId:"WvJb1PtpHB4",start:0,ansYoutubeId:"WvJb1PtpHB4",ansStart:0};
  c.questions.bonus={type:"music",benefit:"특별 혜택 (추후 지정)",clue:"",answer:["유혹의 소나타","Sonata of Temptation"],youtubeId:"Q_plceCKQX8",start:0,ansYoutubeId:"Q_plceCKQX8",ansStart:0};
})();
// 90년대(1990~1999) 음원. 옛곡이라 일부 MV/라이브/가사영상. start=0. 후렴·제시어·혜택 추후.
(function(){
  var r2=window.MOONPD_DATA.rounds.find(function(r){return r.id==="r2";});
  var c=r2.categories.find(function(x){return x.id==="c_90";});
  c.questions[10]  ={type:"music",clue:"",answer:["어머님께","To My Mother"],youtubeId:"OBERys7Dtt4",start:0,ansYoutubeId:"OBERys7Dtt4",ansStart:0};
  c.questions[20]  ={type:"music",clue:"",answer:["그대에게"],youtubeId:"SVxiqGiLMCM",start:0,ansYoutubeId:"SVxiqGiLMCM",ansStart:0};
  c.questions[30]  ={type:"music",clue:"",answer:["DOC와 춤을","Dance with DOC"],youtubeId:"tV4PQOGJo3U",start:0,ansYoutubeId:"tV4PQOGJo3U",ansStart:0};
  c.questions[40]  ={type:"music",clue:"",answer:["기억의 습작"],youtubeId:"3Jj4jcKsbs4",start:0,ansYoutubeId:"3Jj4jcKsbs4",ansStart:0};
  c.questions[50]  ={type:"music",clue:"",answer:["하여가"],youtubeId:"AxXLSutFm7w",start:0,ansYoutubeId:"AxXLSutFm7w",ansStart:0};
  c.questions.bonus={type:"music",benefit:"특별 혜택 (추후 지정)",clue:"",answer:["깊은 슬픔"],youtubeId:"ebkoSFxfO5g",start:0,ansYoutubeId:"ebkoSFxfO5g",ansStart:0};
})();
// 80년대 이전 음원. start=0. 후렴·제시어·혜택 추후.
(function(){
  var r2=window.MOONPD_DATA.rounds.find(function(r){return r.id==="r2";});
  var c=r2.categories.find(function(x){return x.id==="c_pre80";});
  c.questions[10]  ={type:"music",clue:"",answer:["Hey Jude","헤이 주드"],youtubeId:"RhfHed14cNc",start:0,ansYoutubeId:"RhfHed14cNc",ansStart:0};
  c.questions[20]  ={type:"music",clue:"",answer:["거리에서"],youtubeId:"oy9BSiKIY4E",start:0,ansYoutubeId:"oy9BSiKIY4E",ansStart:0};
  c.questions[30]  ={type:"music",clue:"",answer:["Somebody to Love"],youtubeId:"kijpcUv-b8M",start:0,ansYoutubeId:"kijpcUv-b8M",ansStart:0};
  c.questions[40]  ={type:"music",clue:"",answer:["비처럼 음악처럼"],youtubeId:"eYiDIeSk3Go",start:0,ansYoutubeId:"eYiDIeSk3Go",ansStart:0};
  c.questions[50]  ={type:"music",clue:"",answer:["사랑하기 때문에"],youtubeId:"y4J3WEtMIk0",start:0,ansYoutubeId:"y4J3WEtMIk0",ansStart:0};
  c.questions.bonus={type:"music",benefit:"특별 혜택 (추후 지정)",clue:"",answer:["아파트","A.P.T"],youtubeId:"WvP1g7eic0U",start:0,ansYoutubeId:"WvP1g7eic0U",ansStart:0};
})();
// 클래식 음원(유명 연주 영상). start=0. 후렴/유명부분(정답)·제시어·혜택 추후.
(function(){
  var r2=window.MOONPD_DATA.rounds.find(function(r){return r.id==="r2";});
  var c=r2.categories.find(function(x){return x.id==="c_classic";});
  c.questions[10]  ={type:"music",clue:"",answer:["봄","사계 봄","비발디 사계 봄","Spring"],youtubeId:"kNGEsp5hIBk",start:0,ansYoutubeId:"kNGEsp5hIBk",ansStart:0};
  c.questions[20]  ={type:"music",clue:"",answer:["운명","운명 교향곡","베토벤 교향곡 5번"],youtubeId:"e3_saVySqjU",start:0,ansYoutubeId:"e3_saVySqjU",ansStart:0};
  c.questions[30]  ={type:"music",clue:"",answer:["백조의 호수","Swan Lake"],youtubeId:"9cNQFB0TDfY",start:0,ansYoutubeId:"9cNQFB0TDfY",ansStart:0};
  c.questions[40]  ={type:"music",clue:"",answer:["신세계 교향곡","신세계로부터","New World Symphony"],youtubeId:"pGdtkUiKaA8",start:0,ansYoutubeId:"pGdtkUiKaA8",ansStart:0};
  c.questions[50]  ={type:"music",clue:"",answer:["송어","Die Forelle","The Trout"],youtubeId:"bt49fudwTuk",start:0,ansYoutubeId:"bt49fudwTuk",ansStart:0};
  c.questions.bonus={type:"music",benefit:"특별 혜택 (추후 지정)",clue:"",answer:["캐논","Canon in D","파헬벨 캐논"],youtubeId:"9nX_ReyaetE",start:0,ansYoutubeId:"9nX_ReyaetE",ansStart:0};
})();
// OST(구 동요&OST) 음원. 정답=곡제목+작품명. start=0. 후렴·제시어·혜택 추후.
(function(){
  var r2=window.MOONPD_DATA.rounds.find(function(r){return r.id==="r2";});
  var c=r2.categories.find(function(x){return x.id==="c_ost";});
  c.questions[10]  ={type:"music",clue:"",answer:["Let It Go","렛잇고","겨울왕국","Frozen"],youtubeId:"YVVTZgwYwVo",start:0,ansYoutubeId:"YVVTZgwYwVo",ansStart:0};
  c.questions[20]  ={type:"music",clue:"",answer:["Under the Sea","언더 더 씨","인어공주","The Little Mermaid"],youtubeId:"GC_mV1IpjWA",start:0,ansYoutubeId:"GC_mV1IpjWA",ansStart:0};
  c.questions[30]  ={type:"music",clue:"",answer:["You've Got a Friend in Me","토이 스토리","Toy Story"],youtubeId:"1MPZRcyTrcU",start:0,ansYoutubeId:"1MPZRcyTrcU",ansStart:0};
  c.questions[40]  ={type:"music",clue:"",answer:["Butterfly","버터플라이","디지몬","디지몬 어드벤처"],youtubeId:"9eu1pN1-NCk",start:0,ansYoutubeId:"9eu1pN1-NCk",ansStart:0};
  c.questions[50]  ={type:"music",clue:"",answer:["인생의 회전목마","하울의 움직이는 성","Howl's Moving Castle"],youtubeId:"dHpakYcVh4I",start:0,ansYoutubeId:"dHpakYcVh4I",ansStart:0};
  c.questions.bonus={type:"music",benefit:"특별 혜택 (추후 지정)",clue:"",answer:["슈퍼히어로 아기상어","아기상어 내 꿈은 슈퍼 히어로","상어가족"],youtubeId:"aUVZoWU2Bc8",start:0,ansYoutubeId:"aUVZoWU2Bc8",ansStart:0};
})();
// 정답 공개용 뮤직비디오 링크(문제는 음원 유지). 공식 MV 확실한 곡만. 나머지는 음원 그대로.
(function(){
  var R=window.MOONPD_DATA.rounds.find(function(r){return r.id==="r2";});
  function set(catId,tier,ansId){ var c=R.categories.find(function(x){return x.id===catId;}); if(c&&c.questions[tier]) c.questions[tier].ansYoutubeId=ansId; }
  set("c_2026",10,"hohuFW0zQUw"); set("c_2026",20,"EmeW6li6bbo"); set("c_2026",30,"Qe8fa4b5xNU"); set("c_2026",40,"U6BDbXIah-Y"); set("c_2026","bonus","-q_S27LbNKU");
  set("c_20",10,"SK6Sm2Ki9tI"); set("c_20",20,"4NRXx6U8ABQ"); set("c_20",30,"7HDeem-JaSY"); set("c_20",40,"BBdC1rl5sKY"); set("c_20",50,"mPVDGOVjRQ0"); set("c_20","bonus","ekr2nIex040");
  set("c_10",10,"AAbokV76tkU"); set("c_10",20,"J-wFp43XOrA"); set("c_10",30,"JGwWNGJdvx8"); set("c_10",40,"kBskUGqgTTs"); set("c_10",50,"IRNBtocmQ58"); set("c_10","bonus","qYYJqWsBb1U");
  set("c_00",10,"bESGLojNYSo"); set("c_00",20,"HtJS32n6LNQ"); set("c_00",30,"j492N1OX47I"); set("c_00",40,"P3Gde3RwTzA"); set("c_00",50,"WvJb1PtpHB4"); set("c_00","bonus","Q_plceCKQX8");
  set("c_90",10,"OBERys7Dtt4"); set("c_90",30,"u7QDVHeUX9o"); set("c_90",40,"EVOaVtPa4cA"); set("c_90",50,"L-AxO7EPU8c");
  set("c_pre80",10,"A_MjCqQoLLA"); set("c_pre80",30,"kijpcUv-b8M");
  set("c_ost",10,"YVVTZgwYwVo"); set("c_ost",20,"GC_mV1IpjWA");
})();
// 20년대 30점: 퀸카 → 리센느 LOVE ATTACK (문제=음원, 정답=MV)
(function(){ var R=window.MOONPD_DATA.rounds.find(function(r){return r.id==="r2";}); var c=R.categories.find(function(x){return x.id==="c_20";}); c.questions[30]={type:"music",clue:"",answer:["LOVE ATTACK","러브 어택","러브어택"],youtubeId:"_IZiw5uqFz8",start:0,ansYoutubeId:"9XttLI0oH0I",ansStart:0}; })();
// 제시어(clue) 일괄 입력 + 보너스 혜택 멘트(APT/BAD 초안). 정답공개 후 혜택 멘트가 화면에 표시됨.
(function(){
 var R=window.MOONPD_DATA.rounds.find(function(r){return r.id==="r2";});
 function C(cat,tier,clue){ var c=R.categories.find(function(x){return x.id===cat;}); if(c&&c.questions[tier]) c.questions[tier].clue=clue; }
 function B(cat,tier,ben){ var c=R.categories.find(function(x){return x.id===cat;}); if(c&&c.questions[tier]) c.questions[tier].benefit=ben; }
 C("c_2026",10,"⬆️"); C("c_2026",20,"2/14"); C("c_2026",40,"도가니"); C("c_2026",50,"중견수"); C("c_2026","bonus","챌린지");
 C("c_20",10,"3초"); C("c_20",20,"🇨🇦"); C("c_20",30,"역주행"); C("c_20",40,"과학"); C("c_20",50,"타이틀 곡"); C("c_20","bonus","게임");
 C("c_10",10,"와우"); C("c_10",20,"조준호"); C("c_10",30,"1991년생");
 C("c_00",10,"솔로"); C("c_00",20,"완전체"); C("c_00",30,"습"); C("c_00",40,"😲"); C("c_00",50,"🙏");
 C("c_90",10,"자장면"); C("c_90",20,"응원가"); C("c_90",30,"함상우"); C("c_90",40,"프로젝트 그룹"); C("c_90",50,"고려");
 C("c_pre80",10,"벨링엄"); C("c_pre80",20,"성시경"); C("c_pre80",30,"Find me"); C("c_pre80",40,"통기타"); C("c_pre80",50,"유작"); C("c_pre80","bonus","로제");
 C("c_classic",10,"1/4"); C("c_classic",20,"교향곡"); C("c_classic",30,"TOP"); C("c_classic",40,"정용진"); C("c_classic",50,"축제"); C("c_classic","bonus","💣");
 C("c_ost",10,"메가히트"); C("c_ost",20,"👸"); C("c_ost",30,"카우보이"); C("c_ost",40,"🦋"); C("c_ost",50,"🐴");
 B("c_20","bonus","지금 '아파트' 게임! 걸리는 팀에게 상품을 드립니다"); B("c_2026","bonus","이 안무를 따라 추는 '남편' 중 가장 잘한 분께 상품을 드립니다");
})();
// 26년 30점→악뮤 소문의 낙원 / 10년대 40점→여자친구 오늘부터 우리는 / 10년대 50점 제시어 15&
(function(){ var R=window.MOONPD_DATA.rounds.find(function(r){return r.id==="r2";});
 function q(cat,tier,o){ var c=R.categories.find(function(x){return x.id===cat;}); if(c) c.questions[tier]=o; }
 q("c_2026",30,{type:"music",clue:"",answer:["소문의 낙원","Paradise of Rumors"],youtubeId:"D54StAZFUrc",start:0,ansYoutubeId:"D54StAZFUrc",ansStart:0});
 q("c_10",40,{type:"music",clue:"",answer:["오늘부터 우리는","Me Gustas Tu"],youtubeId:"EkLVGDtiq_8",start:0,ansYoutubeId:"YYHyAIFG3iI",ansStart:0});
 var c=R.categories.find(function(x){return x.id==="c_10";}); if(c&&c.questions[50]) c.questions[50].clue="15&";
})();
// 2026 50점 캐치캐치: 워크맨 영상 20:42(1242초)부터 (문제=정답 동일 영상)
(function(){ var R=window.MOONPD_DATA.rounds.find(function(r){return r.id==="r2";}); var c=R.categories.find(function(x){return x.id==="c_2026";});
 c.questions[50]={type:"music",clue:"중견수",answer:["캐치캐치"],youtubeId:"E4hdF79wX-U",start:1242,ansYoutubeId:"E4hdF79wX-U",ansStart:1242}; })();
