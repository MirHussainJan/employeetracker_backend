const Team = require('../models/Team');
const User = require('../models/User');

// Create a Team
exports.createTeam = async (req, res) => {
  const { name, members } = req.body;

  try {
    // Check if all members exist
    const validMembers = await User.find({ _id: { $in: members } });
    if (validMembers.length !== members.length) {
      return res.status(404).json({ message: 'Some members not found' });
    }

    const team = new Team({
      name,
      members,
      creator: req.user.id, // Creator is the logged-in user
    });

    await team.save();
    res.status(201).json(team);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a Task to a Team
exports.addTask = async (req, res) => {
  const { teamId, title, description, status } = req.body;

  try {
    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ message: 'Team not found' });

    const task = { title, description, status: status || 'pending' };

    // Add the task to the corresponding status array
    switch (task.status) {
      case 'done':
        team.tasks.done.push(task);
        break;
      case 'backlog':
        team.tasks.backlog.push(task);
        break;
      default:
        team.tasks.pending.push(task);
        break;
    }

    await team.save();
    res.status(201).json({ message: 'Task added successfully', team });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Team Statistics
exports.getTeamStats = async (req, res) => {
  const { teamId } = req.params;

  try {
    const team = await Team.findById(teamId).populate('members', 'name email');
    if (!team) return res.status(404).json({ message: 'Team not found' });

    const stats = {
      totalTasks: team.tasks.done.length + team.tasks.pending.length + team.tasks.backlog.length,
      done: team.tasks.done.length,
      pending: team.tasks.pending.length,
      backlog: team.tasks.backlog.length,
    };

    res.json({ team, stats });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};