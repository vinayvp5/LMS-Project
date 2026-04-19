const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

// Enroll in a course - ONLY STUDENTS (role === "user")
const enrollCourse = async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user._id;

  try {
    // STRICT CHECK: Only allow students, block admins
    if (req.user.role !== 'user') {
      return res.status(403).json({ 
        message: 'Only students can enroll in courses. Admins are not allowed to enroll.' 
      });
    }

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if already enrolled
    const existing = await Enrollment.findOne({ userId, courseId });
    if (existing) {
      return res.status(400).json({ message: 'You are already enrolled in this course' });
    }

    // Create enrollment
    const enrollment = await Enrollment.create({ 
      userId, 
      courseId 
    });

    console.log(`[ENROLL] SUCCESS - Student ${userId} enrolled in course ${courseId}`);

    res.status(201).json({
      message: 'Successfully enrolled in the course',
      enrollment
    });
  } catch (err) {
    console.error('[ENROLL] Error:', err.message);
    res.status(500).json({ message: err.message });
  }
};

// Get my enrolled courses
const getMyCourses = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ userId: req.user._id })
      .populate('courseId', 'title description category');   // This brings course details

    console.log(`[MY COURSES] Found ${enrollments.length} courses for user ${req.user._id}`);

    res.json(enrollments);
  } catch (err) {
    console.error('[MY COURSES] Error:', err.message);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { enrollCourse, getMyCourses };