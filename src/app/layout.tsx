import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import {
  PROFILE,
  SKILLS,
  PROJECTS,
  SITE_URL,
} from "@/lib/data";
import SeoContent from "@/components/dom/SeoContent";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const TITLE =
  "Harry Yu — Software Engineer | Systems, Machine Learning & 3D";
const DESCRIPTION =
  "Harry Yu is a software engineer and Brandeis CS graduate working across systems, machine learning, and interactive 3D — from real-time 3D pose-estimation research at Peking University to Dockerized monitoring stacks, Godot game development, and patented hardware design.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s · Harry Yu",
  },
  description: DESCRIPTION,
  applicationName: "Harry Yu Portfolio",
  authors: [{ name: PROFILE.name, url: SITE_URL }],
  creator: PROFILE.name,
  publisher: PROFILE.name,
  category: "technology",
  keywords: [
    "Harry Yu",
    "Harry Yu portfolio",
    "Shiyi Yu",
    "Software Engineer",
    "Brandeis University",
    "Systems Engineer",
    "Machine Learning Engineer",
    "Python Developer",
    "Rust Developer",
    "TypeScript",
    "Godot Game Developer",
    "Blender 3D",
    "Docker",
    "Peking University",
    "Real-Time Pose Estimation",
    "Waltham MA",
    "accessibility tech",
    "game developer Boston",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    firstName: PROFILE.firstName,
    lastName: "Yu",
    username: "harryyu",
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Harry Yu Portfolio",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: { url: "/favicon.svg", type: "image/svg+xml" },
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#02010a",
  colorScheme: "dark",
};

/**
 * Rich, linked structured data (schema.org @graph). Answer engines and AI
 * crawlers use this to understand who Harry is, what he does, and what he
 * has built — the backbone of AEO / AI-SEO. Built from the same content
 * data that drives the site so it never drifts out of sync.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: PROFILE.name,
      alternateName: PROFILE.fullName,
      givenName: PROFILE.firstName,
      familyName: "Yu",
      jobTitle: PROFILE.role,
      description: PROFILE.bio,
      url: `${SITE_URL}/`,
      email: `mailto:${PROFILE.email}`,
      telephone: PROFILE.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Waltham",
        addressRegion: "Massachusetts",
        addressCountry: "US",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Brandeis University",
      },
      hasOccupation: {
        "@type": "Occupation",
        name: PROFILE.role,
        occupationLocation: {
          "@type": "City",
          name: "Waltham, MA, USA",
        },
        skills: SKILLS.map((s) => s.items).join(" · "),
      },
      knowsAbout: [
        "Python",
        "Java",
        "Rust",
        "TypeScript",
        "GDScript",
        "Docker",
        "Bash",
        "Observability",
        "Tauri",
        "Blender",
        "Godot",
        "3D Printing",
        "Machine Learning",
        "Data Validation",
        "Statistics",
        "Real-Time Pose Estimation",
        "Game Development",
        "Hardware Design",
        "Accessibility Technology",
      ],
      sameAs: [PROFILE.socials.github, PROFILE.socials.website],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: "Harry Yu Portfolio",
      description: DESCRIPTION,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profilepage`,
      url: `${SITE_URL}/`,
      name: TITLE,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#person` },
      mainEntity: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/#projects`,
      name: "Projects by Harry Yu",
      numberOfItems: PROJECTS.length,
      itemListElement: PROJECTS.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "CreativeWork",
          name: p.title,
          headline: p.tagline,
          description: p.description,
          keywords: p.tags.join(", "),
          creator: { "@id": `${SITE_URL}/#person` },
          ...(p.link ? { url: p.link } : {}),
        },
      })),
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrains.variable} antialiased`}
    >
      <body>
        {children}
        {/* Text alternative to the WebGL experience — full, semantic content
            for screen readers and for AI/search crawlers that don't run JS. */}
        <SeoContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
