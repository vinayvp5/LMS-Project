import React, { useState, useEffect } from 'react';
import api from '../api/axios'; // ✅ FIXED
import { useAuth } from '../context/AuthContext';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const { user } = useAuth();

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await api.get('/courses', { // ✅ FIXED
        params: { search, category }
      });
      setCourses(res.data);
    } catch (err) {
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [search, category]);

  const handleEnroll = async (courseId) => {
    try {
      await api.post(`/enrollments/${courseId}`); // ✅ FIXED
      alert('✅ Successfully enrolled in the course!');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to enroll. You may already be enrolled.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
          <h1 className="text-4xl font-bold text-gray-900">All Courses</h1>

          <div className="flex gap-4 mt-6 md:mt-0">
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-80"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Programming">Programming</option>
              <option value="Database">Database</option>
              <option value="Development">Development</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading courses...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="h-52 bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                  <span className="text-white text-xl font-medium">Course Image</span>
                </div>

                <div className="p-6">
                  <div className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-4 py-1.5 rounded-full mb-4">
                    {course.category}
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                    {course.title}
                  </h3>

                  <p className="text-gray-600 text-sm line-clamp-3 mb-8">
                    {course.description}
                  </p>

                  <button
                    onClick={() => handleEnroll(course._id)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3.5 rounded-2xl transition"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {courses.length === 0 && !loading && (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-500">No courses found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;