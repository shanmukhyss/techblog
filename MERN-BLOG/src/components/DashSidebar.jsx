import { useState, useEffect } from 'react';
import { HiMenu, HiX, HiUser, HiArrowSmRight, HiDocumentText, HiOutlineUserGroup, HiAnnotation, HiChartPie } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';

export default function DashSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) setTab(tabFromUrl);
  }, [location.search]);

  const handleSignout = async () => {
    if (!window.confirm("Are you sure you want to sign out?")) return;

    try {
      const res = await fetch('/api/user/signout', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message);
      } else {
        dispatch(signoutSuccess());
        alert('Signed out successfully!');
      }
    } catch (error) {
      alert('Something went wrong!');
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        className="p-3 text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-800 fixed top-4 left-4 z-50 rounded-lg md:hidden" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-5 w-64 transition-transform md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-64'} md:relative md:flex md:w-64 shadow-lg`}
      >
        <nav className="flex flex-col gap-4">
          {currentUser?.isAdmin && (
            <Link to="/dashboard?tab=dash" className={`flex items-center gap-2 p-2 rounded-lg ${tab === 'dash' ? 'bg-gray-200 dark:bg-gray-800' : 'hover:bg-gray-200 dark:hover:bg-gray-800'}`}>
              <HiChartPie size={20} />
              Dashboard
            </Link>
          )}
          <Link to="/dashboard?tab=profile" className={`flex items-center gap-2 p-2 rounded-lg ${tab === 'profile' ? 'bg-gray-200 dark:bg-gray-800' : 'hover:bg-gray-200 dark:hover:bg-gray-800'}`}>
            <HiUser size={20} />
            {currentUser?.isAdmin ? 'Admin' : 'User'} Profile
          </Link>

          {currentUser?.isAdmin && (
            <>
              <Link to="/dashboard?tab=posts" className={`flex items-center gap-2 p-2 rounded-lg ${tab === 'posts' ? 'bg-gray-200 dark:bg-gray-800' : 'hover:bg-gray-200 dark:hover:bg-gray-800'}`}>
                <HiDocumentText size={20} />
                Posts
              </Link>
              <Link to="/dashboard?tab=users" className={`flex items-center gap-2 p-2 rounded-lg ${tab === 'users' ? 'bg-gray-200 dark:bg-gray-800' : 'hover:bg-gray-200 dark:hover:bg-gray-800'}`}>
                <HiOutlineUserGroup size={20} />
                Users
              </Link>
              <Link to="/dashboard?tab=comments" className={`flex items-center gap-2 p-2 rounded-lg ${tab === 'comments' ? 'bg-gray-200 dark:bg-gray-800' : 'hover:bg-gray-200 dark:hover:bg-gray-800'}`}>
                <HiAnnotation size={20} />
                Comments
              </Link>
            </>
          )}

          <button onClick={handleSignout} className="flex items-center gap-2 p-2 rounded-lg text-red-500 hover:bg-red-100 dark:hover:bg-red-800">
            <HiArrowSmRight size={20} />
            Sign Out
          </button>
        </nav>
      </div>

      
    </>
  );
}
