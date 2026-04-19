const Course = require('../models/Course');

const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    console.log(`=== GET ALL COURSES === Found ${courses.length} courses`);
    console.log(courses);   // This will print full data in terminal
    res.json(courses);
  } catch (err) {
    console.error('Error in getCourses:', err);
    res.status(500).json({ message: err.message });
  }
};

const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createCourse = async (req, res) => {
  try {
    const course = await Course.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      createdBy: req.user._id
    });
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateCourse = async (req, res) => {
 try {
    const course = await Course.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }   // This returns the updated document
    );
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    console.log(`[UPDATE COURSE] Success - ID: ${req.params.id}`);
    res.json(course);
  } catch (err) {
    console.error('[UPDATE COURSE] Error:', err.message);
    res.status(500).json({ message: err.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json({ message: 'Course deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getCourses, getCourseById, createCourse, updateCourse, deleteCourse };