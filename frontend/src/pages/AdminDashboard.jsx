import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import api from '../api/axios';

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', category: '' });

  // Modal states
  const [showEnrollments, setShowEnrollments] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [enrollmentsLoading, setEnrollmentsLoading] = useState(false);

  const fetchCourses = async () => {
    try {
      const res = await api.get('/courses');
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCourse) {
        await api.put(`/courses/${editingCourse._id}`, formData);
        alert('Course updated successfully!');
      } else {
        await api.post('/courses', formData);
        alert('Course created successfully!');
      }
      setShowForm(false);
      setEditingCourse(null);
      setFormData({ title: '', description: '', category: '' });
      fetchCourses();
    } catch (err) {
      alert(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData({ 
      title: course.title, 
      description: course.description, 
      category: course.category 
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this course?')) return;
    try {
      await api.delete(`/courses/${id}`);
      alert('Course deleted successfully!');
      fetchCourses();
    } catch (err) {
      alert('Failed to delete course');
    }
  };

  const handleShowEnrollments = async (course) => {
    setSelectedCourse(course);
    setShowEnrollments(true);
    setEnrollmentsLoading(true);
    setEnrollments([]);

    try {
      const res = await api.get(`/enrollments/admin/course/${course._id}`);
      setEnrollments(res.data || []);
    } catch (err) {
      console.error(err);
      alert('Failed to load enrollments for this course. Please try again.');
      setEnrollments([]);
    } finally {
      setEnrollmentsLoading(false);
    }
  };

  if (loading) return <div className="text-center py-20">Loading admin dashboard...</div>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-2">Manage all courses • Total: {courses.length}</p>
            </div>
            <button
              onClick={() => {
                setEditingCourse(null);
                setFormData({ title: '', description: '', category: '' });
                setShowForm(!showForm);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl font-medium transition"
            >
              {showForm ? 'Cancel' : '+ Create New Course'}
            </button>
          </div>

          {/* Create/Edit Form */}
          {showForm && (
            <div className="bg-white rounded-3xl shadow-xl p-8 mb-12">
              <h2 className="text-2xl font-semibold mb-6">
                {editingCourse ? 'Edit Course' : 'Create New Course'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Course Title</label>
                  <input 
                    type="text" 
                    value={formData.title} 
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
                    className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <input 
                    type="text" 
                    value={formData.category} 
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })} 
                    className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    placeholder="e.g. Computer Science" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea 
                    value={formData.description} 
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
                    rows="4" 
                    className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    required 
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 rounded-2xl transition"
                >
                  {editingCourse ? 'Update Course' : 'Create Course'}
                </button>
              </form>
            </div>
          )}

          {/* Courses List */}
          <h2 className="text-2xl font-semibold mb-6">All Courses ({courses.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div key={course._id} className="bg-white rounded-3xl shadow-md p-6 hover:shadow-xl transition">
                <div className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-4 py-1 rounded-full mb-4">
                  {course.category}
                </div>
                <h3 className="text-xl font-semibold mb-3">{course.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-8">{course.description}</p>

                <div className="flex gap-3">
                  <button 
                    onClick={() => handleShowEnrollments(course)} 
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-2xl font-medium transition"
                  >
                    Enrollments
                  </button>
                  <button 
                    onClick={() => handleEdit(course)} 
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-2xl font-medium transition"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(course._id)} 
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl font-medium transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enrollments Modal */}
      {showEnrollments && selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-8 border-b flex justify-between items-center bg-gray-50">
              <div>
                <h2 className="text-2xl font-semibold">Enrollments</h2>
                <p className="text-gray-600 mt-1">{selectedCourse.title}</p>
              </div>
              <button 
                onClick={() => setShowEnrollments(false)} 
                className="text-3xl text-gray-400 hover:text-gray-600 leading-none"
              >
                ×
              </button>
            </div>

            <div className="p-8 overflow-auto max-h-[60vh]">
              {enrollmentsLoading ? (
                <p className="text-center py-16 text-gray-500">Loading enrollments...</p>
              ) : enrollments.length === 0 ? (
                <p className="text-center py-16 text-gray-500">No students have enrolled in this course yet.</p>
              ) : (
                <>
                  <p className="font-medium text-lg mb-6">
                    Total Enrolled: <span className="text-green-600 font-bold">{enrollments.length}</span>
                  </p>
                  <div className="space-y-4">
                    {enrollments.map((enroll) => (
                      <div key={enroll._id} className="border border-gray-200 rounded-2xl p-5 bg-gray-50 flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-900">
                            {enroll.userId?.name || 'Unknown Student'}
                          </p>
                          <p className="text-sm text-gray-500">
                            {enroll.userId?.email || 'No email available'}
                          </p>
                        </div>
                        <div className="text-right text-sm text-gray-500">
                          Enrolled on<br />
                          <span className="font-medium text-gray-700">
                            {new Date(enroll.enrolledAt).toLocaleDateString('en-IN')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="p-6 border-t bg-gray-50 text-right">
              <button 
                onClick={() => setShowEnrollments(false)} 
                className="px-8 py-3 bg-gray-200 hover:bg-gray-300 rounded-2xl font-medium transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboard;