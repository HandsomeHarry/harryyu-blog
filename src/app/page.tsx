import Link from 'next/link';
import { getRecentBlogPosts } from '@/lib/blog';

export default function HomePage() {
  const recentPosts = getRecentBlogPosts(3);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
          Hi, I'm <span className="text-blue-600">Harry Yu</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          A passionate software developer creating meaningful digital experiences. 
          I write about web development, technology, and the journey of building great software.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/blog" 
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Read My Blog
          </Link>
          <Link 
            href="/about" 
            className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:border-gray-400 hover:text-gray-900 transition-colors font-medium"
          >
            About Me
          </Link>
        </div>
      </section>

      {/* Skills Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What I Work With</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            'JavaScript', 'TypeScript', 'React', 'Next.js',
            'Node.js', 'Python', 'Git', 'AWS'
          ].map((skill) => (
            <div key={skill} className="bg-gray-50 rounded-lg p-4 text-center">
              <span className="font-medium text-gray-800">{skill}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Blog Posts */}
      {recentPosts.length > 0 && (
        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Recent Posts</h2>
            <Link href="/blog" className="text-blue-600 hover:text-blue-700 font-medium">
              View all posts →
            </Link>
          </div>
          <div className="grid gap-8">
            {recentPosts.map((post) => (
              <article key={post.slug} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <time className="text-sm text-gray-500">{post.date}</time>
                  <span className="text-sm text-gray-500">{post.readingTime} min read</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4">{post.description}</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}