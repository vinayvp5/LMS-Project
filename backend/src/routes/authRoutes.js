const express = require('express');
const { register, login, profile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a student
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string, example: "Kanish" }
 *               email: { type: string, example: "kanish@gmail.com" }
 *               password: { type: string, example: "kanish1" }
 *     responses:
 *       201:
 *         description: Student registered successfully
 */
router.post('/signup', register);

/**
 * @swagger
 * /api/auth/admin-signup:
 *   post:
 *     summary: Register an admin
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string, example: " Admin" }
 *               email: { type: string, example: "admin@gmail.com" }
 *               password: { type: string, example: "admin1" }
 *     responses:
 *       201:
 *         description: Admin registered successfully
 */
// router.post('/admin-signup', register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user/admin
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: string, example: "kanish@gmail.com" }
 *               password: { type: string, example: "kanish1" }
 *     responses:
 *       200:
 *         description: Login successful - returns token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token: { type: string }
 *                 user: { type: object }
 */
router.post('/login', login);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get current logged in user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns current user details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id: { type: string }
 *                 name: { type: string }
 *                 email: { type: string }
 *                 role: { type: string }
 */
router.get('/me', protect, profile);

module.exports = router;