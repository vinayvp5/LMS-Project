const express = require('express');
const { enrollCourse, getMyCourses } = require('../controllers/enrollmentController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const Enrollment = require('../models/Enrollment');   // Make sure this line exists

const router = express.Router();

/**
 * @swagger
 * /api/enrollments/{courseId}:
 *   post:
 *     summary: Enroll in a course (Students only)
 *     tags: [Enrollments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 */
router.post('/:courseId', protect, enrollCourse);

/**
 * @swagger
 * /api/enrollments/my-courses:
 *   get:
 *     summary: View enrolled courses of logged in user
 *     tags: [Enrollments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of your enrolled courses with full details
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id: { type: string }
 *                   courseId: { type: object }
 *                   enrolledAt: { type: string }
 */
router.get('/my-courses', protect, getMyCourses);

// ==================== ADMIN ENROLLMENTS ROUTE (Only this was added) ====================

/**
 * @swagger
 * /api/enrollments/admin/course/{courseId}:
 *   get:
 *     summary: Get all enrollments for a specific course (Admin only)
 *     tags: [Enrollments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of students enrolled in this course
 */
router.get('/admin/course/:courseId', protect, async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ courseId: req.params.courseId })
      .populate('userId', 'name email')
      .populate('courseId', 'title')
      .sort({ enrolledAt: -1 });

    res.json(enrollments);
  } catch (err) {
    console.error('Admin enrollments error:', err);
    res.status(500).json({ message: 'Failed to load enrollments for this course' });
  }
});

module.exports = router;