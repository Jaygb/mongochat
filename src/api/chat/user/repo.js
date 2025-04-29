const User = require('../../models/user');

class UserRepo {
  constructor() {}

  // Create a new user
  createUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
  };

  // Get all active users
  getAllActiveUsers = async () => {
    return await User.find({ isactive: true }).select('-password');
  };

  // Get user by ID (only if active)
  getUserById = async (userId) => {
    return await User.findOne({ 
      _id: userId, 
      isactive: true 
    }).select('-password');
  };

  // Update user details
  updateUser = async (userId, updateData) => {
    return await User.findByIdAndUpdate(
      userId, 
      { $set: updateData }, 
      { new: true }
    ).select('-password');
  };

  // Soft delete user (set isactive to false)
  softDeleteUser = async (userId) => {
    return await User.findByIdAndUpdate(
      userId, 
      { $set: { isactive: false } }, 
      { new: true }
    );
  };

  // Check if email exists for another user
  isEmailExistsForOtherUser = async (email, currentUserId) => {
    return await User.findOne({ 
      email, 
      _id: { $ne: currentUserId },
      isactive: true 
    });
  };

  // Check if email exists
  isEmailExists = async (email) => {
    return await User.findOne({ 
      email,
      isactive: true 
    });
  };
}

module.exports = UserRepo;