export const metadata = {
  title: 'About - Harry Yu',
  description: 'Learn more about Harry Yu - Software Developer, Blogger, and Technology Enthusiast',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="prose prose-lg max-w-none">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About Me</h1>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-2">
            <p className="text-xl text-gray-600 mb-6">
              Hi there! I'm Harry Yu, a passionate software developer with a love for creating 
              meaningful digital experiences. Welcome to my corner of the internet where I share 
              my journey in technology, lessons learned, and insights gained along the way.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">My Journey</h2>
            <p className="text-gray-700 mb-4">
              My path into software development started during university when I took my first 
              programming course. What began as a requirement quickly became a passion. I was 
              fascinated by the ability to build something from nothing, to solve real problems 
              with code, and to continuously learn and grow in this ever-evolving field.
            </p>
            
            <p className="text-gray-700 mb-6">
              Since then, I've worked on various projects ranging from small personal websites to 
              complex full-stack applications. Each project has taught me something new and reinforced 
              my belief that the best way to learn programming is by building things.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What I Do</h2>
            <p className="text-gray-700 mb-4">
              I specialize in full-stack web development with a focus on modern JavaScript technologies. 
              My current tech stack includes:
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Frontend</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>React & Next.js</li>
                  <li>TypeScript</li>
                  <li>Tailwind CSS</li>
                  <li>React Query</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Backend</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>Node.js & Express</li>
                  <li>Python & FastAPI</li>
                  <li>PostgreSQL</li>
                  <li>REST APIs</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Quick Facts</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>📍 Based in San Francisco, CA</li>
                <li>🎓 Computer Science Background</li>
                <li>☕ Coffee enthusiast</li>
                <li>🎮 Gamer in spare time</li>
                <li>📚 Always learning something new</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Currently</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>🔨 Building TaskFlow (project management app)</li>
                <li>📖 Learning Go programming language</li>
                <li>✍️ Writing about web development</li>
                <li>🎯 Exploring machine learning</li>
              </ul>
            </div>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Why I Blog</h2>
        <p className="text-gray-700 mb-4">
          Writing has become an integral part of my learning process. When I write about 
          a concept or technology, I'm forced to understand it deeply enough to explain 
          it to others. This blog serves multiple purposes:
        </p>
        
        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
          <li>Document my learning journey and share insights</li>
          <li>Connect with other developers and learn from their experiences</li>
          <li>Contribute back to the developer community that has helped me so much</li>
          <li>Practice technical writing and communication skills</li>
        </ul>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Beyond Coding</h2>
        <p className="text-gray-700 mb-4">
          When I'm not coding, you can find me:
        </p>
        
        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
          <li>Exploring San Francisco's food scene</li>
          <li>Playing video games (currently obsessed with indie puzzle games)</li>
          <li>Reading sci-fi novels and tech blogs</li>
          <li>Experimenting with photography</li>
          <li>Hiking in the Bay Area mountains</li>
        </ul>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Let's Connect</h2>
        <p className="text-gray-700 mb-6">
          I'm always excited to connect with fellow developers, share experiences, and learn 
          from each other. Whether you want to discuss a blog post, share your own projects, 
          or just chat about technology, feel free to reach out!
        </p>
        
        <div className="flex flex-wrap gap-4">
          <a 
            href="https://github.com/harryyu" 
            className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            GitHub
          </a>
          <a 
            href="https://linkedin.com/in/harryyu" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            LinkedIn
          </a>
          <a 
            href="mailto:harry@example.com" 
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-gray-400 hover:text-gray-900 transition-colors"
          >
            Email Me
          </a>
        </div>
      </div>
    </div>
  );
}