"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  PROFILE,
  EXPERIENCE,
  SKILLS,
  PROJECTS,
  ARCHIVE_URL,
  type Job,
  type Project,
  type Skill,
} from "./data";

/**
 * Client-side language switching (EN / 简体中文).
 *
 * The whole portfolio is a single-page canvas experience, so we don't use
 * locale routing — instead a LanguageProvider holds the active locale
 * (persisted to localStorage, defaulted from the browser language) and every
 * text-bearing component reads its strings from `useI18n().t`. SEO/structured
 * data in layout.tsx stays English (the canonical, indexed copy).
 *
 * Canvas-generated textures (skill cards, project cards, billboard labels)
 * also consume this, keying their useMemo on `locale` so they regenerate when
 * the language flips.
 */

export type Locale = "en" | "zh";

/* ------------------------------------------------------------------ */
/* Content bundles                                                     */
/* ------------------------------------------------------------------ */

/** All the non-data chrome strings, keyed per locale. */
type UI = {
  nav: {
    home: string;
    launch: string;
    about: string;
    work: string;
    skills: string;
    projects: string;
    contact: string;
    resume: string;
    backToTop: string;
    openMenu: string;
    closeMenu: string;
    language: string;
  };
  hero: { scrollTo: string; explore: string };
  about: { kicker: string; headingLead: string; headingHighlight: string };
  experience: { kicker: string };
  skills: { kicker: string; heading: string; subheading: string };
  projects: {
    kicker: string;
    heading: string;
    inspectHint: string;
    archive: string;
    targetLocked: string;
  };
  contact: {
    kicker: string;
    headingLead: string;
    headingHighlight: string;
    copy: string;
    mailNote: string;
    socialsLabel: string;
    footer: string;
  };
  billboards: { about: string; projects: string; contact: string };
  modal: {
    missionBrief: string;
    featured: string;
    visit: string;
    missionFile: string;
    close: string;
  };
  loader: { initializing: string; loading: string };
  hud: { secLabel: string };
};

export type Content = {
  profile: typeof PROFILE;
  experience: Job[];
  skills: Skill[];
  projects: Project[];
  archiveUrl: string;
  ui: UI;
};

const uiEn: UI = {
  nav: {
    home: "Home",
    launch: "Launch",
    about: "About",
    work: "Work",
    skills: "Skills",
    projects: "Projects",
    contact: "Contact",
    resume: "Résumé",
    backToTop: "Back to top",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
  },
  hero: { scrollTo: "Scroll To", explore: "Explore" },
  about: {
    kicker: "01 // About",
    headingLead: "Full stack, fewer ",
    headingHighlight: "bottlenecks",
  },
  experience: { kicker: "02 // Where I've worked" },
  skills: {
    kicker: "// Systems check",
    heading: "Skill modules online",
    subheading: "FLY THROUGH THE CALIBRATION CORRIDOR",
  },
  projects: {
    kicker: "03 // Some things I've built",
    heading: "Projects in orbit",
    inspectHint: "▸ CLICK A CARD TO INSPECT",
    archive: "Explore the archive ↗",
    targetLocked: "TARGET LOCKED //",
  },
  contact: {
    kicker: "04 // What's next",
    headingLead: "Let's make something ",
    headingHighlight: "together",
    copy: "I'm currently open to new opportunities — full-time, contract, or just a good chat. Whether you have a project idea, a question, or you just want to say hi, my inbox is the best way to reach me.",
    mailNote: "Opens your mail app — I reply within 24h",
    socialsLabel: "GitHub · Website · Email",
    footer: "© 2026 HARRY YU — BUILT WITH NEXT.JS + R3F",
  },
  billboards: { about: "ABOUT ME", projects: "PROJECTS", contact: "CONTACT" },
  modal: {
    missionBrief: "▸ MISSION BRIEF",
    featured: "★ FEATURED PROJECT",
    visit: "Visit project",
    missionFile: "MISSION FILE //",
    close: "Close",
  },
  loader: { initializing: "Initializing Launch Sequence", loading: "Loading" },
  hud: { secLabel: "SEC" },
};

const uiZh: UI = {
  nav: {
    home: "首页",
    launch: "点火",
    about: "关于",
    work: "经历",
    skills: "技能",
    projects: "项目",
    contact: "联系",
    resume: "简历",
    backToTop: "回到顶部",
    openMenu: "打开菜单",
    closeMenu: "关闭菜单",
    language: "语言",
  },
  hero: { scrollTo: "向下滚动", explore: "开启探索" },
  about: {
    kicker: "01 // 关于",
    headingLead: "全栈能力，告别",
    headingHighlight: "瓶颈",
  },
  experience: { kicker: "02 // 工作经历" },
  skills: {
    kicker: "// 系统自检",
    heading: "技能模块上线",
    subheading: "穿越校准通道",
  },
  projects: {
    kicker: "03 // 我做过的东西",
    heading: "项目在轨",
    inspectHint: "▸ 点击卡片查看详情",
    archive: "查看代码仓库 ↗",
    targetLocked: "目标锁定 //",
  },
  contact: {
    kicker: "04 // 下一步",
    headingLead: "一起做点",
    headingHighlight: "东西吧",
    copy: "我目前正在寻找新的机会——全职、合同制，或者只是想聊聊都行。无论你有一个项目想法、一个问题，还是只想打个招呼，邮箱都是联系我的最佳方式。",
    mailNote: "打开邮件应用 —— 24 小时内回复",
    socialsLabel: "GitHub · 网站 · 邮箱",
    footer: "© 2026 HARRY YU —— 由 NEXT.JS + R3F 构建",
  },
  billboards: { about: "关于我", projects: "项目", contact: "联系方式" },
  modal: {
    missionBrief: "▸ 任务简报",
    featured: "★ 精选项目",
    visit: "访问项目",
    missionFile: "任务档案 //",
    close: "关闭",
  },
  loader: { initializing: "正在初始化发射程序", loading: "加载中" },
  hud: { secLabel: "区段" },
};

/* ----- Chinese content (data.ts is the English source of truth) ----- */

const profileZh: typeof PROFILE = {
  ...PROFILE,
  status: "软件工程师 · 25 届计算机科学 · 寻找机会",
  bio: "我是一名软件工程师，工作横跨系统、机器学习与交互式三维。从北京大学的实时三维人体姿态估计研究，到 REON 的 Docker 化监控技术栈，再到一款用 Godot 制作的共情游戏——我喜欢建造那些经得起真实使用的东西，无论是工具、硬件还是体验。",
  about: {
    lead: "我的技术栈覆盖整个频谱——后端系统与数据管线、机器学习研究、游戏开发与硬件。我把模糊的问题变成可交付、靠得住的成果。",
    p2: "在北京大学 HOME 实验室，我参与了实时三维人体姿态估计的研究，构建了能发现肉眼检查遗漏的关节不稳定性的验证方法。在 REON，我负责一套数据校验层和 Docker 化监控技术栈，让每晚的实验运行稳定下来。",
    p3: "工作之外，我用 Blender 建模、用 Godot 做游戏、运营一个拥有百万粉丝的字幕频道，还持有一体化键盘电脑的设计专利。我在意无障碍、匠心，以及让复杂的事物变得简单。",
    credentials: [
      "布兰迪斯大学 计算机科学学士，辅修经济学（2021–2025）",
      "研究助理 —— 北京大学 HOME 实验室（2025）",
      "设计专利 —— CN306847318S（2021）",
      "美国马萨诸塞州沃尔瑟姆 · 中文 / 英文",
    ],
  },
};

const experienceZh: Job[] = [
  {
    company: "北京大学 —— HOME 实验室",
    title: "研究助理 · 实时三维人体姿态估计",
    range: "2025 年 6 月 — 2025 年 12 月",
    location: "中国 北京",
    blurb: "参与基于稀疏传感器的三维运动重建研究，用于实时人体姿态估计。",
    points: [
      "实现了校准流程和关键点融合，用于实时姿态估计管线",
      "开发了追踪中间结果的验证方法，监测关节稳定性、时间一致性与延迟",
      "发现了表面视觉检查难以察觉的重建不稳定性",
      "围绕校准精度、置信度阈值和时间平滑策略进行系统性假设检验",
      "将技术决策与下游 HCI 应用联系起来，探索传感器布局与运动表示如何实现更自然的虚拟角色交互",
    ],
  },
  {
    company: "REON Technology Inc.",
    title: "软件工程师实习生",
    range: "2023 年 6 月 — 2024 年 1 月",
    location: "美国 马萨诸塞州 Chelmsford",
    blurb: "构建了 BMS 电池实验分析背后的数据校验层与可观测性技术栈。",
    points: [
      "设计了一套轻量级数据校验层（模式检查、时间戳对齐、单位归一化），将分析工作从手工清理转变为首遍即可信的数据集",
      "为监控技术栈编排了 Docker 化的服务，并添加了可观测性钩子（结构化日志、健康探针）——稳定了每晚的运行并实现一键部署",
      "构建了可直接用于决策的 Jupyter 仪表盘，把原始循环数据转化为 SoC/SoH 与事件视图，供每周的干系人评审使用",
      "加快了评审速度、减少了重跑，并帮助干系人更早地分派异常",
    ],
  },
  {
    company: "DIY Perks（Bilibili 授权频道）",
    title: "频道主理人 · 翻译与校对",
    range: "2020 年 11 月 — 至今",
    location: "线上",
    blurb: "带领 7 人团队在中文平台本地化创作者内容——160+ 视频、2.5 亿+ 播放、100 万+ 粉丝。",
    points: [
      "带领 7 人团队在 Bilibili / 腾讯 / 百度 / 西瓜等平台本地化并发布创作者内容，规范了翻译与质检流程",
      "发布了 160+ 部翻译/校对视频，累计播放量 2.5 亿次；上线首月即增长至 100 万+ 粉丝",
      "洽谈了 6 个品牌合作（柔宇、Flexispot、Influcity），带来 25,000 美元以上的赞助收入",
      "用 Python + Excel 搭建了付款与税务跟踪的自动化——将每月的会计工作从 8 小时压缩到 1 小时",
    ],
  },
  {
    company: "布兰迪斯大学",
    title: "助教 —— COSI 150A：编译器设计",
    range: "2024 年 1 月 — 2024 年 5 月",
    location: "美国 马萨诸塞州 沃尔瑟姆",
    blurb: "为高年级编译器课程答疑、阅卷，并协助开发课程资料。",
    points: [
      "每周答疑，协助 20 多名学生理解词法分析、语法分析、代码生成与优化",
      "批改考试与作业，提供详尽反馈以巩固编译器理论与实现",
      "与教授合作准备讲义材料、习题集和考试题目",
    ],
  },
];

const skillsZh: Skill[] = [
  { num: "01", name: "编程语言", items: "Python · Java · Rust · TypeScript · GDScript" },
  { num: "02", name: "数据与机器学习", items: "Jupyter · 统计学 · 数据校验" },
  { num: "03", name: "系统与基础设施", items: "Docker · Bash · 可观测性 · Tauri" },
  { num: "04", name: "三维与可视化", items: "Blender · Godot · 3D 打印" },
  { num: "05", name: "游戏开发与 DIY", items: "行为树 AI · VFX · 装机" },
  { num: "06", name: "自然语言", items: "中文（母语）· 英语（流利）" },
];

const projectsZh: Project[] = PROJECTS.map((p) => {
  // Project titles are product names — kept in English. Taglines,
  // descriptions and meta translate; tech tags stay as-is.
  const map: Record<string, { meta: string; tagline: string; description: string }> = {
    "companion-cube": {
      meta: "2025 · 机器学习 · 隐私优先",
      tagline: "焦点检测，全程在本地",
      description:
        "ADHD 生产力应用，在本地完成焦点状态分类（对分心模式的识别准确率 76.8%），采用隐私优先的 SQLite 架构——任何用户数据都不会离开设备。",
    },
    "adhd-simulator": {
      meta: "2025 · Godot · 游戏",
      tagline: "把症状变成可体验的机制",
      description:
        "一款用 Godot 制作的、将 ADHD 症状转化为游戏机制的游戏——磁性光标吸引、阅读小游戏、时间扭曲。Blender 建模的场景、行为树 boss AI、3 小时以上的内容，上线首周 500+ 下载。",
    },
    "pose-estimation": {
      meta: "2025 · 研究 · 北京大学",
      tagline: "稀疏传感器运动重建",
      description:
        "在北京大学 HOME 实验室进行的基于稀疏传感器的实时三维人体姿态估计研究——校准流程、关键点融合，以及追踪关节稳定性、时间一致性与延迟的验证方法。",
    },
    "keyboard-patent": {
      meta: "2021 · 设计专利 · CN306847318S",
      tagline: "一台藏于指尖下的完整电脑",
      description:
        "获得专利（CN306847318S）的一体化电脑设计，将笔记本主板嵌入一把人体工学机械键盘下方——在保持完整打字体验的同时缩减桌面占用。",
    },
    "farm-traceability": {
      meta: "2023 · DeisHacks · 最佳营销奖",
      tagline: "延时农作物 → 可扫描的二维码产品",
      description:
        "DeisHacks 2023 最佳营销奖（2 人团队）：一套用旧笔记本摄像头拍摄作物生长、并将延时视频链接到可扫描二维码的系统，用于本地农产品的溯源。",
    },
    "diyperks-localization": {
      meta: "2020–至今 · 媒体 · 100 万+ 粉丝",
      tagline: "160+ 视频 · 2.5 亿播放 · 100 万+ 粉丝",
      description:
        "带领 7 人团队在 Bilibili / 腾讯 / 百度 / 西瓜本地化创作者内容——160+ 视频、累计 2.5 亿播放、首月 100 万+ 粉丝。用 Python + Excel 搭建付款与税务自动化（每月 8 小时 → 1 小时）。",
    },
    "ai-chat-platform": {
      meta: "持续进行 · LLM · 基础设施",
      tagline: "在自己显卡上跑 Qwen 大模型",
      description:
        "自托管的大模型聊天平台，在家里的 RTX 3090Ti 上运行 Qwen 模型——Docker 化的模型服务、推理与网页 UI。与其给 OpenAI 付钱，不如交电费！（电费其实花得比 API 调用还多，但关于 LLM 部署学到一大堆。）",
    },
    "cs-robot-competition": {
      meta: "业余项目 · 机器人",
      tagline: "2v2 真实机器人反恐精英",
      description:
        "2v2 真实机器人反恐精英——因为普通编程还不够复杂。用计算机视觉进行目标检测、寻路算法、多机器人联网。当前状态：机器人能互相看见，偶尔还会动一下。",
    },
  };
  const zh = map[p.id];
  return zh ? { ...p, ...zh } : p;
});

const content: Record<Locale, Content> = {
  en: {
    profile: PROFILE,
    experience: EXPERIENCE,
    skills: SKILLS,
    projects: PROJECTS,
    archiveUrl: ARCHIVE_URL,
    ui: uiEn,
  },
  zh: {
    profile: profileZh,
    experience: experienceZh,
    skills: skillsZh,
    projects: projectsZh,
    archiveUrl: ARCHIVE_URL,
    ui: uiZh,
  },
};

/* ------------------------------------------------------------------ */
/* Provider + hook                                                     */
/* ------------------------------------------------------------------ */

type Ctx = { locale: Locale; setLocale: (l: Locale) => void; t: Content };

const LanguageContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "harryyu-locale";

function detectInitialLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "en" || stored === "zh") return stored;
  return navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  // Hydrate from storage / browser language after mount. This MUST run in an
  // effect (not a lazy useState initializer) because localStorage/navigator
  // are unavailable during SSR — reading them during render would cause a
  // hydration mismatch. One post-mount setState is the correct pattern here.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    setLocaleState(detectInitialLocale());
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* storage may be unavailable (private mode) — non-fatal */
    }
  }, []);

  const value = useMemo<Ctx>(
    () => ({ locale, setLocale, t: content[locale] }),
    [locale, setLocale]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useI18n(): Ctx {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useI18n must be used within a LanguageProvider");
  return ctx;
}
