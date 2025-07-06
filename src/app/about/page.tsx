export const metadata = {
  title: 'About - Harry Yu',
  description: 'Learn more about Harry Yu - Computer Science Student, Software Engineer, and Channel Operator',
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="prose prose-lg max-w-none">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-cream mb-10 leading-tight tracking-tight">About Me</h1>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-2">
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              Hi! I'm Harry Yu, a Computer Science student at Brandeis with ADHD who gets hyperfocused on way too many projects at once. Currently juggling a startup internship, running a translation operation, building AI systems, and somehow still finding time to 3D print random stuff.
            </p>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-cream mb-6 leading-tight">The ADHD Journey</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              My brain works in bursts of intense curiosity followed by "oh wait, what was I doing?" moments. 
              Computer Science at Brandeis (graduated!) has been perfect for this – there's always a new algorithm to obsess over, 
              a system to break and rebuild, or a completely unrelated tangent that somehow becomes my new favorite thing.
            </p>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              The beauty of ADHD in tech? When something clicks, I'll hyperfocus for 14 hours straight and emerge with a working prototype. 
              The challenge? Remembering to eat, sleep, and not start three new projects before finishing the first one. 
              (Spoiler: I usually start the three new projects anyway.)
            </p>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-cream mb-6 leading-tight">How I Channel ADHD at Work</h2>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-cream mb-2">Software Engineer Intern - REON Technology Inc.</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">June 2023 - 2024 | Chelmsford, MA</p>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                Perfect startup environment for ADHD brain! One day I'm deep in Docker containers, next I'm analyzing battery data, 
                then suddenly I'm doing woodwork because "software engineer" at a startup means "whatever needs fixing."
              </p>
              <ul className="text-gray-700 dark:text-gray-300 space-y-1 mb-4 text-sm">
                <li>Built Battery Management Systems</li>
                <li>Created bash scripts for data processing (automation = fewer manual tasks to forget)</li>
                <li>Raspberry Pi integration (hardware + software = dopamine hit)</li>
                <li>Made safety videos (learned video editing wasn't just for YouTube)</li>
              </ul>
              
              <h3 className="text-lg font-semibold text-gray-900 dark:text-cream mb-2">Channel Operator & Translator - Bilibili</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">November 2020 - Present | Online</p>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                What started as "I'll just ask this dude to translate this one video" became managing 7 people and 164 videos with 180M views. 
                Classic ADHD project scope creep, but hey, it worked out!
              </p>
              <ul className="text-gray-700 dark:text-gray-300 space-y-1 mb-4 text-sm">
                <li>Team management (learned to delegate before burnout)</li>
                <li>Business partnerships (turns out hyperfocus helps with negotiations)</li>
                <li>Built payroll automation (because manual spreadsheets are ADHD kryptonite)</li>
                <li>Cross-platform content strategy (4 platforms because why not complicate things?)</li>
              </ul>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-cream mb-6 leading-tight">Skills I've Hyperfocused On</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              My skill set is... eclectic. When ADHD brain finds something interesting, I dive deep. Sometimes too deep. 
              Like spending 3 days perfecting a bash script that saves 5 minutes of work.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-cream mb-2">Code & Logic</h3>
                <ul className="text-gray-700 dark:text-gray-300 space-y-1 text-sm">
                  <li>Java & Python (learned Python in a weekend hyperfocus)</li>
                  <li>Docker (containers are contained chaos)</li>
                  <li>Bash Scripting (automation better than repetitive tasks)</li>
                  <li>Product Design (UI/UX rabbit holes are dangerous)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-cream mb-2">Creative & Physical</h3>
                <ul className="text-gray-700 dark:text-gray-300 space-y-1 text-sm">
                  <li>3D Modeling (bingeing blenderguru videos)</li>
                  <li>Video Production (learned editing for DIY Perks, kept going)</li>
                  <li>3D Printing (satisfying instant gratification)</li>
                  <li>PC Building (like expensive LEGOs for nerds)</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-cream mb-3">Quick Facts</h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>📍 Based in <del>Waltham, MA</del> Beijing, China</li>
                <li>🎓 B.S. Computer Science, Brandeis University '25</li>
                <li>🗣️ Fluent in English & Mandarin</li>
                <li>🧠 ADHD-powered hyperfocus sessions</li>
                <li>📚 Learning 5 things at once, mastering 1.5</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-cream mb-3">Currently Juggling</h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>🎓 <del>Finishing CS degree</del> finally done with school!</li>
                <li>💼 <del>Software Engineering @ REON Technology</del></li>
                <li>🎬 Content operations @ Bilibili (almost 5 years now!)</li>
                <li>🏗️ President of PC Building Club (we actually build PCs with the funds)</li>
                <li>🤯 Pretending I have it all together</li>
              </ul>
            </div>
          </div>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-cream mb-6 leading-tight">Why I Blog (when i remember to)</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Writing forces me to actually understand what I built during my 3am hyperfocus sessions. 
          If I don't document it, I'll forget how it works in 2 weeks. ADHD memory is... very selective.
        </p>
        
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-6 space-y-1">
          <li>Document before I forget (future me will thank present me)</li>
          <li>Highly educational criticisms from netizens (at times)</li>
          <li>Share the chaos so others feel less alone in their project graveyards</li>
          <li>Practice explaining things without saying "it just works" 37 times</li>
        </ul>
        
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-cream mb-6 leading-tight">Current Chaos (aka "Active Projects")</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Welcome to my ADHD project graveyard and nursery! Some are thriving, others are "I'll get back to that soon" for 3+ months. 
          You can kind of see that in the blog dates, 2020, then 2023. At least I'm consistent on being inconsistent haha
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-lg border-l-4 border-blue-400">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-cream mb-3">🤖 AI Chat Platform</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Running my own LLMs (Qwen) at <a href="https://ai.harryyu.dev/" className="text-blue-600 hover:text-blue-800">ai.harryyu.dev</a> 
               because why pay OpenAI when you can pay electricity bills instead?
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">RTX 3090Ti humming in my room | LLM, Docker, DevOps</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 italic">Reality check: Spent more on power than I would've on API calls, but learned tons about LLM deployment!</p>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-lg border-l-4 border-green-400">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-cream mb-3">🏛️ 3D Cultural Heritage Scanning</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Photogrammetry project that started as "let's scan this statue" and became a deep dive into Indian history
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">dSLR photography, 3D modeling, cultural preservation</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 italic">Plot twist: Getting permission took longer than the actual scanning. Harvard Art Museums are thorough!</p>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-lg border-l-4 border-purple-400">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-cream mb-3">🎮 CS Robot Competition</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              2v2 real robot Counter-Strike because regular programming wasn't complicated enough
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Computer vision, pathfinding algorithms, multi-robot networking</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 italic">Current status: Robots can see each other, sometimes they even move. Victory conditions still negotiable.</p>
          </div>
          
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-lg border-l-4 border-yellow-400">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-cream mb-3">🤖 Discord Homelab Bot</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Because manually checking if servers are down is for people without ADHD and coding skills
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">API calls, webhooks, automation scripts</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 italic">Works great! Except when I forget to restart it after server updates. Ironic. Working on a script to automate that.</p>
          </div>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-cream mb-6 leading-tight">The Homelab Situation</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Started with "I'll just run a Minecraft server" and ended up with a full datacenter in my room. 
          The electricity bill is educational.
        </p>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 dark:text-cream mb-2">🏠 Main Server</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">Games, LLM models, web services, VPN</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Fan noise is the sound of productivity</p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 dark:text-cream mb-2">🌐 xhttp VPN</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">Deployed on Japanese VPS because reasons</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Docker containers across continents</p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 dark:text-cream mb-2">📁 NAS Server</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">File hoarding with style</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Automated because manual backups don't happen</p>
          </div>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-cream mb-6 leading-tight">Automation Adventures</h2>
        <ul className="space-y-3 mb-6">
          <li className="bg-blue-50 dark:bg-gray-800 p-3 rounded-lg">
            <strong className="text-gray-900 dark:text-cream">Subtitle Automation Pipeline:</strong> 
            <span className="text-gray-700 dark:text-gray-300"> LLM-powered video translation that downloads, processes, and translates automatically. </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 italic"> Works 80% of the time, breaks spectacularly the other 20%.</span>
          </li>
          <li className="bg-green-50 dark:bg-gray-800 p-3 rounded-lg">
            <strong className="text-gray-900 dark:text-cream">3D Printing Automation:</strong> 
            <span className="text-gray-700 dark:text-gray-300"> Bambulab A1 mini printer experiments in automated workflows.</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 italic"> they already almost perfected it.</span>
          </li>
          <li className="bg-purple-50 dark:bg-gray-800 p-3 rounded-lg">
            <strong className="text-gray-900 dark:text-cream">Personal Website:</strong> 
            <span className="text-gray-700 dark:text-gray-300"> Building <a href="https://www.harryyu.dev/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">harryyu.dev</a> with React, TypeScript, and Node.js. </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 italic">"Learning React and TypeScript, slowly rubbing" - past me was optimistic about timelines.</span>
          </li>
        </ul>
        
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-cream mb-6 leading-tight">Let's Connect!</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Always down to chat with fellow developers, especially those who understand the struggle of having 
          47 browser tabs open and 12 half-finished projects. Whether you want to discuss a blog post, 
          share your own ADHD project adventures, or just rant about why Docker containers are both amazing and terrible, 
          hit me up!
        </p>
        
        <div className="flex flex-wrap gap-4">
          <a 
            href="https://github.com/handsomeharry" 
            className="bg-gray-900 dark:bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
          >
            GitHub
          </a>
          <a 
            href="https://www.linkedin.com/in/shiyi-yu-b6a542208/"
            className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
          >
            LinkedIn
          </a>
          <a 
            href="mailto:harryyu2002@gmail.com" 
            className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
          >
            Email Me
          </a>
        </div>
      </div>
    </div>
  );
}