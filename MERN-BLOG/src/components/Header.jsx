import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';
import { useEffect, useState } from 'react';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <Navbar className="border-b shadow-md py-2 px-4 bg-white dark:bg-gray-900 relative flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
        <span className="px-3 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white text-xl">
          TECH-Blog
        </span>
      </Link>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-gray-800 dark:text-gray-200 focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
      </button>

      {/* Search Bar */}
      <form onSubmit={handleSubmit} className="relative flex-grow max-w-xs hidden md:flex">
        <TextInput
          type="text"
          placeholder="Search..."
          className="rounded-lg w-full px-4 py-2 border dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 shadow-sm pr-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300 hover:text-indigo-500"
        >
          <AiOutlineSearch size={22} />
        </button>
      </form>

      {/* Navigation Links - Visible on Medium & Larger Screens */}
      <div className="hidden md:flex items-center gap-6">
        <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-indigo-500 font-medium">Home</Link>
        <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-indigo-500 font-medium">About</Link>
        <Link to="/projects" className="text-gray-700 dark:text-gray-300 hover:text-indigo-500 font-medium">Projects</Link>
      </div>

      {/* Mobile Dropdown Menu - Only visible when menu is open */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-900 p-4 flex flex-col items-center shadow-md md:hidden z-50">
          <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-indigo-500 font-medium" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-indigo-500 font-medium" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/projects" className="text-gray-700 dark:text-gray-300 hover:text-indigo-500 font-medium" onClick={() => setMenuOpen(false)}>Projects</Link>
        </div>
      )}

      {/* Theme Toggle & User Authentication */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle - Increased Size & Hover Effect */}
        <Button
          className="w-12 h-12 flex items-center justify-center bg-gray-200 dark:bg-gray-800 rounded-full shadow-md hover:scale-105 transition-all duration-300"
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === 'light' ? <FaSun className="text-yellow-500 text-2xl" /> : <FaMoon className="text-blue-500 text-2xl" />}
        </Button>

        {/* User Profile / Sign-In */}
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt="user" img={currentUser.profilePicture} rounded className="cursor-pointer" />}
          >
            <Dropdown.Header>
              <span className="block text-sm font-medium text-gray-900 dark:text-white">@{currentUser.username}</span>
              <span className="block text-sm text-gray-500 dark:text-gray-400 truncate">{currentUser.email}</span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-5 py-3 rounded-lg shadow-md hover:from-pink-600 hover:to-purple-600 hover:scale-105 transition-all duration-300">
              Sign In
            </Button>
          </Link>
        )}
      </div>
    </Navbar>
  );
}
