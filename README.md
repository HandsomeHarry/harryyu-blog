# Harry Yu's Blog

A modern, fast, and responsive blog website built with Next.js, TypeScript, and Tailwind CSS. Thanks to Josh Comeau for his inspirations!


## Stuff used

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: MDX with next-mdx-remote
- **Deployment**: Vercel

## Website Structure

```
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── blog/           # Blog pages
│   │   │   └── [slug]/     # Dynamic blog post pages
│   │   ├── about/          # About page
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── components/         # React components
│   │   ├── Header.tsx      # Site header
│   │   └── Footer.tsx      # Site footer
│   ├── lib/               # Utility functions
│   │   └── blog.ts        # Blog post utilities
│   └── types/             # TypeScript type definitions
│       └── blog.ts        # Blog-related types
├── content/
│   └── blog/              # MDX blog posts
├── public/                # Static assets
└── package.json
```


---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS