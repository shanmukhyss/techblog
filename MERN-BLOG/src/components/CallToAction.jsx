export default function CallToAction() {
    const projectLinks = [
      { 
        href: 'https://codecraft-lake.vercel.app/', 
        text: 'A Compiler which can be run in multiple languages' 
      },
      { 
        href: 'https://sensai-gamma.vercel.app/', 
        text: 'AI Career Coach for Personalized Guidance' 
      },
      { 
        href: 'https://welth-lake.vercel.app/', 
        text: 'AI Finance Platform' 
      }
    ];
  
    return (
      <div className='flex flex-col sm:flex-row p-6 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center bg-white dark:bg-black text-black dark:text-white'>
        <div className="flex-1 justify-center flex flex-col space-y-3">
          <h2 className='text-3xl font-semibold'>
            Want to explore my other projects
          </h2>
          <p className='text-gray-600 dark:text-gray-400'>
            Checkout these links
          </p>
          <ul className="space-y-2 text-left">
            {projectLinks.map((project, index) => (
              <li key={index} className='hover:text-teal-500 dark:hover:text-teal-400 transition duration-300'>
                <a href={project.href} target='_blank' rel='noopener noreferrer'>
                  {project.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-7 flex-1">
          <img 
            src="myprojects.webp" 
            alt="" 
            className='rounded-lg shadow-md'
          />
        </div>
      </div>
    );
  }
  