# Harry Yu's Personal Blog

A modern, fast, and responsive personal blog built with Next.js, TypeScript, and Tailwind CSS. This blog follows Josh Comeau's approach to building high-quality web applications with MDX for content management.

## 🚀 Features

- **Fast & Modern**: Built with Next.js App Router for optimal performance
- **MDX Content**: Write blog posts in Markdown with embedded React components
- **TypeScript**: Full type safety throughout the application
- **Responsive Design**: Looks great on all devices
- **SEO Optimized**: Built-in SEO features and meta tags
- **Syntax Highlighting**: Code blocks with automatic syntax highlighting
- **Reading Time**: Automatic reading time calculation for posts

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: MDX with next-mdx-remote
- **Deployment**: Ready for Vercel deployment

## 📁 Project Structure

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

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd blog-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## ✍️ Writing Blog Posts

Create new blog posts by adding `.mdx` files to the `content/blog/` directory.

### Blog Post Format

```mdx
---
title: "Your Post Title"
description: "A brief description of your post"
date: "2024-01-15"
author: "Harry Yu"
tags: ["Next.js", "React", "Web Development"]
---

# Your Post Title

Your content goes here...
```

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🎨 Customization

### Styling
- Modify `src/app/globals.css` for global styles
- Update `tailwind.config.js` for Tailwind customization
- Components use Tailwind classes for styling

### Content
- Add your blog posts to `content/blog/`
- Update the About page in `src/app/about/page.tsx`
- Modify personal information in the header and footer components

### Features
- Blog posts automatically generate reading time
- SEO meta tags are automatically generated
- Responsive design works across all devices

## 📝 Blog Post Features

- **Frontmatter**: YAML metadata for each post
- **Syntax Highlighting**: Automatic code highlighting
- **Reading Time**: Calculated based on word count
- **Tags**: Categorize posts with tags
- **SEO**: Automatic meta tags and structured data

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Other Platforms

This project can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

This is a personal blog, but suggestions and improvements are welcome!

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📬 Contact

- **Email**: harry@example.com
- **GitHub**: [@harryyu](https://github.com/harryyu)
- **LinkedIn**: [Harry Yu](https://linkedin.com/in/harryyu)

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS