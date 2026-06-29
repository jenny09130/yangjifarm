const STORAGE_KEY = "yangjiFarmState.v1";

const resources = [
  ["fertilizer", "肥料"],
  ["sun", "陽光"],
  ["water", "水滴"],
  ["support", "支架"],
  ["seed", "種子"],
];

const characterOptions = {
  face: [
    ["round", "圓臉"],
    ["gentle", "溫和臉"],
    ["long", "長臉"],
    ["square", "方臉"],
  ],
  outfit: [
    ["overalls", "農夫吊帶褲"],
    ["sport", "運動背心"],
    ["apron", "菜園圍裙"],
    ["vest", "暖色背心"],
  ],
  hat: [
    ["straw", "草帽"],
    ["cap", "遮陽帽"],
    ["towel", "毛巾頭巾"],
    ["none", "不戴帽"],
  ],
};

const defaultCharacter = {
  face: "round",
  outfit: "overalls",
  hat: "straw",
};

const discomfortTypes = [
  "頭暈",
  "胸悶",
  "喘不過氣",
  "膝蓋痛",
  "腰痛",
  "肩膀痛",
  "跌倒",
  "疲累",
];

const tasks = [
  {
    id: "chair-stand",
    name: "椅子坐站",
    type: "阻力 / 功能性訓練",
    purpose: "幫助起身更穩、更有力。",
    targetA: "10 下 × 2 組",
    targetB: "5-8 下，1 組",
    resource: "fertilizer",
    minutes: "3-5 分鐘",
    evidence: "健康高齡者運動處方表；肌少症介入處方",
    frequency: "阻力日 2-3 次/週，非連續日",
    intensity: "體重起始；初學 RPE 12-14，一般目標 RPE 14-17",
    dose: "起始 10 下 × 2 組；進階 12 下 × 3 組",
    progression: "2-for-2 rule；每 2-4 週由專業人員評估是否加量",
    evidenceDetail: "FITT-VP：阻力訓練 2-3 次/週、每肌群 1-3 組、每組 8-12 下；動作範例列出椅子坐站 10 下 × 2 組。",
    level: "A",
    steps: ["坐在穩固椅子前半部。", "慢慢站起來。", "慢慢坐回椅子。"],
    safety: "椅子不可滑動；頭暈或膝痛時停止；必要時請家人在旁。",
  },
  {
    id: "supported-squat",
    name: "扶椅深蹲",
    type: "阻力訓練",
    purpose: "訓練大腿與臀部力量，幫助日常移動。",
    targetA: "8 下，1-2 組",
    targetB: "5 下，1 組，動作幅度小",
    resource: "fertilizer",
    minutes: "3-5 分鐘",
    evidence: "健康高齡者運動處方表",
    frequency: "阻力日 2-3 次/週，非連續日",
    intensity: "體重 1/2 ROM 起始；中等 RPE 12-15",
    dose: "起始 8 下 × 2 組；進階 10 下 × 3 組",
    progression: "先增加動作品質與次數，再由專業人員評估阻力",
    evidenceDetail: "動作範例列出深蹲起始 8 下 × 2 組，體重 1/2 ROM；功能性訓練 RPE 12-15。",
    level: "A",
    steps: ["雙手輕扶椅背。", "慢慢下蹲一點。", "再慢慢站直。"],
    safety: "不要求蹲太低；膝蓋疼痛或不穩時停止。",
  },
  {
    id: "band-row",
    name: "彈力帶划船",
    type: "阻力訓練",
    purpose: "訓練背部與肩胛控制，維持上肢功能。",
    targetA: "8-10 下，1-2 組，低阻力彈力帶",
    targetB: "6-8 下，1 組，低阻力彈力帶",
    resource: "support",
    minutes: "4-6 分鐘",
    evidence: "健康高齡者運動處方表；肌少症介入處方",
    frequency: "阻力日 2-3 次/週",
    intensity: "輕阻力彈力帶起始；軀幹穩定、不憋氣",
    dose: "起始 10 下 × 2 組；進階 12 下 × 3 組",
    progression: "先完成目標反覆次數，再由專業人員評估彈力帶阻力",
    evidenceDetail: "動作範例列出坐姿划船 10 下 × 2 組、輕阻力彈力帶；阻力訓練需涵蓋主要肌群。",
    level: "A",
    steps: ["坐穩或站穩。", "雙手拉彈力帶。", "像把手肘往後帶，再慢慢放回。"],
    safety: "彈力帶固定要穩；肩痛時停止；不要憋氣。",
  },
  {
    id: "grip",
    name: "握力訓練",
    type: "阻力 / 功能追蹤",
    purpose: "維持手部與上肢日常提握能力。",
    targetA: "每手 8-10 下，1 組",
    targetB: "每手 5-8 下，1 組",
    resource: "seed",
    minutes: "2-4 分鐘",
    evidence: "健康高齡者運動處方表；肌少症介入處方",
    frequency: "每週約 3 次較符合握力改善劑量",
    intensity: "握力改善文獻提及約 49% 1RM；MVP 以可控制的中等用力呈現",
    dose: "每手 8-12 下，1-2 組；進階可至每組 16 下",
    progression: "若無疼痛或手麻，再由專業人員調整阻力或次數",
    evidenceDetail: "肌少症介入處方指出握力改善最佳實證劑量為每週 3 次，強度約 49% 1RM，每組可達 16 次。",
    level: "A",
    steps: ["握住握力器或軟球。", "慢慢用力握。", "再慢慢放鬆。"],
    safety: "手腕疼痛、手麻或關節痛時停止。",
  },
  {
    id: "walk",
    name: "步行",
    type: "有氧活動",
    purpose: "增加活動量與行走耐力。",
    targetA: "10-20 分鐘，可分段",
    targetB: "5-10 分鐘，可分段",
    resource: "sun",
    minutes: "5-20 分鐘",
    evidence: "健康高齡者運動處方表；肌少症介入處方",
    frequency: "有氧 3-5 次/週",
    intensity: "中等強度 40-60% HRR；RPE 12-14；可說話但不能唱歌",
    dose: "起始 20 分 × 3 次/週；進階 45 分 × 5 次/週",
    progression: "先增加時間，再增加強度；不以速度競賽呈現",
    evidenceDetail: "FITT-VP：有氧 3-5 次/週、20-60 分/次、每週累積至少 150 分鐘中等強度。",
    level: "A",
    steps: ["選擇平坦安全的路線。", "用能說話的舒服速度步行。", "覺得不舒服就停止休息。"],
    safety: "天氣太熱、路面不平、胸悶或頭暈時停止或改室內。",
  },
  {
    id: "indoor-step",
    name: "室內踏步",
    type: "有氧活動替代",
    purpose: "雨天或不便外出時維持活動量。",
    targetA: "3-5 分鐘",
    targetB: "1-3 分鐘",
    resource: "sun",
    minutes: "1-5 分鐘",
    evidence: "健康高齡者運動處方表",
    frequency: "可作為有氧 3-5 次/週的室內替代",
    intensity: "RPE 12 起始，進階可至 RPE 14",
    dose: "起始 15 分/次；進階 30 分/次；MVP 可分段完成",
    progression: "先增加時間，不追求速度",
    evidenceDetail: "動作範例列出固定式腳踏車 15 分/次 RPE 12 至 30 分/次 RPE 14；室內踏步採同類有氧原則保守呈現。",
    level: "B",
    steps: ["站在安全位置。", "可扶著穩固椅背。", "原地輕鬆踏步。"],
    safety: "不追求速度；腳步不穩時停止。",
  },
  {
    id: "single-leg",
    name: "扶椅單腳站",
    type: "平衡訓練",
    purpose: "訓練靜態平衡，降低跌倒風險。",
    targetA: "每腳 10 秒 × 3 次",
    targetB: "每腳 5-10 秒，1 回",
    resource: "support",
    minutes: "2-4 分鐘",
    evidence: "健康高齡者運動處方表；肌少症介入處方",
    frequency: "平衡至少 2-3 次/週",
    intensity: "靜態、張眼、扶椅起始；依任務難度漸進",
    dose: "起始 10 秒/側 × 3 次；進階 30 秒/側 × 3 次",
    progression: "MVP 不進階到閉眼或不穩定面；需專業人員評估",
    evidenceDetail: "FITT-VP：平衡 10-20 分/次，每動作 30-60 秒 × 2-3 次；動作範例列單腳站立 10 秒/側 × 3 次。",
    level: "A",
    steps: ["手扶穩固椅背。", "單腳輕輕抬起。", "保持穩定後換腳。"],
    safety: "必須扶椅；不閉眼；不站在不穩定表面。",
  },
  {
    id: "side-step",
    name: "側步走",
    type: "平衡 / 功能性訓練",
    purpose: "練習側向移動與動態平衡。",
    targetA: "左右各 5-8 步，1 回",
    targetB: "左右各 3-5 步，1 回",
    resource: "support",
    minutes: "2-4 分鐘",
    evidence: "健康高齡者運動處方表",
    frequency: "平衡至少 2-3 次/週",
    intensity: "低到中等；扶牆或桌邊起始",
    dose: "起始左右各 5-8 步 × 2 次；進階可至 5 公尺 × 3 次",
    progression: "先增加距離，再考慮雙重任務；MVP 不做快速移動",
    evidenceDetail: "動作範例列走直線 3 公尺 × 2 次至 5 公尺 × 3 次；側步採動態平衡原則保守替代。",
    level: "B",
    steps: ["扶著桌邊或牆邊。", "慢慢往旁邊踏步。", "左右兩邊都做。"],
    safety: "空間需清空；不可快速移動；不穩時停止。",
  },
  {
    id: "calf-stretch",
    name: "小腿伸展",
    type: "柔軟度",
    purpose: "維持小腿活動度，讓步行更舒服。",
    targetA: "每側 10-20 秒",
    targetB: "每側 10 秒",
    resource: "water",
    minutes: "2-3 分鐘",
    evidence: "健康高齡者運動處方表",
    frequency: "柔軟度至少 2-3 次/週，理想每日",
    intensity: "拉至輕微不適，不到疼痛",
    dose: "起始 20 秒 × 2 次/側；進階 30 秒 × 3 次/側",
    progression: "先維持靜態伸展，再由專業人員評估動態整合",
    evidenceDetail: "FITT-VP：柔軟度 10-15 分/次，每動作 10-30 秒 × 2-4 次；動作範例列腿後肌伸展 20 秒 × 2 次/側。",
    level: "A",
    steps: ["扶牆或扶椅。", "一腳在後。", "感覺小腿輕微伸展即可。"],
    safety: "只到輕微拉伸感；疼痛時停止。",
  },
  {
    id: "protein",
    name: "蛋白質餐次紀錄",
    type: "營養協同",
    purpose: "提醒蛋、豆、魚、肉、乳製品等蛋白質攝取。",
    targetA: "今日 1-3 餐打勾",
    targetB: "今日 1-3 餐打勾",
    resource: "water",
    minutes: "1 分鐘",
    evidence: "健康高齡者運動處方表；肌少症介入處方",
    frequency: "每日餐次紀錄",
    intensity: "非運動強度；以飲食有無蛋白質來源為記錄",
    dose: "每日 1-3 餐打勾；乳清蛋白 20-40 g/次需專業建議",
    progression: "MVP 不自動計算克數或開立補充劑",
    evidenceDetail: "營養協同分頁列蛋白質與乳清蛋白補充時機；介入處方指出營養與阻力訓練協同改善握力。",
    level: "A",
    steps: ["回想今天餐點。", "有蛋、豆、魚、肉或乳製品就打勾。", "有特殊飲食限制時依醫療建議。"],
    safety: "有腎臟病或特殊飲食限制者，需依醫師或營養師建議。",
    noExerciseSafety: true,
  },
];

const weeklyPlan = [
  ["chair-stand", "protein"],
  ["walk", "protein"],
  ["single-leg", "protein"],
  ["walk", "protein"],
  ["chair-stand", "protein"],
  ["indoor-step", "protein"],
  ["protein"],
];

const defaultState = {
  profile: null,
  settings: { largeText: false, reminder: "09:00", caregiver: "", site: "", voiceEnabled: true, voiceRate: "slow" },
  completed: {},
  resources: { fertilizer: 0, sun: 0, water: 0, support: 0, seed: 0 },
  discomforts: [],
  measurements: [],
  rests: [],
  activeTaskId: null,
  participants: {},
  activeParticipantId: null,
};

let state = loadState();
let todayTaskIds = getTodayTasks();
let deferredInstallPrompt = null;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return structuredClone(defaultState);
  try {
    return migrateState({ ...structuredClone(defaultState), ...JSON.parse(saved) });
  } catch {
    return structuredClone(defaultState);
  }
}

function migrateState(loaded) {
  const migrated = { ...structuredClone(defaultState), ...loaded };
  migrated.settings = { ...structuredClone(defaultState.settings), ...(loaded.settings || {}) };
  migrated.resources = { ...structuredClone(defaultState.resources), ...(loaded.resources || {}) };
  migrated.measurements = loaded.measurements || [];
  migrated.participants = loaded.participants || {};
  if (migrated.profile) migrated.profile = normalizeProfile(migrated.profile);
  if (migrated.profile && !migrated.activeParticipantId) {
    const id = createParticipantId();
    migrated.activeParticipantId = id;
    migrated.participants[id] = currentSnapshot(migrated);
  }
  return migrated;
}

function currentSnapshot(source = state) {
  return {
    profile: structuredClone(source.profile),
    settings: structuredClone(source.settings),
    completed: structuredClone(source.completed),
    resources: structuredClone(source.resources),
    discomforts: structuredClone(source.discomforts),
    measurements: structuredClone(source.measurements),
    rests: structuredClone(source.rests),
  };
}

function persistActiveParticipant() {
  if (!state.activeParticipantId || !state.profile) return;
  state.participants[state.activeParticipantId] = currentSnapshot();
}

function applyParticipantSnapshot(id) {
  const participant = state.participants[id];
  if (!participant) return false;
  state.activeParticipantId = id;
  state.profile = structuredClone(participant.profile);
  state.settings = { ...structuredClone(defaultState.settings), ...(participant.settings || {}) };
  state.completed = structuredClone(participant.completed || {});
  state.resources = { ...structuredClone(defaultState.resources), ...(participant.resources || {}) };
  state.discomforts = structuredClone(participant.discomforts || []);
  state.measurements = structuredClone(participant.measurements || []);
  state.rests = structuredClone(participant.rests || []);
  return true;
}

function createParticipantId() {
  return `p-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function normalizeProfile(profile = {}) {
  const demographics = profile.demographics || {};
  return {
    version: profile.version || 1,
    name: profile.name || "使用者",
    tier: profile.tier || "A",
    screening: profile.screening || [],
    conditions: profile.conditions || [],
    otherCondition: profile.otherCondition || "",
    conditionRisks: profile.conditionRisks || {},
    baselineGrip: profile.baselineGrip || null,
    character: normalizeCharacter(profile.character),
    createdAt: profile.createdAt || todayKey(),
    demographics: {
      sex: demographics.sex || profile.sex || "",
      age: demographics.age || profile.age || "",
      height: demographics.height || profile.height || "",
      weight: demographics.weight || profile.weight || "",
      dominantHand: demographics.dominantHand || profile.dominantHand || "",
    },
  };
}

function normalizeCharacter(character = {}) {
  return {
    face: characterOptions.face.some(([value]) => value === character.face) ? character.face : defaultCharacter.face,
    outfit: characterOptions.outfit.some(([value]) => value === character.outfit) ? character.outfit : defaultCharacter.outfit,
    hat: characterOptions.hat.some(([value]) => value === character.hat) ? character.hat : defaultCharacter.hat,
  };
}

function characterLabel(group, value) {
  return characterOptions[group].find(([optionValue]) => optionValue === value)?.[1] || "";
}

function characterSummary(character = defaultCharacter) {
  const normalized = normalizeCharacter(character);
  return `${characterLabel("face", normalized.face)}、${characterLabel("outfit", normalized.outfit)}、${characterLabel("hat", normalized.hat)}`;
}

function characterSelectOptions(group, selectedValue) {
  return characterOptions[group].map(([value, label]) => (
    `<option value="${value}" ${value === selectedValue ? "selected" : ""}>${label}</option>`
  )).join("");
}

function characterMarkup(character = defaultCharacter) {
  const normalized = normalizeCharacter(character);
  const hatLabel = characterLabel("hat", normalized.hat);
  return `
    <div class="character-card">
      <div class="farm-character face-${normalized.face} outfit-${normalized.outfit} hat-${normalized.hat}" aria-hidden="true">
        <div class="character-hat"></div>
        <div class="character-head">
          <span class="character-ear left"></span>
          <span class="character-ear right"></span>
          <span class="character-eye left"></span>
          <span class="character-eye right"></span>
          <span class="character-mouth"></span>
        </div>
        <div class="character-body">
          <span class="character-strap left"></span>
          <span class="character-strap right"></span>
          <span class="character-pocket"></span>
        </div>
        <div class="character-legs"></div>
      </div>
      <div>
        <strong>養肌小農</strong>
        <span>${escapeHtml(characterSummary(normalized))}</span>
        ${hatLabel ? `<small>今天戴著${escapeHtml(hatLabel)}照顧菜園。</small>` : ""}
      </div>
    </div>
  `;
}

function collectCharacter(prefix) {
  return normalizeCharacter({
    face: $(`#${prefix}FaceInput`)?.value,
    outfit: $(`#${prefix}OutfitInput`)?.value,
    hat: $(`#${prefix}HatInput`)?.value,
  });
}

function setCharacterInputs(prefix, character) {
  const normalized = normalizeCharacter(character);
  const faceInput = $(`#${prefix}FaceInput`);
  const outfitInput = $(`#${prefix}OutfitInput`);
  const hatInput = $(`#${prefix}HatInput`);
  if (faceInput) faceInput.value = normalized.face;
  if (outfitInput) outfitInput.value = normalized.outfit;
  if (hatInput) hatInput.value = normalized.hat;
}

function profileNeedsOnboarding() {
  return !state.profile || (state.profile.version || 1) < 2;
}

function sexLabel(value) {
  return {
    female: "女",
    male: "男",
    other: "其他",
    undisclosed: "不透露",
  }[value] || "未填寫";
}

function handLabel(value) {
  return {
    right: "右手",
    left: "左手",
  }[value] || "未記錄";
}

function collectRiskItems(name) {
  return $$(`input[name='${name}']:checked`).map((input) => ({
    value: input.value,
    risk: input.dataset.risk || "low",
  }));
}

function activeRiskItems(items) {
  return items.filter((item) => item.risk !== "none" && item.value !== "無" && item.value !== "無上述慢性病");
}

function riskMap(items) {
  return Object.fromEntries(items.map((item) => [item.value, item.risk]));
}

function resolveTier(selectedTier, screeningItems, conditionItems) {
  if (selectedTier === "C") return "C";
  const riskItems = activeRiskItems([...screeningItems, ...conditionItems]);
  if (riskItems.some((item) => item.risk === "high")) return "C";
  if (selectedTier === "B" || riskItems.some((item) => item.risk === "moderate")) return "B";
  return "A";
}

function createParticipant(name, tier = "A", screening = []) {
  persistActiveParticipant();
  const id = createParticipantId();
  const participant = {
    profile: normalizeProfile({ version: 2, name, tier, screening, createdAt: todayKey() }),
    settings: { ...structuredClone(defaultState.settings), site: state.settings.site || "" },
    completed: {},
    resources: structuredClone(defaultState.resources),
    discomforts: [],
    measurements: [],
    rests: [],
  };
  state.participants[id] = participant;
  applyParticipantSnapshot(id);
  saveState({ persistParticipant: false });
}

function saveState({ persistParticipant = true } = {}) {
  if (persistParticipant) persistActiveParticipant();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function getTodayTasks() {
  const day = new Date().getDay();
  const planIndex = day === 0 ? 6 : day - 1;
  const tier = state.profile?.tier || "A";
  if (tier === "C") return ["protein"];
  const ids = weeklyPlan[planIndex];
  return tier === "B" ? ids.filter((id) => id === "protein" || ["chair-stand", "walk", "single-leg", "band-row", "indoor-step", "calf-stretch"].includes(id)).slice(0, 2) : ids;
}

function taskById(id) {
  return tasks.find((task) => task.id === id);
}

function doneIds() {
  return state.completed[todayKey()] || [];
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function speechSupported() {
  return "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
}

function speechRate() {
  return state.settings.voiceRate === "normal" ? 0.95 : 0.78;
}

function mandarinVoice() {
  if (!speechSupported()) return null;
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find((voice) => voice.lang === "zh-TW") ||
    voices.find((voice) => voice.lang?.toLowerCase().startsWith("zh")) ||
    voices.find((voice) => /chinese|mandarin|taiwan|mei|ting/i.test(voice.name)) ||
    null
  );
}

function speakText(text, { force = false } = {}) {
  if (!force && !state.settings.voiceEnabled) {
    showToast("國語聲音說明目前關閉，可到設定開啟。");
    return;
  }
  if (!speechSupported()) {
    showToast("這個瀏覽器暫時不支援內建語音朗讀。");
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text.replace(/\s+/g, " ").trim());
  utterance.lang = "zh-TW";
  utterance.rate = speechRate();
  utterance.pitch = 1;
  utterance.volume = 1;
  const voice = mandarinVoice();
  if (voice) utterance.voice = voice;
  window.speechSynthesis.speak(utterance);
}

function stopSpeech() {
  if (speechSupported()) window.speechSynthesis.cancel();
}

function taskSpeechText(task) {
  if (!task) return "目前沒有任務說明。";
  const target = state.profile?.tier === "B" ? task.targetB : task.targetA;
  const mission = farmMissionForTask(task);
  const safetyPrefix = task.noExerciseSafety ? "" : "開始前，請先確認沒有胸悶、頭暈、明顯疼痛或剛跌倒。";
  return `${mission.action}。今天幫菜園${mission.verb}。目標是：${target}。請慢慢做，不舒服就停下來休息。${safetyPrefix} 動作說明：${task.steps.join("。")}。`;
}

function todaySpeechText() {
  const name = state.profile?.name || "您好";
  const taskNames = todayTaskIds.map(taskById).filter(Boolean).map((task) => farmMissionForTask(task).action).join("、");
  return `${name}，歡迎來到養肌農場。今天的農務是：${taskNames || "施肥任務"}。畫面上只保留大按鈕，需要說明時按播放。請慢慢做，有胸悶、頭暈、疼痛或不舒服，就先停止並休息。`;
}

function isDone(taskId) {
  return doneIds().includes(taskId);
}

function setDone(taskId) {
  const date = todayKey();
  state.completed[date] = Array.from(new Set([...(state.completed[date] || []), taskId]));
}

function render() {
  document.body.classList.toggle("large-text", Boolean(state.settings.largeText));
  todayTaskIds = getTodayTasks();
  renderTop();
  renderCharacterPreviews();
  renderEvidenceSummary();
  renderTasks();
  renderHarvest();
  renderRecords();
  renderCaregiver();
  renderSettings();
  renderParticipants();
  renderOutcome();
}

function renderEvidenceSummary() {
  const tier = state.profile?.tier || "A";
  const phase = getTrainingPhase();
  $("#evidenceSummary").innerHTML = `
    <h3>本週簡化處方重點</h3>
    <ul>
      <li>12 週循環：目前為${phase}；第一版重點是建立習慣，不追求完整處方一次到位。</li>
      <li>只保留 4 類核心：椅子坐站、步行/踏步、扶椅平衡、蛋白質紀錄。</li>
      <li>每日 1 個主要活動 + 1 個營養紀錄；降低負擔以提高依從性。</li>
      <li>${tier === "B" ? "B 模式採低量、扶椅、可休息，不自動進階。" : "A 模式仍需任務前安全確認，不自動加量。"}</li>
    </ul>
  `;
}

function getTrainingPhase() {
  const createdAt = state.profile?.createdAt ? new Date(`${state.profile.createdAt}T00:00:00`) : new Date();
  const days = Math.max(0, Math.floor((new Date() - createdAt) / 86400000));
  const week = Math.floor(days / 7) + 1;
  if (week <= 4) return `第 ${week} 週適應期`;
  if (week <= 8) return `第 ${week} 週強化期`;
  if (week <= 12) return `第 ${week} 週進展期`;
  return "新一輪 12 週循環";
}

function farmMissionForTask(task) {
  const missions = {
    "chair-stand": { action: "澆水任務", verb: "澆水", tool: "小水壺", hint: "坐下，站起來" },
    "supported-squat": { action: "灌溉任務", verb: "開水門", tool: "灑水器", hint: "扶穩，慢慢蹲" },
    "band-row": { action: "拉繩任務", verb: "拉開水門", tool: "拉繩", hint: "手肘往後拉" },
    grip: { action: "播種任務", verb: "收種子", tool: "種子袋", hint: "握緊，再放鬆" },
    walk: { action: "巡田任務", verb: "巡田", tool: "小推車", hint: "照自己的速度走" },
    "indoor-step": { action: "踩水車任務", verb: "踩水車", tool: "水車", hint: "穩穩踏步" },
    "single-leg": { action: "扶苗任務", verb: "扶正小苗", tool: "竹支架", hint: "扶椅，站穩" },
    "side-step": { action: "除草任務", verb: "整理田埂", tool: "小鋤頭", hint: "小步慢慢移" },
    "calf-stretch": { action: "鬆土任務", verb: "鬆土", tool: "木耙", hint: "伸展，不要痛" },
    protein: { action: "施肥任務", verb: "補充肥料", tool: "肥料桶", hint: "記錄蛋白質" },
  };
  return missions[task?.id] || { action: "農務任務", verb: "照顧菜園", tool: "農具", hint: "慢慢做" };
}

function renderTop() {
  const done = doneIds().filter((id) => todayTaskIds.includes(id)).length;
  const nextTask = taskById(todayTaskIds.find((id) => !isDone(id)) || todayTaskIds[0]);
  const mission = farmMissionForTask(nextTask);
  const target = nextTask ? (state.profile?.tier === "B" ? nextTask.targetB : nextTask.targetA) : "今天休息";
  $("#todayDone").textContent = `${done}/${todayTaskIds.length}`;
  $("#weekDays").textContent = getWeekCompletionDays();
  $("#safetyMode").textContent = state.profile?.tier || "A";
  $("#growthPercent").textContent = `${Math.min(100, Math.round((totalCompleted() / 21) * 100))}%`;
  const name = state.profile?.name || "您好";
  $("#gardenTitle").textContent = mission.action;
  $("#todaySummary").textContent = `${name}，今天幫菜園${mission.verb}。按播放可以聽說明。`;
  $("#missionTool").textContent = mission.tool;
  $("#missionCount").textContent = target;
  $("#missionHint").textContent = mission.hint;
}

function currentSexForHero() {
  const onboardSex = $("#onboardSex")?.value;
  const savedSex = state.profile?.demographics?.sex;
  const sex = onboardSex || savedSex || "male";
  return sex === "female" ? "female" : "male";
}

function renderWelcomeHero() {
  const hero = $("#welcomeHeroImage");
  if (!hero) return;
  const sex = currentSexForHero();
  hero.src = sex === "female" ? "./assets/hero-female.png" : "./assets/hero-male.png";
  hero.alt = sex === "female" ? "女性長者養肌農場歡迎圖" : "男性長者養肌農場歡迎圖";
}

function renderCharacterPreviews() {
  const character = normalizeProfile(state.profile || {}).character;
  const farmPreview = $("#farmCharacterPreview");
  const settingsPreview = $("#settingsCharacterPreview");
  if (farmPreview) farmPreview.innerHTML = characterMarkup(character);
  if (settingsPreview) settingsPreview.innerHTML = characterMarkup(character);
  renderWelcomeHero();
}

function renderOnboardingCharacterPreview() {
  const preview = $("#onboardCharacterPreview");
  if (preview) preview.innerHTML = characterMarkup(collectCharacter("onboard"));
}

function renderSettingsCharacterPreview() {
  const preview = $("#settingsCharacterPreview");
  if (preview) preview.innerHTML = characterMarkup(collectCharacter("profile"));
}

function renderTasks() {
  const list = $("#taskList");
  list.innerHTML = "";
  todayTaskIds.map(taskById).forEach((task) => {
    const card = document.createElement("article");
    card.className = "task-card";
    const target = state.profile?.tier === "B" ? task.targetB : task.targetA;
    card.innerHTML = `
      <div>
        <h3>${task.name}</h3>
        <p>${task.purpose}</p>
        <div class="chip-row">
          <span class="chip">${task.type}</span>
          <span class="chip">${task.minutes}</span>
          <span class="chip">${target}</span>
          <span class="chip warn">來源：${task.evidence}</span>
          ${isDone(task.id) ? '<span class="chip done">已完成</span>' : ""}
        </div>
      </div>
      <div class="task-actions">
        <button class="secondary-button" data-speak-task="${task.id}">播放說明</button>
        <button class="task-button" data-start-task="${task.id}">${isDone(task.id) ? "查看任務" : "開始"}</button>
      </div>
    `;
    list.appendChild(card);
  });
}

function renderHarvest() {
  const grid = $("#resourceGrid");
  grid.innerHTML = resources.map(([key, label]) => `
    <div class="resource-item">
      <strong>${state.resources[key] || 0}</strong>
      <span>${label}</span>
    </div>
  `).join("");
  const crops = [
    ["青菜", "完成步行或踏步任務"],
    ["番茄", "完成肌力任務"],
    ["豆子", "完成蛋白質紀錄"],
    ["香草", "完成伸展或平衡任務"],
  ];
  $("#cropBadges").innerHTML = crops.map(([name, desc]) => `<span class="badge">${name}｜${desc}</span>`).join("");
}

function renderOutcome() {
  const doneToday = doneIds().filter((id) => todayTaskIds.includes(id)).length;
  const total = totalCompleted();
  const weekDays = getWeekCompletionDays();
  const latestMeasurement = state.measurements.at(-1);
  const latestDiscomfort = state.discomforts.at(-1);
  const growth = Math.min(100, Math.round((total / 21) * 100));
  $("#outcomeTitle").textContent = `${state.profile?.name || "我的"}養肌成果`;
  $("#outcomeSummary").textContent = "這裡只顯示鼓勵與追蹤，不排名、不扣分。";
  $("#outcomeGrid").innerHTML = [
    ["今日任務", `${doneToday}/${todayTaskIds.length}`],
    ["本週完成", `${weekDays} 天`],
    ["累積任務", `${total} 項`],
    ["作物成長", `${growth}%`],
  ].map(([label, value]) => `
    <div class="outcome-item">
      <strong>${value}</strong>
      <span>${label}</span>
    </div>
  `).join("");

  const rows = [
    `<div class="timeline-item"><h3>菜園收成</h3><p>肥料 ${state.resources.fertilizer || 0}、陽光 ${state.resources.sun || 0}、水滴 ${state.resources.water || 0}、支架 ${state.resources.support || 0}。</p></div>`,
    latestMeasurement
      ? `<div class="timeline-item"><h3>最近健康紀錄</h3><p>${escapeHtml(latestMeasurement.date)}：握力 ${escapeHtml(latestMeasurement.grip || "-")} kg，小腿圍 ${escapeHtml(latestMeasurement.calf || "-")} cm，坐站 ${escapeHtml(latestMeasurement.stand || "-")} 秒。</p></div>`
      : `<div class="timeline-item"><h3>最近健康紀錄</h3><p>尚未輸入握力、小腿圍或坐站紀錄。</p></div>`,
    latestDiscomfort
      ? `<div class="timeline-item"><h3>安全提醒</h3><p>最近回報：${escapeHtml(latestDiscomfort.type)}。請以安全為優先。</p></div>`
      : `<div class="timeline-item"><h3>安全提醒</h3><p>目前沒有不適回報。</p></div>`,
  ];
  $("#outcomeTimeline").innerHTML = rows.join("");
}

function renderRecords() {
  const profile = normalizeProfile(state.profile || {});
  const demographics = profile.demographics;
  const conditionParts = [...(profile.conditions || [])];
  if (profile.otherCondition) conditionParts.push(`其他：${profile.otherCondition}`);
  const conditions = conditionParts.length ? conditionParts.join("、") : "未記錄";
  const baseline = profile.baselineGrip;
  $("#profileSummary").innerHTML = `
    <h3>個人檔案</h3>
    ${characterMarkup(profile.character)}
    <p>${escapeHtml(profile.name)}｜${sexLabel(demographics.sex)}｜${demographics.age ? `${escapeHtml(demographics.age)} 歲` : "年齡未填"}｜慣用手：${handLabel(demographics.dominantHand)}</p>
    <div class="chip-row">
      <span class="chip">安全模式 ${escapeHtml(profile.tier)}</span>
      <span class="chip">慢性病史：${escapeHtml(conditions)}</span>
      <span class="chip">基礎握力：${baseline ? `${escapeHtml(baseline.bestGrip)} kg` : "尚未測量"}</span>
    </div>
  `;
  $("#measureDateInput").value ||= todayKey();
  $("#dominantHandInput").value = demographics.dominantHand || "";
  const timeline = $("#recordTimeline");
  const todayDone = doneIds().length;
  const discomfortItems = state.discomforts.slice(-4).reverse();
  const measurementItems = state.measurements.slice(-3).reverse();
  const rows = [
    `<div class="timeline-item"><h3>今日紀錄</h3><p>已完成 ${todayDone} 個任務。${state.rests.includes(todayKey()) ? " 今天有選擇休息。" : ""}</p></div>`,
    ...measurementItems.map((item) => {
      const rightGrip = item.gripRight || item.grip || "";
      const leftGrip = item.gripLeft || "";
      const bestGrip = item.bestGrip || Math.max(Number(rightGrip) || 0, Number(leftGrip) || 0) || "";
      return `<div class="timeline-item"><h3>${escapeHtml(item.date)} 基礎數據</h3><p>右手握力 ${escapeHtml(rightGrip || "-")} kg；左手握力 ${escapeHtml(leftGrip || "-")} kg；最高握力 ${escapeHtml(bestGrip || "-")} kg；小腿圍 ${escapeHtml(item.calf || "-")} cm；5 次坐站 ${escapeHtml(item.stand || "-")} 秒。${item.note ? ` 備註：${escapeHtml(item.note)}` : ""}</p></div>`;
    }),
    ...discomfortItems.map((item) => `<div class="timeline-item"><h3>${escapeHtml(item.date)} 不適回報</h3><p>${escapeHtml(item.type)}。${escapeHtml(item.note || "已建議停止任務並休息。")}</p></div>`),
  ];
  timeline.innerHTML = rows.join("");
}

function renderCaregiver() {
  const latestDiscomfort = state.discomforts.at(-1);
  const summary = [
    ["今日任務", `${doneIds().filter((id) => todayTaskIds.includes(id)).length}/${todayTaskIds.length}`],
    ["本週完成天數", `${getWeekCompletionDays()} 天`],
    ["最近不適", latestDiscomfort ? `${latestDiscomfort.type}（${latestDiscomfort.date}）` : "無不適回報"],
    ["是否需關心", needsAttention() ? "建議主動關心" : "目前穩定"],
  ];
  $("#careSummary").innerHTML = summary.map(([label, value]) => `
    <div class="summary-item">
      <span>${label}</span>
      <strong>${value}</strong>
    </div>
  `).join("");
  $("#careMessage").textContent = buildCareMessage();
}

function renderSettings() {
  const profile = normalizeProfile(state.profile || {});
  const demographics = profile.demographics;
  $("#nameInput").value = profile.name || "";
  $("#sexInput").value = demographics.sex || "";
  $("#ageInput").value = demographics.age || "";
  $("#heightInput").value = demographics.height || "";
  $("#weightInput").value = demographics.weight || "";
  $("#tierInput").value = state.profile?.tier || "A";
  $("#remindInput").value = state.settings.reminder || "09:00";
  $("#careContactInput").value = state.settings.caregiver || "";
  $("#siteInput").value = state.settings.site || "";
  $("#largeTextInput").checked = Boolean(state.settings.largeText);
  $("#voiceEnabledInput").checked = state.settings.voiceEnabled !== false;
  $("#voiceRateInput").value = state.settings.voiceRate || "slow";
  $("#otherConditionInput").value = profile.otherCondition || "";
  setCharacterInputs("profile", profile.character);
  $$("input[name='profileCondition']").forEach((input) => {
    input.checked = profile.conditions?.includes(input.value);
  });
  renderSettingsCharacterPreview();
}

function renderParticipants() {
  const entries = Object.entries(state.participants || {});
  const activeName = state.profile?.name || "尚未建立";
  $("#activeParticipantLabel").textContent = `目前使用：${activeName}（${state.profile?.tier || "-"} 模式）`;
  if (entries.length === 0) {
    $("#participantList").innerHTML = '<div class="timeline-item"><h3>尚無長者</h3><p>請新增第一位長者，或完成首次設定。</p></div>';
    return;
  }
  $("#participantList").innerHTML = entries.map(([id, participant]) => {
    const profile = participant.profile || {};
    const doneCount = Object.values(participant.completed || {}).reduce((sum, ids) => sum + ids.length, 0);
    const discomfortCount = (participant.discomforts || []).length;
    const active = id === state.activeParticipantId;
    return `
      <article class="participant-card ${active ? "active" : ""}">
        <div>
          <strong>${escapeHtml(profile.name || "未命名長者")}</strong>
          <span>${escapeHtml(profile.tier || "A")} 模式｜${escapeHtml(characterSummary(profile.character))}｜完成 ${doneCount} 項｜不適 ${discomfortCount} 次</span>
        </div>
        <button class="task-button" data-switch-participant="${id}">${active ? "使用中" : "切換"}</button>
      </article>
    `;
  }).join("");
}

function totalCompleted() {
  return Object.values(state.completed).reduce((sum, ids) => sum + ids.length, 0);
}

function getWeekCompletionDays() {
  const now = new Date();
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  weekStart.setHours(0, 0, 0, 0);
  return Object.entries(state.completed).filter(([date, ids]) => {
    const day = new Date(`${date}T00:00:00`);
    return day >= weekStart && ids.length > 0;
  }).length;
}

function needsAttention() {
  const latest = state.discomforts.at(-1);
  if (!latest) return false;
  return ["頭暈", "胸悶", "喘不過氣", "跌倒"].includes(latest.type) || state.profile?.tier === "B";
}

function buildCareMessage() {
  const name = state.profile?.name || "家人";
  const done = doneIds().filter((id) => todayTaskIds.includes(id)).length;
  const latest = state.discomforts.at(-1);
  if (latest && ["頭暈", "胸悶", "喘不過氣", "跌倒"].includes(latest.type)) {
    return `${name} 今天在養肌農場回報「${latest.type}」，App 已建議停止任務並休息，請主動關心。`;
  }
  if (latest && state.profile?.tier === "B") {
    return `${name} 最近回報「${latest.type}」，因目前為 B 風險提醒組，建議關心今天身體狀況。`;
  }
  return `${name} 今天完成 ${done}/${todayTaskIds.length} 個養肌任務，目前沒有高風險不適回報。`;
}

function flattenRows() {
  const rows = [];
  Object.entries(state.completed).forEach(([date, ids]) => {
    ids.forEach((id) => rows.push({
      date,
      type: "task_completed",
      item: taskById(id)?.name || id,
      value: "完成",
      note: "",
    }));
  });
  state.measurements.forEach((item) => {
    rows.push({ date: item.date, type: "measurement", item: "右手握力 kg", value: item.gripRight || item.grip || "", note: item.note || "" });
    rows.push({ date: item.date, type: "measurement", item: "左手握力 kg", value: item.gripLeft || "", note: item.note || "" });
    rows.push({ date: item.date, type: "measurement", item: "最高握力 kg", value: item.bestGrip || "", note: item.note || "" });
    rows.push({ date: item.date, type: "measurement", item: "小腿圍 cm", value: item.calf || "", note: "" });
    rows.push({ date: item.date, type: "measurement", item: "5 次坐站秒數", value: item.stand || "", note: "" });
  });
  state.discomforts.forEach((item) => rows.push({
    date: item.date,
    type: "discomfort",
    item: item.type,
    value: taskById(item.taskId)?.name || "",
    note: item.note || "",
  }));
  state.rests.forEach((date) => rows.push({ date, type: "rest", item: "今天先休息", value: "", note: "" }));
  return rows.sort((a, b) => a.date.localeCompare(b.date));
}

function downloadText(filename, text, mime = "text/plain;charset=utf-8") {
  const blob = new Blob([text], { type: mime });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function csvEscape(value) {
  const text = String(value ?? "");
  return `"${text.replaceAll('"', '""')}"`;
}

function exportCsv() {
  const header = ["date", "participant", "site", "safety_tier", "type", "item", "value", "note"];
  const rows = flattenRows().map((row) => [
    row.date,
    state.profile?.name || "",
    state.settings.site || "",
    state.profile?.tier || "",
    row.type,
    row.item,
    row.value,
    row.note,
  ]);
  const csv = [header, ...rows].map((row) => row.map(csvEscape).join(",")).join("\n");
  downloadText(`yangji-farm-${todayKey()}.csv`, `\ufeff${csv}`, "text/csv;charset=utf-8");
  showToast("已匯出 CSV，可交給據點彙整。");
}

function exportJson() {
  downloadText(`yangji-farm-backup-${todayKey()}.json`, JSON.stringify(state, null, 2), "application/json;charset=utf-8");
  showToast("已備份 JSON。");
}

function printReport() {
  window.print();
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2600);
}

function openTask(taskId) {
  const task = taskById(taskId);
  state.activeTaskId = taskId;
  saveState();
  if (!task.noExerciseSafety && !isDone(task.id)) {
    $("#safetyTaskTitle").textContent = `${task.name}：開始前先確認身體狀態`;
    $("#safetyForm").reset();
    $("#safetyDialog").showModal();
    return;
  }
  showTaskDialog(task);
}

function showTaskDialog(task) {
  $("#taskTypeLabel").textContent = task.type;
  $("#taskTitle").textContent = task.name;
  $("#taskPurpose").textContent = task.purpose;
  $("#taskSteps").innerHTML = task.steps.map((step) => `<li>${step}</li>`).join("");
  $("#taskSafety").textContent = `安全提醒：${task.safety}`;
  $("#taskPrescription").innerHTML = `
    <strong>實證處方</strong><br>
    頻率：${escapeHtml(task.frequency || "-")}<br>
    強度：${escapeHtml(task.intensity || "-")}<br>
    劑量：${escapeHtml(task.dose || "-")}<br>
    進展：${escapeHtml(task.progression || "不自動進階，需專業人員評估")}<br>
    依據：${escapeHtml(task.evidenceDetail || task.evidence)}
  `;
  $("#taskTarget").textContent = `今日目標：${state.profile?.tier === "B" ? task.targetB : task.targetA}`;
  $("#taskDialog").showModal();
}

function completeActiveTask() {
  const task = taskById(state.activeTaskId);
  if (!task) return;
  stopSpeech();
  setDone(task.id);
  state.resources[task.resource] = (state.resources[task.resource] || 0) + 1;
  saveState();
  $("#taskDialog").close();
  render();
  showToast(`完成 ${task.name}，菜園獲得${resourceLabel(task.resource)}。`);
}

function resourceLabel(key) {
  return resources.find(([resourceKey]) => resourceKey === key)?.[1] || "資源";
}

function reportRest(reason = "今日休息") {
  const date = todayKey();
  state.rests = Array.from(new Set([...state.rests, date]));
  saveState();
  render();
  showToast(`${reason}。今天先休息也是好的選擇。`);
}

function reportDiscomfort(type, note) {
  state.discomforts.push({
    date: todayKey(),
    taskId: state.activeTaskId,
    type,
    note,
  });
  saveState();
  $("#discomfortDialog").close();
  $("#taskDialog").close();
  render();
  showToast("已記錄不適，今日運動任務請先停止並休息。");
}

function saveMeasurements() {
  const rightGrip = $("#gripRightInput").value;
  const leftGrip = $("#gripLeftInput").value;
  const bestGrip = Math.max(Number(rightGrip) || 0, Number(leftGrip) || 0) || "";
  const item = {
    date: $("#measureDateInput").value || todayKey(),
    dominantHand: $("#dominantHandInput").value,
    gripRight: rightGrip,
    gripLeft: leftGrip,
    bestGrip: bestGrip ? String(bestGrip) : "",
    calf: $("#calfInput").value,
    stand: $("#standInput").value,
    note: $("#measureNoteInput").value.trim(),
  };
  state.measurements.push(item);
  state.profile = normalizeProfile(state.profile || {});
  if (item.dominantHand) state.profile.demographics.dominantHand = item.dominantHand;
  if (!state.profile.baselineGrip && item.bestGrip) {
    state.profile.baselineGrip = {
      date: item.date,
      dominantHand: item.dominantHand,
      gripRight: item.gripRight,
      gripLeft: item.gripLeft,
      bestGrip: item.bestGrip,
    };
  }
  saveState();
  $("#gripRightInput").value = "";
  $("#gripLeftInput").value = "";
  $("#calfInput").value = "";
  $("#standInput").value = "";
  $("#measureNoteInput").value = "";
  render();
  showToast("已儲存基礎數據。");
}

function initEvents() {
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
  });

  $$(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      $$(".tab").forEach((item) => item.classList.remove("active"));
      $$(".tab-view").forEach((view) => view.classList.remove("active"));
      tab.classList.add("active");
      $(`#${tab.dataset.tab}View`).classList.add("active");
    });
  });

  $("#taskList").addEventListener("click", (event) => {
    const speakButton = event.target.closest("[data-speak-task]");
    if (speakButton) {
      speakText(taskSpeechText(taskById(speakButton.dataset.speakTask)));
      return;
    }
    const button = event.target.closest("[data-start-task]");
    if (button) openTask(button.dataset.startTask);
  });

  $("#participantList").addEventListener("click", (event) => {
    const button = event.target.closest("[data-switch-participant]");
    if (!button) return;
    persistActiveParticipant();
    applyParticipantSnapshot(button.dataset.switchParticipant);
    saveState({ persistParticipant: false });
    render();
    showToast(`已切換到 ${state.profile?.name || "長者"}。`);
  });

  $("#addParticipant").addEventListener("click", () => {
    const name = $("#newParticipantName").value.trim();
    if (!name) return showToast("請先輸入長者暱稱。");
    createParticipant(name, "A", []);
    $("#newParticipantName").value = "";
    render();
    showToast(`已新增並切換到 ${name}。`);
  });

  $("#startToday").addEventListener("click", () => {
    const next = todayTaskIds.find((id) => !isDone(id)) || todayTaskIds[0];
    openTask(next);
  });

  $("#welcomeStart").addEventListener("click", () => {
    if (profileNeedsOnboarding()) {
      renderOnboardingCharacterPreview();
      renderWelcomeHero();
      $("#onboardingDialog").showModal();
      return;
    }
    const next = todayTaskIds.find((id) => !isDone(id)) || todayTaskIds[0];
    openTask(next);
  });

  $("#welcomeLearn").addEventListener("click", () => $("#aboutDialog").showModal());
  $("#closeAbout").addEventListener("click", () => $("#aboutDialog").close());

  $("#speakToday").addEventListener("click", () => speakText(todaySpeechText(), { force: true }));
  $("#restToday").addEventListener("click", () => reportRest());
  $("#openOutcome").addEventListener("click", () => {
    renderOutcome();
    $("#outcomeDialog").showModal();
  });
  $("#closeOutcome").addEventListener("click", () => $("#outcomeDialog").close());
  $("#installApp").addEventListener("click", async () => {
    if (!deferredInstallPrompt) {
      $("#installDialog").showModal();
      return;
    }
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
  });
  $("#closeInstallGuide").addEventListener("click", () => $("#installDialog").close());
  $("#openSafety").addEventListener("click", () => showToast("胸悶、頭暈、跌倒、明顯疼痛時，請停止任務並休息。"));
  $("#refreshTasks").addEventListener("click", () => {
    showToast("已依最新整理改為少量核心任務：阻力、步行/踏步、扶椅平衡與蛋白質紀錄。");
  });

  $("#onboardSex").addEventListener("change", renderWelcomeHero);
  $("#sexInput").addEventListener("change", renderWelcomeHero);

  ["onboard", "profile"].forEach((prefix) => {
    ["FaceInput", "OutfitInput", "HatInput"].forEach((suffix) => {
      const input = $(`#${prefix}${suffix}`);
      if (!input) return;
      input.addEventListener("change", () => {
        if (prefix === "onboard") renderOnboardingCharacterPreview();
        if (prefix === "profile") renderSettingsCharacterPreview();
      });
    });
  });

  $("#safetyPass").addEventListener("click", (event) => {
    const hasIssue = $$("input[name='safetyIssue']:checked").length > 0;
    if (hasIssue) {
      event.preventDefault();
      reportRest("安全確認有不適項目");
      $("#safetyDialog").close();
      return;
    }
    $("#safetyDialog").close();
    showTaskDialog(taskById(state.activeTaskId));
  });

  $("#safetyRest").addEventListener("click", () => reportRest("安全確認後選擇休息"));
  $("#closeTask").addEventListener("click", () => {
    stopSpeech();
    $("#taskDialog").close();
  });
  $("#speakTask").addEventListener("click", () => speakText(taskSpeechText(taskById(state.activeTaskId)), { force: true }));
  $("#pauseTask").addEventListener("click", () => showToast("已暫停。休息一下，準備好了再繼續。"));
  $("#completeTask").addEventListener("click", completeActiveTask);
  $("#reportDiscomfort").addEventListener("click", () => {
    stopSpeech();
    $("#discomfortForm").reset();
    $("#discomfortDialog").showModal();
  });

  $("#discomfortOptions").innerHTML = discomfortTypes.map((type) => `
    <label><input type="radio" name="discomfortType" value="${type}" ${type === "頭暈" ? "checked" : ""} /> ${type}</label>
  `).join("");

  $$("input[name='screeningIssue']").forEach((input) => {
    input.addEventListener("change", () => {
      const noneInput = $("input[name='screeningIssue'][value='無']");
      if (!noneInput) return;
      if (input.value === "無" && input.checked) {
        $$("input[name='screeningIssue']").forEach((item) => {
          if (item !== noneInput) item.checked = false;
        });
        return;
      }
      if (input.value !== "無" && input.checked) noneInput.checked = false;
    });
  });

  $("#discomfortForm").addEventListener("submit", () => {
    const type = $("input[name='discomfortType']:checked")?.value || "不舒服";
    reportDiscomfort(type, $("#discomfortNote").value.trim());
  });

  $("#saveMeasure").addEventListener("click", saveMeasurements);
  $("#exportCsv").addEventListener("click", exportCsv);
  $("#exportJson").addEventListener("click", exportJson);
  $("#printReport").addEventListener("click", printReport);
  $("#copyCareMessage").addEventListener("click", async () => {
    const message = buildCareMessage();
    try {
      await navigator.clipboard.writeText(message);
      showToast("已複製照護者提醒文字。");
    } catch {
      showToast(message);
    }
  });
  $("#saveSettings").addEventListener("click", () => {
    const currentProfile = normalizeProfile(state.profile || {});
    const conditionItems = collectRiskItems("profileCondition");
    state.profile = {
      ...currentProfile,
      version: 2,
      name: $("#nameInput").value.trim() || "使用者",
      tier: resolveTier($("#tierInput").value, currentProfile.screening.map((value) => ({ value, risk: "moderate" })), conditionItems),
      conditions: conditionItems.map((item) => item.value),
      otherCondition: $("#otherConditionInput").value.trim(),
      conditionRisks: riskMap(conditionItems),
      character: collectCharacter("profile"),
      demographics: {
        ...currentProfile.demographics,
        sex: $("#sexInput").value,
        age: $("#ageInput").value,
        height: $("#heightInput").value,
        weight: $("#weightInput").value,
      },
    };
    state.settings = {
      largeText: $("#largeTextInput").checked,
      voiceEnabled: $("#voiceEnabledInput").checked,
      voiceRate: $("#voiceRateInput").value || "slow",
      reminder: $("#remindInput").value || "09:00",
      caregiver: $("#careContactInput").value.trim(),
      site: $("#siteInput").value.trim(),
    };
    saveState();
    render();
    showToast("設定已儲存。");
  });

  $("#resetData").addEventListener("click", () => {
    if (!confirm("確定要清除這個原型的本機資料嗎？")) return;
    state = structuredClone(defaultState);
    saveState();
    render();
    $("#onboardingDialog").showModal();
  });

  $("#onboardingForm").addEventListener("submit", () => {
    const issues = collectRiskItems("screeningIssue");
    const conditions = collectRiskItems("onboardCondition");
    const selectedTier = $("input[name='onboardTier']:checked")?.value || "A";
    const tier = resolveTier(selectedTier, issues, conditions);
    state.profile = {
      version: 2,
      name: $("#onboardName").value.trim() || "使用者",
      tier,
      screening: issues.map((item) => item.value),
      conditions: conditions.map((item) => item.value),
      otherCondition: $("#onboardOtherCondition").value.trim(),
      conditionRisks: riskMap(conditions),
      baselineGrip: state.profile?.baselineGrip || null,
      character: collectCharacter("onboard"),
      createdAt: state.profile?.createdAt || todayKey(),
      demographics: {
        sex: $("#onboardSex").value,
        age: $("#onboardAge").value,
        height: $("#onboardHeight").value,
        weight: $("#onboardWeight").value,
        dominantHand: $("#onboardDominantHand").value,
      },
    };
    if (!state.activeParticipantId) {
      state.activeParticipantId = createParticipantId();
    }
    state.participants[state.activeParticipantId] = currentSnapshot();
    saveState();
    render();
    showToast("設定完成，今天從安全的小任務開始。");
  });
}

function init() {
  initEvents();
  render();
  renderOnboardingCharacterPreview();
  registerServiceWorker();
  if (profileNeedsOnboarding()) {
    $("#onboardingDialog").showModal();
  }
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  const hadController = Boolean(navigator.serviceWorker.controller);
  let hasReloadedForUpdate = false;

  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (!hadController || hasReloadedForUpdate) return;
    hasReloadedForUpdate = true;
    showToast("新版已更新，正在重新載入。");
    window.setTimeout(() => window.location.reload(), 700);
  });

  navigator.serviceWorker.register("./service-worker.js").then((registration) => {
    registration.update();
    window.setInterval(() => registration.update(), 60 * 60 * 1000);
  }).catch(() => {
    showToast("離線快取尚未啟用，仍可用一般網頁模式操作。");
  });
}

init();
