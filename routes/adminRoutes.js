const express = require('express');
const { getAllUsers, manageTeams, deleteUser } = require('../controllers/adminController');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// Get All Users
router.get('/users', authMiddleware, adminMiddleware, getAllUsers);

// Manage Teams
router.get('/teams', authMiddleware, adminMiddleware, manageTeams);

// Delete User
router.delete('/users/:userId', authMiddleware, adminMiddleware, deleteUser);

module.exports = router;