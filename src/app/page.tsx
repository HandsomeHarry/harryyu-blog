import Link from 'next/link';
import { getRecentBlogPosts } from '@/lib/blog';
import { FadeIn } from '@/components/ScrollAnimations';
import { WebsiteStructuredData, PersonStructuredData } from '@/components/StructuredData';

export default function HomePage() {
  const recentPosts = getRecentBlogPosts(3);

  return (
    <>
      <WebsiteStructuredData
        name="Harry Yu - Personal Blog"
        description="Personal blog and portfolio of Harry Yu - Software Developer"
        url="https://harryyu.dev"
        author="Harry Yu"
      />
      <PersonStructuredData />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 dark:text-cream mb-8 leading-tight tracking-tight">
          Hi, I'm <span className="text-blue-600">Harry Yu</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
          A passionate software developer creating meaningful digital experiences. 
          I write about web development, technology, and the journey of building great software.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/blog" 
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 hover:-translate-y-1 hover:shadow-lg transition-all duration-200 font-medium"
          >
            Read My Blog
          </Link>
          <Link 
            href="/about" 
            className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-lg hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 hover:-translate-y-1 hover:shadow-lg transition-all duration-200 font-medium"
          >
            About Me
          </Link>
        </div>
      </section>

      {/* Skills Section */}
      <FadeIn delay={200}>
        <section className="mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-cream mb-10 text-center leading-tight">What I Work With</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            'JavaScript', 'TypeScript', 'React', 'Next.js',
            'Node.js', 'Python', 'Git', 'AWS'
          ].map((skill) => (
            <div key={skill} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center hover:bg-blue-50 dark:hover:bg-gray-700 hover:-translate-y-1 hover:shadow-md transition-all duration-200 cursor-pointer">
              <span className="font-medium text-gray-800 dark:text-gray-200">{skill}</span>
            </div>
          ))}
        </div>
        </section>
      </FadeIn>

      {/* Recent Blog Posts */}
      {recentPosts.length > 0 && (
        <FadeIn delay={400}>
          <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-cream leading-tight">Recent Posts</h2>
            <Link href="/blog" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
              View all posts →
            </Link>
          </div>
          <div className="grid gap-8">
            {recentPosts.map((post) => (
              <article key={post.slug} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group bg-cream dark:bg-gray-800">
                <div className="flex justify-between items-start mb-2">
                  <time className="text-sm text-gray-500 dark:text-gray-400">{post.date}</time>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{post.readingTime} min read</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-cream mb-2">
                  <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{post.description}</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded hover:bg-blue-200 hover:scale-105 transition-all duration-200 cursor-pointer">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
          </section>
        </FadeIn>
      )}
      </div>
    </>
  );
}