const express = require('express');
const { createTeam, addTask, getTeamStats } = require('../controllers/teamController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// Team Management Routes
router.post('/', authMiddleware, createTeam);         // Create a team
router.post('/tasks', authMiddleware, addTask);       // Add tasks to a team
router.get('/:teamId/stats', authMiddleware, getTeamStats); // Get team statistics

module.exports = router;
