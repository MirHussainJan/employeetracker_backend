const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// Public Routes
router.post('/register', registerUser); // Register a user
router.post('/login', loginUser);       // User login

// Protected Admin Routes (Example)
router.get('/admin/users', authMiddleware, adminMiddleware, (req, res) => {
  res.send('Admin route for managing users');
});

module.exports = router;
