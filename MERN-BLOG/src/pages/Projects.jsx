import CallToAction from '../components/CallToAction';

export default function Projects() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-3xl w-full bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 text-center border dark:border-gray-700">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">My Projects</h1>
        
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
          Here, you'll find a collection of projects I've worked on—ranging from 
          <strong> web development</strong> to <strong>AI-powered applications</strong>. 
          Each project reflects my journey of learning, experimenting, and building innovative solutions.
        </p>

        <div className="text-lg text-gray-700 dark:text-gray-400 space-y-4 mb-6">
          <p>
            💡 <strong>Technologies Used:</strong> MERN Stack, Next.js, Prisma, AI/ML, and more.
          </p>
          <p>Feel free to explore my work, and let me know your thoughts!</p>
        </div>

        {/* Call to Action Component */}
        <CallToAction />
      </div>
    </div>
  );
}
