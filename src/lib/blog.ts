import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost, BlogPostMeta } from '@/types/blog';

const contentDirectory = path.join(process.cwd(), 'content/blog');

// Calculate reading time (roughly 200 words per minute)
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// Get all blog post slugs
export function getBlogSlugs(): string[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }
  return fs.readdirSync(contentDirectory).filter(file => file.endsWith('.mdx'));
}

// Get blog post by slug
export function getBlogPost(slug: string): BlogPost {
  const fileName = slug.endsWith('.mdx') ? slug : `${slug}.mdx`;
  const fullPath = path.join(contentDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  return {
    slug: slug.replace('.mdx', ''),
    title: data.title || '',
    description: data.description || '',
    date: data.date || '',
    author: data.author || 'Harry Yu',
    tags: data.tags || [],
    content,
    readingTime: calculateReadingTime(content),
  };
}

// Get all blog posts metadata
export function getAllBlogPosts(): BlogPostMeta[] {
  const slugs = getBlogSlugs();
  return slugs
    .map((slug) => {
      const post = getBlogPost(slug);
      return {
        slug: post.slug,
        title: post.title,
        description: post.description,
        date: post.date,
        author: post.author,
        tags: post.tags,
        readingTime: post.readingTime,
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

// Get recent blog posts
export function getRecentBlogPosts(limit: number = 5): BlogPostMeta[] {
  return getAllBlogPosts().slice(0, limit);
}