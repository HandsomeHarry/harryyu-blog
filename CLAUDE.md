# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Primary Development:**
- `npm run dev` - Start development server on http://localhost:3000
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint checks

**Content Development:**
- Add new blog posts by creating `.mdx` files in `/content/blog/`
- Images go in `/public/images/blog/[post-name]/`
- Use existing frontmatter structure with title, description, date, author, tags

## Architecture Overview

**Next.js 14 App Router Blog** with TypeScript, Tailwind CSS, and MDX content management.

**Key Architecture Patterns:**
- **App Router Structure**: `/src/app/` contains pages and layouts
- **Content-First**: MDX posts in `/content/blog/` with gray-matter frontmatter
- **Type Safety**: Full TypeScript with interfaces in `/src/types/blog.ts`
- **Utility Layer**: Blog management functions in `/src/lib/blog.ts`
- **Component-Based**: Reusable components in `/src/components/`

**Content Pipeline:**
1. MDX files processed with next-mdx-remote
2. Frontmatter parsed with gray-matter
3. Static generation via generateStaticParams
4. Syntax highlighting with rehype-highlight
5. Auto-generated reading time and anchor links

**Styling System:**
- Tailwind CSS with custom typography plugin
- Responsive design with mobile-first approach
- PostCSS with Autoprefixer
- Custom prose styles for blog content

## Key Files for Development

**Core Functionality:**
- `/src/lib/blog.ts` - Blog post reading, parsing, and utility functions
- `/src/types/blog.ts` - TypeScript interfaces for BlogPost and BlogPostMeta
- `/src/app/blog/[slug]/page.tsx` - Dynamic blog post pages
- `/tailwind.config.js` - Styling configuration with typography plugin

**Content Management:**
- `/content/blog/` - MDX blog posts directory
- `/public/images/blog/` - Blog post images organized by post
- `/public/files/` - Downloadable assets (STL files, etc.)

**Layout & Components:**
- `/src/app/layout.tsx` - Root layout with Header/Footer
- `/src/components/Header.tsx` - Navigation with responsive design
- `/src/components/Footer.tsx` - Social links and site info

## Development Patterns

**Adding Blog Posts:**
1. Create `.mdx` file in `/content/blog/` with kebab-case filename
2. Include required frontmatter: title, description, date, author, tags
3. Add images to `/public/images/blog/[post-name]/`
4. Use existing MDX components and Tailwind classes for styling

**Extending Blog Features:**
- Modify `/src/lib/blog.ts` for new blog functionality (search, filtering)
- Add new types to `/src/types/blog.ts`
- Follow App Router patterns for new pages
- Leverage existing component structure for consistency

**Styling Guidelines:**
- Primary color: blue-600 (#2563eb)
- Use Tailwind utility classes
- Responsive design with mobile-first approach
- Leverage @tailwindcss/typography for prose content