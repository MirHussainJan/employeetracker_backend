const express = require('express');
const { createTeam, addTask, getTeamStats } = require('../controllers/teamController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// Create a Team
router.post('/', authMiddleware, createTeam);

// Add a Task to a Team
router.post('/tasks', authMiddleware, addTask);

// Get Team Statistics
router.get('/:teamId/stats', authMiddleware, getTeamStats);

module.exports = router;