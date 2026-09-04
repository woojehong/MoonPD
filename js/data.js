// MoonPD - Question data (SAMPLE / placeholder content for engine testing).
// Real photos, YouTube links and answers are filled in later.
//
// Model:
//   rounds[].categories[].questions[<points>] = {
//     type: "image" | "music" | "text" | "zoom" | "scene",
//     answer: ["정답", "허용답안"],   // display shows answer[0]
//     image: "images/xxx.jpg",       // image/zoom/scene types
//     youtubeId: "abcd",  start: 12,  // music type (seconds)
//     hint: "ㄱㅅ",                    // text type (초성 등)
//     note: "진행자 메모(옵션)"
//   }
window.MOONPD_DATA = {
  pointTiers: [10, 20, 30, 40, 50, 100],
  rounds: [
    {
      id: "r1", name: "1라운드 · 인물",
      categories: [
        {
          id: "c_kr_actor", name: "한국 배우",
          questions: {
            10:  { type: "image", answer: ["샘플 배우 A"], image: "images/r1_kr_10.jpg" },
            20:  { type: "image", answer: ["샘플 배우 B"], image: "images/r1_kr_20.jpg" },
            30:  { type: "image", answer: ["샘플 배우 C"], image: "images/r1_kr_30.jpg" },
            40:  { type: "image", answer: ["샘플 배우 D"], image: "images/r1_kr_40.jpg" },
            50:  { type: "image", answer: ["샘플 배우 E"], image: "images/r1_kr_50.jpg" },
            100: { type: "image", answer: ["샘플 배우 F"], image: "images/r1_kr_100.jpg" }
          }
        },
        {
          id: "c_hollywood", name: "헐리우드 배우",
          questions: {
            10:  { type: "image", answer: ["Sample Star A"], image: "images/r1_hw_10.jpg" },
            20:  { type: "image", answer: ["Sample Star B"], image: "images/r1_hw_20.jpg" },
            30:  { type: "image", answer: ["Sample Star C"], image: "images/r1_hw_30.jpg" },
            40:  { type: "image", answer: ["Sample Star D"], image: "images/r1_hw_40.jpg" },
            50:  { type: "image", answer: ["Sample Star E"], image: "images/r1_hw_50.jpg" },
            100: { type: "image", answer: ["Sample Star F"], image: "images/r1_hw_100.jpg" }
          }
        }
      ]
    },
    {
      id: "r2", name: "2라운드 · 음악",
      categories: [
        {
          id: "c_kpop", name: "KPOP 아이돌",
          questions: {
            10:  { type: "music", answer: ["샘플 곡 1"], youtubeId: "dQw4w9WgXcQ", start: 0 },
            20:  { type: "music", answer: ["샘플 곡 2"], youtubeId: "dQw4w9WgXcQ", start: 30 },
            30:  { type: "music", answer: ["샘플 곡 3"], youtubeId: "dQw4w9WgXcQ", start: 45 },
            40:  { type: "music", answer: ["샘플 곡 4"], youtubeId: "dQw4w9WgXcQ", start: 60 },
            50:  { type: "music", answer: ["샘플 곡 5"], youtubeId: "dQw4w9WgXcQ", start: 75 },
            100: { type: "music", answer: ["샘플 곡 6"], youtubeId: "dQw4w9WgXcQ", start: 90 }
          }
        }
      ]
    },
    {
      id: "r3", name: "3라운드 · 혼합",
      categories: [
        {
          id: "c_snack", name: "과자 초성",
          questions: {
            10:  { type: "text", answer: ["새우깡"], hint: "ㅅㅇㄲ" },
            20:  { type: "text", answer: ["포카칩"], hint: "ㅍㅋㅊ" },
            30:  { type: "text", answer: ["꼬깔콘"], hint: "ㄲㄲㅋ" },
            40:  { type: "text", answer: ["오징어땅콩"], hint: "ㅇㅈㅇㄸㅋ" },
            50:  { type: "text", answer: ["예감"], hint: "ㅇㄱ" },
            100: { type: "text", answer: ["빠다코코넛"], hint: "ㅃㄷㅋㅋㄴ" }
          }
        },
        {
          id: "c_scene", name: "명장면 → 명대사",
          questions: {
            10:  { type: "scene", answer: ["샘플 명대사 1"], image: "images/r3_scene_10.jpg" },
            20:  { type: "scene", answer: ["샘플 명대사 2"], image: "images/r3_scene_20.jpg" },
            30:  { type: "scene", answer: ["샘플 명대사 3"], image: "images/r3_scene_30.jpg" },
            40:  { type: "scene", answer: ["샘플 명대사 4"], image: "images/r3_scene_40.jpg" },
            50:  { type: "scene", answer: ["샘플 명대사 5"], image: "images/r3_scene_50.jpg" },
            100: { type: "scene", answer: ["샘플 명대사 6"], image: "images/r3_scene_100.jpg" }
          }
        }
      ]
    }
  ]
};
