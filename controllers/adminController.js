const User = require('../models/User');
const Team = require('../models/Team');

// Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Manage Teams
exports.manageTeams = async (req, res) => {
  try {
    const teams = await Team.find().populate('members creator', 'name email');
    res.json(teams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    await user.remove();
    res.json({ message: 'User deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
