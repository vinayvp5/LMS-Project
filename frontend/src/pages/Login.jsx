import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios'; // ✅ FIXED (use axios instance)

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // ✅ FIXED (removed localhost)
      const res = await api.post('/auth/login', {
        email,
        password,
      });

      // Save auth data
      login(res.data.user, res.data.token);

      alert('Login Successful!');

      // ROLE-BASED REDIRECT
      if (res.data.user.role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/home', { replace: true });
      }

    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-10 text-center">
          <h1 className="text-4xl font-bold mb-2">Welcome Back</h1>
          <p className="text-blue-100">Sign in to continue to your LMS</p>
        </div>

        <div className="p-10">
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-4 rounded-2xl text-lg transition"
            >
              {loading ? 'Signing in...' : 'Login'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <span
                onClick={() => navigate('/register')}
                className="text-blue-600 font-medium hover:underline cursor-pointer"
              >
                Sign up here
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;