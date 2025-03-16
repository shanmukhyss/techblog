export default function About() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="max-w-3xl w-full p-8 text-center bg-white dark:bg-gray-800 shadow-xl rounded-2xl border dark:border-gray-700">
        {/* Profile Image */}
        <img 
          src="https://via.placeholder.com/150" 
          alt=""
          className="w-32 h-32 mx-auto rounded-full shadow-md mb-6 border-4 border-blue-500 dark:border-blue-400"
        />

        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">About</h1>
        
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Hi, I’m <strong>Shanmukh</strong>, an undergraduate student at 
          <strong> IIT BHU</strong>, pursuing <strong>Electronics and Communication Engineering (ECE)</strong>.  
        </p>

        <div className="text-lg text-gray-700 dark:text-gray-400 leading-relaxed space-y-4">
          <p>
            This blog is a personal project where I explore web development and experiment with new technologies. 
            It serves as a space to document my journey, build exciting features, and improve my skills along the way.
          </p>
          <p>
            Feel free to <strong>leave comments, like, and reply</strong>—your thoughts and feedback are always welcome! 
            Let's learn and grow together.  
          </p>
        </div>

        <p className="mt-6 font-semibold text-gray-900 dark:text-gray-300 text-xl">Thanks for visiting</p>
      </div>
    </div>
  );
}
