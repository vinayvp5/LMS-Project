import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import api from '../api/axios'; // ✅ changed

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', category: '' });

  const [showEnrollments, setShowEnrollments] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [enrollmentsLoading, setEnrollmentsLoading] = useState(false);

  const fetchCourses = async () => {
    try {
      const res = await api.get('/courses'); // ✅ changed
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
        await api.put(`/courses/${editingCourse._id}`, formData); // ✅ changed
        alert('Course updated successfully!');
      } else {
        await api.post('/courses', formData); // ✅ changed
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
      await api.delete(`/courses/${id}`); // ✅ changed
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
      const res = await api.get(`/enrollments/admin/course/${course._id}`); // ✅ changed
      setEnrollments(res.data || []);
    } catch (err) {
      console.error(err);
      alert('Failed to load enrollments for this course.');
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
                    className="w-full px-5 py-4 border border-gray-300 rounded-2xl" 
                    required 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <input 
                    type="text" 
                    value={formData.category} 
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })} 
                    className="w-full px-5 py-4 border border-gray-300 rounded-2xl" 
                    required 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea 
                    value={formData.description} 
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
                    rows="4" 
                    className="w-full px-5 py-4 border border-gray-300 rounded-2xl" 
                    required 
                  />
                </div>

                <button className="w-full bg-blue-600 text-white py-4 rounded-2xl">
                  {editingCourse ? 'Update Course' : 'Create Course'}
                </button>
              </form>
            </div>
          )}

          <h2 className="text-2xl font-semibold mb-6">All Courses ({courses.length})</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div key={course._id} className="bg-white rounded-3xl shadow-md p-6">
                <h3 className="text-xl font-semibold mb-3">{course.title}</h3>

                <div className="flex gap-3">
                  <button onClick={() => handleShowEnrollments(course)}>Enrollments</button>
                  <button onClick={() => handleEdit(course)}>Edit</button>
                  <button onClick={() => handleDelete(course._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
};

export default AdminDashboard;