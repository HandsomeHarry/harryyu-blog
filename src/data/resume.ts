// Résumé content for the homepage, mirrored from public/Resume_HarryYu.pdf.
// Keep this in step with the PDF; projects live in src/content/projects.

export type Entry = {
  org: string;
  role: string;
  dates: string;
  place: string;
  points: string[];
  href?: string;
};

export const experience: Entry[] = [
  {
    org: "Peking University — HOME Lab",
    role: "Research Assistant, real-time 3D human pose estimation",
    dates: "Jun 2025 – Dec 2025",
    place: "Beijing",
    points: [
      "Implemented calibration and keypoint integration for sparse-sensor 3D motion reconstruction running in real time.",
      "Built validation that traces intermediate results for joint stability, temporal consistency and latency, catching instabilities visual inspection missed.",
      "Tied sensor placement and motion representation back to HCI uses: more natural virtual characters and real-time feedback.",
    ],
  },
  {
    org: "Brandeis University",
    role: "Teaching Assistant, COSI 150A Compiler Design",
    dates: "Jan 2024 – May 2024",
    place: "Waltham, MA",
    points: [
      "Weekly office hours for 20+ students on lexing, parsing, code generation and optimization.",
      "Graded exams and assignments; helped write lecture materials, problem sets and exam questions.",
    ],
  },
  {
    org: "REON Technology",
    role: "Software Engineer Intern",
    dates: "Jun 2023 – Jan 2024",
    place: "Chelmsford, MA",
    points: [
      "Designed a data-validation layer (schema checks, timestamp alignment, unit normalization) so battery experiments produced trustable datasets on the first pass.",
      "Dockerized the monitoring stack with structured logs and health probes: stable nightly runs, one-command deploys.",
      "Built Jupyter dashboards turning raw cycles into SoC/SoH and event views used in weekly triage.",
    ],
  },
  {
    org: "DIY Perks — authorized Bilibili channel",
    role: "Channel Operator, Translator & Proofreader",
    dates: "Nov 2020 – present",
    place: "Online",
    href: "/work/diy-perks-china",
    points: [
      "Lead a 7-person team localizing videos across Bilibili, Tencent, Baidu and Xigua on a weekly schedule.",
      "160+ videos, 250M cumulative views, 1M+ followers in the first month.",
      "Negotiated 6 brand partnerships worth $25,000+; Python + Excel automation cut monthly accounting from 8 hours to 1.",
    ],
  },
];

export const leadership: Entry[] = [
  {
    org: "Brandeis PC Building Club",
    role: "Founder & President",
    dates: "Nov 2023 – present",
    place: "Waltham, MA",
    points: [
      "Started from zero; 25+ sign-ups in 48 hours.",
      "Ran 6 workshops for 30 students, ending in 20 working PCs, plus parts-selection guides scored per use case.",
    ],
  },
  {
    org: "Bit by Bit",
    role: "Director of Corporate Relations",
    dates: "Oct 2022 – May 2023",
    place: "",
    points: [
      "Led 13 volunteers teaching free coding classes to public-school students during remote learning.",
      "Designed a logic-gates module built in Minecraft Redstone for first-time coders.",
    ],
  },
];

export const awards: { title: string; detail: string; href?: string }[] = [
  {
    title: "Design patent CN306847318S, 2021",
    detail: "An all-in-one computer built under an ergonomic mechanical keyboard.",
    href: "/work/keyboard-computer",
  },
  {
    title: "DeisHacks Best Marketing Award, 2023",
    detail: "Laptop-camera time-lapses of crop growth, linked to produce by QR code for farm traceability.",
  },
  {
    title: "HiMCM Honorable Mention, 2019",
    detail: "Modeled the environmental and economic effects of plastic-bottle bans.",
  },
];

export const education = {
  school: "Brandeis University",
  degree: "B.S. Computer Science, minor in Economics",
  dates: "Sept 2021 – May 2025",
  notes: [
    "Dean's List, Fall 2023 and Spring 2025.",
    "Coursework: Human–Computer Interaction, Practical Machine Learning with Big Data, Software Entrepreneurship, Probability & Statistics, Applied Linear Algebra, Mobile App Development.",
  ],
};

export const skills: [string, string][] = [
  ["Programming", "Python, Java, Rust, TypeScript, GDScript"],
  ["Data & ML", "Jupyter, data validation, statistics"],
  ["Systems", "Docker, Bash automation, observability, Tauri"],
  ["3D & games", "Blender, Godot, 3D printing"],
  ["Languages", "Mandarin (native), English (fluent)"],
];
