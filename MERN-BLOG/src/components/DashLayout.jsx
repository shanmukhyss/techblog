import DashSidebar from './DashSidebar';
import DashProfile from './DashProfile';

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="hidden md:flex w-56 h-screen sticky top-0">
        <DashSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <DashProfile />
      </div>
    </div>
  );
}
