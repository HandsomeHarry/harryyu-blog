import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getBlogPost, getBlogSlugs } from '@/lib/blog';
import { BlogPost } from '@/types/blog';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import CodeBlock from '@/components/CodeBlock';
import { ReadingProgress } from '@/components/ScrollAnimations';
import { BlogPostStructuredData } from '@/components/StructuredData';

// Custom components for MDX
const components = {
  h1: (props: any) => <h1 className="text-5xl md:text-6xl font-extrabold mb-8 mt-12 text-gray-900 dark:text-cream leading-tight tracking-tight" {...props} />,
  h2: (props: any) => <h2 className="text-3xl md:text-4xl font-bold mb-6 mt-12 text-gray-900 dark:text-cream leading-tight" {...props} />,
  h3: (props: any) => <h3 className="text-2xl md:text-3xl font-bold mb-4 mt-10 text-gray-900 dark:text-cream leading-snug" {...props} />,
  h4: (props: any) => <h4 className="text-xl md:text-2xl font-semibold mb-3 mt-8 text-gray-900 dark:text-cream" {...props} />,
  h5: (props: any) => <h5 className="text-lg md:text-xl font-semibold mb-2 mt-6 text-gray-900 dark:text-cream" {...props} />,
  h6: (props: any) => <h6 className="text-base md:text-lg font-semibold mb-2 mt-4 text-gray-900 dark:text-cream" {...props} />,
  p: (props: any) => <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed text-lg" {...props} />,
  ul: (props: any) => <ul className="mb-6 list-disc list-outside ml-6 text-gray-700 dark:text-gray-300 space-y-2 text-lg" {...props} />,
  ol: (props: any) => <ol className="mb-6 list-decimal list-outside ml-6 text-gray-700 dark:text-gray-300 space-y-2 text-lg" {...props} />,
  li: (props: any) => <li className="leading-relaxed text-gray-700 dark:text-gray-300" {...props} />,
  a: (props: any) => <a className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline decoration-2 underline-offset-2 transition-colors duration-200" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-blue-500 pl-6 italic my-8 text-gray-600 dark:text-gray-300 text-lg bg-blue-50 dark:bg-gray-800 py-4 rounded-r-lg" {...props} />
  ),
  code: (props: any) => (
    <code className="bg-blue-50 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-md text-sm font-mono font-semibold border border-blue-200 dark:border-blue-700" {...props} />
  ),
  pre: (props: any) => {
    const textContent = props.children?.props?.children || '';
    return <CodeBlock className={props.className}>{textContent}</CodeBlock>;
  },
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
    const url = `https://harryyu.dev/blog/${params.slug}`;
    
    return {
      title: post.title,
      description: post.description,
      authors: [{ name: post.author, url: 'https://harryyu.dev/about' }],
      keywords: post.tags,
      openGraph: {
        type: 'article',
        url: url,
        title: post.title,
        description: post.description,
        publishedTime: post.date,
        authors: [post.author],
        tags: post.tags,
        images: [
          {
            url: '/images/og-image.jpg',
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.description,
        images: ['/images/og-image.jpg'],
        creator: '@harryyu',
      },
      alternates: {
        canonical: url,
      },
    };
  } catch {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
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
    <>
      <BlogPostStructuredData
        title={post.title}
        description={post.description}
        author={post.author}
        publishedDate={post.date}
        url={`https://harryyu.dev/blog/${post.slug}`}
        tags={post.tags}
        readingTime={post.readingTime}
      />
      <ReadingProgress />
      <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-8">
        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
          <time>{post.date}</time>
          <span>{post.readingTime} min read</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-cream mb-6 leading-tight tracking-tight">{post.title}</h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">{post.description}</p>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full hover:bg-blue-200 hover:scale-105 transition-all duration-200 cursor-pointer">
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
      
      <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <p className="text-gray-600 dark:text-gray-300">
          Written by <span className="font-medium text-gray-900 dark:text-cream">{post.author}</span>
        </p>
      </footer>
    </article>
    </>
  );
}