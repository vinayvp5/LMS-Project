const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const isAdminSignup = req.originalUrl.includes('/admin-signup');
  const role = isAdminSignup ? 'admin' : 'user';

  console.log(`[REGISTER] Attempt → ${role.toUpperCase()} | Email: ${email}`);

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log(`[REGISTER] Failed → Email already exists: ${email}`);
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ 
      name, 
      email, 
      password: hashedPassword,
      role: role 
    });

    // Generate token immediately after registration
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    console.log(`[REGISTER] SUCCESS → ${role.toUpperCase()} created | Email: ${email}`);

    res.status(201).json({
      message: `${role} registered successfully`,
      token: token,                    // ← Added token here
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        role: user.role 
      }
    });
  } catch (err) {
    console.error(`[REGISTER] ERROR:`, err.message);
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(`[LOGIN] Attempt → Email: ${email}`);

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      console.log(`[LOGIN] Failed → Invalid credentials for: ${email}`);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    console.log(`[LOGIN] SUCCESS → Email: ${email} | Role: ${user.role}`);

    res.json({ 
      token, 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        role: user.role 
      } 
    });
  } catch (err) {
    console.error(`[LOGIN] ERROR:`, err.message);
    res.status(500).json({ message: err.message });
  }
};

const profile = async (req, res) => {
  res.json(req.user);
};

module.exports = { register, login, profile };