/** Canonical origin — the public portfolio domain. */
export const SITE_URL = "https://harryyu.dev";

export const PROFILE = {
  name: "Harry Yu",
  firstName: "Harry",
  /** Full legal name for SEO/structured data accuracy. */
  fullName: "Shiyi (Harry) Yu",
  role: "Software Engineer",
  status: "Software engineer · CS '25 · open to roles",
  taglines: [
    "turn research into shipped products.",
    "build systems, games, and hardware.",
    "make complex systems feel simple.",
    "ship across the whole stack.",
    "engineer it, model it, ship it.",
  ],
  bio: "I'm a software engineer working across systems, machine learning, and interactive 3D. From real-time 3D pose-estimation research at Peking University to Dockerized monitoring stacks at REON and a Godot empathy game, I like building things that hold up under real use — tools, hardware, and experiences included.",
  about: {
    lead: "I build across the full spectrum — backend systems and data pipelines, ML research, game development, and hardware. I turn ambiguous problems into shipped, dependable things.",
    p2: "At Peking University's HOME Lab I worked on real-time 3D human pose estimation, building validation methods that surfaced joint instabilities visual inspection missed. At REON I owned a data-validation layer and a Dockerized monitoring stack that stabilized nightly experiment runs.",
    p3: "Outside of work I model in Blender, build games in Godot, run a localization channel with 1M+ followers, and hold a design patent for an all-in-one keyboard computer. I care about accessibility, craft, and making complexity feel simple.",
    credentials: [
      "B.S. Computer Science, Minor Economics — Brandeis (2021–2025)",
      "Research Assistant — Peking University HOME Lab (2025)",
      "Design Patent — CN306847318S (2021)",
      "Waltham, MA · Mandarin / English",
    ],
  },
  email: "harryyu2002@gmail.com",
  phone: "+1-857-243-5407",
  location: "Waltham, MA, USA",
  resume: "/Resume_HarryYu.pdf",
  siteUrl: `${SITE_URL}/`,
  socials: {
    github: "https://github.com/HandsomeHarry",
    website: "https://harryyu.dev",
  },
};

export type Job = {
  company: string;
  title: string;
  range: string;
  location: string;
  blurb: string;
  points: string[];
};

export const EXPERIENCE: Job[] = [
  {
    company: "Peking University — HOME Lab",
    title: "Research Assistant, Real-Time 3D Human Pose Estimation",
    range: "Jun 2025 — Dec 2025",
    location: "Beijing, China",
    blurb:
      "Contributed to sparse-sensor-based 3D motion reconstruction research for real-time human pose estimation.",
    points: [
      "Implemented calibration procedures and keypoint integration for real-time pose-estimation pipelines",
      "Developed validation methods tracing intermediate results — monitoring joint stability, temporal consistency, and latency",
      "Identified reconstruction instabilities that surface-level visual inspection missed",
      "Tested hypotheses around calibration accuracy, confidence thresholding, and temporal smoothing strategies",
      "Connected technical decisions to downstream HCI applications — sensor placement and motion representations for natural virtual character interaction",
    ],
  },
  {
    company: "REON Technology Inc.",
    title: "Software Engineer Intern",
    range: "Jun 2023 — Jan 2024",
    location: "Chelmsford, MA, USA",
    blurb:
      "Built the data-validation layer and observability stack behind BMS battery experiment analysis.",
    points: [
      "Designed a lightweight data-validation layer (schema checks, timestamp alignment, unit normalization) shifting analysis from manual clean-up to first-pass trustable datasets",
      "Orchestrated Dockerized services for the monitoring stack and added observability hooks (structured logs, health probes) — stabilizing nightly runs and enabling one-command deployments",
      "Built decision-ready Jupyter dashboards translating raw cycles into SoC/SoH and event views used in weekly stakeholder reviews",
      "Sped up reviews, reduced re-runs, and helped stakeholders triage anomalies earlier",
    ],
  },
  {
    company: "DIY Perks (Authorized Bilibili Channel)",
    title: "Channel Operator, Translator & Proofreader",
    range: "Nov 2020 — Present",
    location: "Online",
    blurb:
      "Led a 7-member team localizing creator content across Chinese platforms — 160+ videos, 250M+ views, 1M+ followers.",
    points: [
      "Led a 7-member team localizing and publishing creator content across Bilibili / Tencent / Baidu / Xigua, standardizing translation and QA workflows",
      "Shipped 160+ translated/proofread videos with 250M cumulative views; grew to 1M+ followers within the first month of launch",
      "Negotiated 6 brand partnerships (Royole, Flexispot, Influcity) generating $25,000+ in sponsorship revenue",
      "Built Python + Excel automation for payouts and tax tracking — cut monthly accounting from 8 hours to 1 hour and improved payout accuracy",
    ],
  },
  {
    company: "Brandeis University",
    title: "Teaching Assistant — COSI 150A: Compiler Design",
    range: "Jan 2024 — May 2024",
    location: "Waltham, MA, USA",
    blurb:
      "Held office hours, graded, and co-developed course materials for the upper-level compilers course.",
    points: [
      "Held weekly office hours assisting 20+ students with lexical analysis, parsing, code generation, and optimization",
      "Graded exams and assignments with detailed feedback reinforcing compiler theory and implementation",
      "Collaborated with the professor to prepare lecture materials, problem sets, and exam questions",
    ],
  },
];

export type Skill = {
  /** HUD module number, "01".."06" */
  num: string;
  name: string;
  items: string;
};

export const SKILLS: Skill[] = [
  { num: "01", name: "Programming", items: "Python · Java · Rust · TypeScript · GDScript" },
  { num: "02", name: "Data & ML", items: "Jupyter · Statistics · Data Validation" },
  { num: "03", name: "Systems & Infra", items: "Docker · Bash · Observability · Tauri" },
  { num: "04", name: "3D & Visualization", items: "Blender · Godot · 3D Printing" },
  { num: "05", name: "Game Dev & DIY", items: "Behavior-Tree AI · VFX · PC Building" },
  { num: "06", name: "Languages", items: "Mandarin (Native) · English (Fluent)" },
];

export type Project = {
  id: string;
  title: string;
  meta: string;
  tagline: string;
  description: string;
  tags: string[];
  /** Gradient endpoints used to generate the orbiting card artwork. */
  colorA: string;
  colorB: string;
  /** External link (GitHub / store). Null = no public link. */
  link: string | null;
  linkLabel?: string;
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    id: "companion-cube",
    title: "Companion Cube",
    meta: "2025 · ML · Privacy-first",
    tagline: "Focus detection that stays on-device",
    description:
      "ADHD productivity app with on-device focus-state classification (76.8% accuracy on distraction patterns) and a privacy-first SQLite architecture — no user data ever leaves the machine.",
    tags: ["Python", "Machine Learning", "SQLite", "Tauri"],
    colorA: "#7c3aed",
    colorB: "#4cc9f0",
    link: null,
    featured: true,
  },
  {
    id: "adhd-simulator",
    title: "ADHD Simulator",
    meta: "2025 · Godot · Game",
    tagline: "Turning symptoms into experiential mechanics",
    description:
      "Godot game that translates ADHD symptoms into mechanics — magnetic cursor attraction, reading minigames, time distortion. Blender-modeled environments, behavior-tree boss AI, 3+ hours of content, 500+ downloads in week one.",
    tags: ["Godot", "GDScript", "Blender", "VFX"],
    colorA: "#ef4444",
    colorB: "#fbbf24",
    link: null,
  },
  {
    id: "pose-estimation",
    title: "Real-Time 3D Pose Estimation",
    meta: "2025 · Research · Peking University",
    tagline: "Sparse-sensor motion reconstruction",
    description:
      "Research at Peking University's HOME Lab on real-time 3D human pose estimation from sparse sensors — calibration procedures, keypoint integration, and validation methods tracing joint stability, temporal consistency, and latency.",
    tags: ["Research", "3D", "Pose Estimation", "Python"],
    colorA: "#22d3ee",
    colorB: "#a3e635",
    link: null,
  },
  {
    id: "keyboard-patent",
    title: "All-in-One Keyboard",
    meta: "2021 · Design Patent · CN306847318S",
    tagline: "A full PC under your fingertips",
    description:
      "Patented (CN306847318S) all-in-one computer design embedding a laptop motherboard beneath an ergonomic mechanical keyboard — reducing desk footprint while maintaining full typing comfort.",
    tags: ["Hardware", "Design Patent", "CAD"],
    colorA: "#0069ff",
    colorB: "#4cc9f0",
    link: null,
  },
  {
    id: "farm-traceability",
    title: "Farm Traceability Cam",
    meta: "2023 · DeisHacks · Best Marketing",
    tagline: "Time-lapse crops → scannable QR produce",
    description:
      "DeisHacks 2023 Best Marketing winner (team of 2): a repurposed-laptop-camera system filming crop growth and linking time-lapse videos to scannable QR codes for local farm produce traceability.",
    tags: ["Python", "QR", "Hardware", "Hackathon"],
    colorA: "#34a853",
    colorB: "#fbbf24",
    link: null,
  },
  {
    id: "diyperks-localization",
    title: "DIY Perks Localization",
    meta: "2020–Present · Media · 1M+ followers",
    tagline: "160+ videos · 250M views · 1M+ followers",
    description:
      "Led a 7-member team localizing creator content across Bilibili / Tencent / Baidu / Xigua — 160+ videos, 250M cumulative views, 1M+ followers in the first month. Built Python + Excel automation for payouts and tax tracking (8h → 1h/month).",
    tags: ["Localization", "Python", "Automation", "Ops"],
    colorA: "#ff4444",
    colorB: "#f0abfc",
    link: null,
  },
  {
    id: "ai-chat-platform",
    title: "Self-Hosted AI Chat",
    meta: "Ongoing · LLM · Infra",
    tagline: "Qwen LLMs on my own GPUs",
    description:
      "Self-hosted LLM chat platform running Qwen models on a home RTX 3090Ti rig — Dockerized model serving, inference, and a web UI. Why pay OpenAI when you can pay the electricity bill instead? (Spent more on power than API calls would've cost, but learned a ton about LLM deployment.)",
    tags: ["LLM", "Docker", "DevOps", "Python"],
    colorA: "#10b981",
    colorB: "#3b82f6",
    link: "https://ai.harryyu.dev/",
    linkLabel: "Try it live",
    featured: true,
  },
  {
    id: "cs-robot-competition",
    title: "CS Robot Competition",
    meta: "Side project · Robotics",
    tagline: "2v2 real-robot Counter-Strike",
    description:
      "2v2 real-robot Counter-Strike — because regular programming wasn't complicated enough. Computer vision for target detection, pathfinding algorithms, and multi-robot networking. Current status: robots can see each other, sometimes they even move.",
    tags: ["Robotics", "Computer Vision", "Pathfinding", "Networking"],
    colorA: "#f97316",
    colorB: "#a855f7",
    link: null,
  },
];

export const ARCHIVE_URL = "https://github.com/HandsomeHarry";
