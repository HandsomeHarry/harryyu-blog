import Link from 'next/link';
import { getAllBlogPosts } from '@/lib/blog';

export const metadata = {
  title: 'Blog - Harry Yu',
  description: 'Articles about web development, technology, and software engineering',
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-cream mb-6 leading-tight tracking-tight">Blog</h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
          Thoughts on web development, technology, and building great software.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-300 text-lg">No blog posts yet. Check back soon!</p>
        </div>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="border-b border-gray-200 dark:border-gray-700 pb-8 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-800 hover:-translate-y-1 transition-all duration-300 p-4 rounded-lg cursor-pointer group">
              <div className="flex justify-between items-start mb-2">
                <time className="text-sm text-gray-500 dark:text-gray-400">{post.date}</time>
                <span className="text-sm text-gray-500 dark:text-gray-400">{post.readingTime} min read</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-cream mb-4 leading-tight">
                <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-lg">{post.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span key={tag} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full hover:bg-blue-200 hover:scale-105 transition-all duration-200 cursor-pointer">
                    {tag}
                  </span>
                ))}
              </div>
              <Link 
                href={`/blog/${post.slug}`}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}