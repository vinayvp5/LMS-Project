import React from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white py-28">
          <div className="max-w-5xl mx-auto text-center px-6">
            <h1 className="text-6xl font-bold tracking-tight mb-6">
              Welcome to Your LMS, {user?.name}
            </h1>
            <p className="text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Empower Your Education, Anytime, Anywhere.
            </p>
          </div>
        </div>

        {/* Main Content - Premium Product Showcase */}
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="bg-white rounded-3xl shadow-xl p-16">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-semibold text-gray-900 mb-6">
                Learning Management System
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our Learning Management System is designed to streamline online education and training. 
                Perfect for schools, businesses, and organizations, our LMS offers an intuitive platform 
                to manage courses, track progress, and engage learners with ease.
              </p>
            </div>

            {/* Features Grid - Clean & Professional like your 2nd image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-md transition">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 text-3xl">
                  📚
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Course Management</h3>
                <p className="text-gray-600 leading-relaxed">
                  Easily create and organize courses with rich content, assignments, and structured learning paths.
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-md transition">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 text-3xl">
                  📊
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">User-Friendly Dashboard</h3>
                <p className="text-gray-600 leading-relaxed">
                  Intuitive and easy to navigate interface designed for both students and administrators.
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-md transition">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 text-3xl">
                  📈
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Real-Time Progress Tracking</h3>
                <p className="text-gray-600 leading-relaxed">
                  Monitor learner performance with detailed analytics and progress reports.
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-md transition">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 text-3xl">
                  🔒
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Secure Authentication</h3>
                <p className="text-gray-600 leading-relaxed">
                  Safe and reliable access with JWT authentication for students and admins.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Simple Footer Message */}
        <div className="text-center py-12 text-gray-500 text-sm">
          Start your learning journey today • Built with MERN Stack
        </div>
      </div>
    </>
  );
};

export default Home;