import { Link } from "react-router-dom";
import { Home, FileText, User, BookOpen, Landmark } from 'lucide-react'
import { useSelector } from "react-redux";
const Sidebar = () => {
  const userInfo = useSelector(state => state.user)

  return (
    <>
      {/* Sidebar */}
      <aside className="w-64 bg-[#ffffff] text-[#000000] p-6 space-y-6 flex flex-col border-r">
        {/* Logo */}
        <div className="text-2xl font-bold mb-6 flex items-center justify-center gap-3"> <BookOpen />DocVault</div>

        {/* Navigation */}
        <nav className="flex-grow">
          <ul className="space-y-2">
            <li>
              <Link to="/" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-[#000000] hover:text-white transition-colors">
                <Home size={20} />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/documents" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-[#000000] hover:text-white transition-colors">
                <FileText size={20} />
                <span>Documents</span>
              </Link>
            </li>
            <li>
              <Link to="/banks" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-[#000000] hover:text-white transition-colors">
                <Landmark size={20} />
                <span>Banks</span>
              </Link>
            </li>
            {/* <li>
              <Link to="/settings" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-[#000000] hover:text-white transition-colors">
                <Settings size={20} />
                <span>Settings</span>
              </Link>
            </li> */}
          </ul>
        </nav>

        {/* User Profile */}
        <div className="flex items-center space-x-2 p-2 rounded-lg bg-[#000000] text-white">
          <User size={20} />
          {userInfo.isLoggedIn ? (
            <Link to="/profile">
            <span>{userInfo.userInfo.name}</span>
            </Link>
          ):(
            <Link to="/login">Login</Link>
          )}
        </div>
      </aside>
    </>

  );
};

export default Sidebar;
