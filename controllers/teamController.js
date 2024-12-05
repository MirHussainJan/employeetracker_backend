const Team = require('../models/Team');

// Create a Team
exports.createTeam = async (req, res) => {
  const { name, members } = req.body;

  try {
    const team = new Team({ name, creator: req.user._id, members });
    await team.save();
    res.status(201).json(team);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Add Task to Team
exports.addTask = async (req, res) => {
  const { teamId, title, description, status } = req.body;

  try {
    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ message: 'Team not found.' });

    if (team.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Only the creator can add tasks.' });
    }

    team.tasks.push({ title, description, status });
    await team.save();
    res.json(team);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get Team Statistics
exports.getTeamStats = async (req, res) => {
  const { teamId } = req.params;

  try {
    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ message: 'Team not found.' });

    const stats = {
      pending: team.tasks.filter((task) => task.status === 'pending').length,
      done: team.tasks.filter((task) => task.status === 'done').length,
      backlog: team.tasks.filter((task) => task.status === 'backlog').length,
    };

    res.json({ team, stats });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};