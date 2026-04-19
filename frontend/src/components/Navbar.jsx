import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        <div className="flex items-center gap-10">
          <Link to="/" className="text-3xl font-bold">LMS</Link>
          
          <div className="flex gap-8 text-sm font-medium">
            <Link to="/home" className="hover:text-blue-200 transition">Home</Link>
            <Link to="/courses" className="hover:text-blue-200 transition">Browse Courses</Link>

            {/* Show only for Students */}
            {user?.role === 'user' && (
              <Link to="/my-courses" className="hover:text-blue-200 transition">My Learning</Link>
            )}

            {/* Show only for Admin */}
            {user?.role === 'admin' && (
              <Link to="/admin" className="hover:text-blue-200 transition font-semibold">Admin Dashboard</Link>
            )}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-sm">
            Hello, <span className="font-semibold">{user?.name}</span>
            <span className="ml-1 text-blue-200">
              ({user?.role === 'admin' ? 'Admin' : 'Student'})
            </span>
          </div>
          
          <button
            onClick={handleLogout}
            className="bg-white text-blue-600 px-6 py-2 rounded-2xl font-medium hover:bg-gray-100 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;