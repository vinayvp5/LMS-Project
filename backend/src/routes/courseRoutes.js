const express = require('express');
const { getCourses, getCourseById, createCourse, updateCourse, deleteCourse } = require('../controllers/courseController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// GET all courses
/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: List of all courses
 */
router.get('/', getCourses);

/**
 * @swagger
 * /api/courses/{id}:
 *   get:
 *     summary: Get course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Paste the exact _id from MongoDB Compass courses collection
 *         schema:
 *           type: string
 *           example: "69de0e115450699874c4974e"
 *     responses:
 *       200:
 *         description: Course details returned successfully
 *       404:
 *         description: Course not found
 */
router.get('/:id', getCourseById);

// Admin create course
/**
 * @swagger
 * /api/courses:
 *   post:
 *     summary: Admin creates a course
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               category: { type: string }
 */
router.post('/', protect, adminOnly, createCourse);

// Admin update course
/**
 * @swagger
 * /api/courses/{id}:
 *   put:
 *     summary: Admin updates a course
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Course ID from MongoDB Compass
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string, example: "Updated Java Programming" }
 *               description: { type: string, example: "Updated full course with new topics" }
 *               category: { type: string, example: "Programming" }
 *     responses:
 *       200:
 *         description: Course updated successfully
 *       404:
 *         description: Course not found
 */
router.put('/:id', protect, adminOnly, updateCourse);

// Admin delete course
/**
 * @swagger
 * /api/courses/{id}:
 *   delete:
 *     summary: Admin deletes a course
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Course ID from MongoDB Compass
 *         schema:
 *           type: string
 *           example: "69de0f2b0fa51acaaed33cc2"
 *     responses:
 *       200:
 *         description: Course deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Course deleted successfully"
 */
router.delete('/:id', protect, adminOnly, deleteCourse);

module.exports = router;