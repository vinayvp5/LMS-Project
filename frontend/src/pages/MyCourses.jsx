import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';

const MyCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/enrollments/my-courses', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setEnrolledCourses(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyCourses();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-10">My Learning</h1>

          {loading ? (
            <div className="text-center py-20">Loading your courses...</div>
          ) : enrolledCourses.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl text-gray-500">You haven't enrolled in any courses yet</p>
              <a href="/courses" className="mt-6 inline-block bg-blue-600 text-white px-8 py-3 rounded-2xl">Browse Courses</a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {enrolledCourses.map((enrollment) => (
                <div key={enrollment._id} className="bg-white rounded-3xl shadow-md overflow-hidden">
                  <div className="h-52 bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
                    <span className="text-white text-xl">Course Image</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{enrollment.courseId?.title}</h3>
                    <p className="text-gray-600 text-sm mb-6">{enrollment.courseId?.description}</p>
                    <div className="text-xs text-green-600 font-medium">Enrolled on: {new Date(enrollment.enrolledAt).toLocaleDateString()}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyCourses;