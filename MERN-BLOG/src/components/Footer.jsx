import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble, BsLinkedin } from 'react-icons/bs';

export default function FooterCom() {
  return (
    <Footer container className="bg-gray-100 dark:bg-gray-900 py-8"> {/* Removed border-t-8 border-teal-500 */}
      <div className="w-full max-w-7xl mx-auto px-6">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
          {/* Brand Logo */}
          <div className="mb-6 md:mb-0">
            <Link to="/" className="text-xl sm:text-2xl font-semibold dark:text-white flex items-center">
              <span className="px-3 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                TECH-Blog
              </span>
            </Link>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <Footer.Title title="About" className="dark:text-white" />
              <Footer.LinkGroup col>
                <Footer.Link href="/projects" target="_blank" rel="noopener noreferrer">
                  PROJECTS
                </Footer.Link>
                <Footer.Link href="/about">TECH-Blog</Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title="Follow Us" className="dark:text-white" />
              <Footer.LinkGroup col>
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  Github
                </Footer.Link>
                <Footer.Link href="#">Discord</Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title="Legal" className="dark:text-white" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>

        {/* Divider */}
        <Footer.Divider className="my-6 border-gray-300 dark:border-gray-700" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <Footer.Copyright
            href="#"
            by="TECH-Blog"
            year={new Date().getFullYear()}
            className="text-gray-600 dark:text-gray-400"
          />

          {/* Social Media Icons */}
          <div className="flex gap-6 mt-4 sm:mt-0">
            <a href="#" className="icon-hover">
              <BsFacebook />
            </a>
            <a href="#" className="icon-hover">
              <BsLinkedin/>
            </a>
            <a href="#" className="icon-hover">
              <BsTwitter />
            </a>
            <a href="#" className="icon-hover github-icon">
              <BsGithub />
            </a>
            
          </div>
        </div>
      </div>

      {/* Custom Styles for Hover Effects */}
      <style>
        {`
          .icon-hover {
            font-size: 24px;
            color: gray;
            transition: color 0.3s ease-in-out;
          }
          .icon-hover:hover {
            color: inherit;
          }
          .icon-hover:hover svg {
            fill: currentColor;
          }
          .icon-hover:nth-child(1):hover { color: #1877F2; } /* Facebook */
          .icon-hover:nth-child(2):hover { color: #E4405F; } /* Instagram */
          .icon-hover:nth-child(3):hover { color: #1DA1F2; } /* Twitter */
          .icon-hover:nth-child(4):hover { color: #171515; } /* GitHub Default */
          .icon-hover:nth-child(5):hover { color: #EA4C89; } /* Dribbble */

          /* Fix GitHub Icon Visibility in Dark Mode */
          .dark .github-icon:hover {
            color: white;
          }
        `}
      </style>
    </Footer>
  );
}
