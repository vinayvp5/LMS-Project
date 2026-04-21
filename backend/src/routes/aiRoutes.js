const express = require('express');
const axios = require('axios');
const router = express.Router();

/**
 * @swagger
 * /api/ai/generate-description:
 *   post:
 *     summary: Generate AI course description using Groq
 *     tags: [AI]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       200:
 *         description: Generated description
 *       400:
 *         description: Title is required
 */
router.post('/generate-description', async (req, res) => {
  const { title } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({ message: 'Course title is required' });
  }

  try {
    const groqResponse = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that generates engaging course descriptions for online learning platforms."
          },
          {
            role: "user",
            content: `Generate a concise, engaging course description (80-120 words) for the course titled: "${title}". Make it suitable for an online LMS.`
          }
        ],
        temperature: 0.7,
        max_tokens: 300
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 15000
      }
    );

    const description = groqResponse.data.choices[0].message.content.trim();

    res.json({ description });

  } catch (err) {
    console.error('Groq API Error:', err.message);
    res.status(500).json({ message: 'AI generation failed. Please try again later.' });
  }
});

module.exports = router;