import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getBlogPost, getBlogSlugs } from '@/lib/blog';
import { BlogPost } from '@/types/blog';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';

// Custom components for MDX
const components = {
  h1: (props: any) => <h1 className="text-3xl font-bold mb-6 text-gray-900" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-bold mb-4 mt-8 text-gray-900" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-bold mb-3 mt-6 text-gray-900" {...props} />,
  p: (props: any) => <p className="mb-4 text-gray-700 leading-relaxed" {...props} />,
  ul: (props: any) => <ul className="mb-4 list-disc list-inside text-gray-700 space-y-1" {...props} />,
  ol: (props: any) => <ol className="mb-4 list-decimal list-inside text-gray-700 space-y-1" {...props} />,
  li: (props: any) => <li className="leading-relaxed" {...props} />,
  a: (props: any) => <a className="text-blue-600 hover:text-blue-800 underline" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 italic my-6 text-gray-600" {...props} />
  ),
  code: (props: any) => (
    <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-gray-800" {...props} />
  ),
  pre: (props: any) => (
    <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto mb-6 border" {...props} />
  ),
};

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = getBlogSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace('.mdx', ''),
  }));
}

export async function generateMetadata({ params }: PageProps) {
  try {
    const post = getBlogPost(params.slug);
    return {
      title: `${post.title} - Harry Yu`,
      description: post.description,
      authors: [{ name: post.author }],
    };
  } catch {
    return {
      title: 'Post Not Found - Harry Yu',
    };
  }
}

export default function BlogPostPage({ params }: PageProps) {
  let post: BlogPost;
  
  try {
    post = getBlogPost(params.slug);
  } catch {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-8">
        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
          <time>{post.date}</time>
          <span>{post.readingTime} min read</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <p className="text-xl text-gray-600 mb-6">{post.description}</p>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </header>
      
      <div className="prose prose-lg max-w-none">
        <MDXRemote
          source={post.content}
          components={components}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [
                rehypeSlug,
                [rehypeAutolinkHeadings, { behavior: 'wrap' }],
                rehypeHighlight,
              ],
            },
          }}
        />
      </div>
      
      <footer className="mt-12 pt-8 border-t border-gray-200">
        <p className="text-gray-600">
          Written by <span className="font-medium text-gray-900">{post.author}</span>
        </p>
      </footer>
    </article>
  );
}