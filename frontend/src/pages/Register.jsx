import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios'; // ✅ FIXED (use axios instance)

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'   // Fixed as student only
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // ✅ FIXED (removed localhost)
      await api.post('/auth/signup', formData);

      alert('Account created successfully! Please login.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-10 text-center">
          <h1 className="text-4xl font-bold mb-2">Create Account</h1>
          <p className="text-blue-100">Join as a Student</p>
        </div>

        <div className="p-10">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">I am a</label>
              <select
                name="role"
                value="user"
                disabled
                className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg bg-gray-100"
              >
                <option value="user">Student</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">Only Student registration is allowed</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                placeholder="Create a strong password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-4 rounded-2xl text-lg transition"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <span 
                onClick={() => navigate('/login')}
                className="text-blue-600 font-medium hover:underline cursor-pointer"
              >
                Login here
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;