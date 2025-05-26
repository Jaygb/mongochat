const User = require('../../../models/user');

class UserRepo {
  constructor() {}

  createUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
  };

  getAllActiveUsers = async () => {
    return await User.find({ isactive: true }).select('-password');
  };

  getUserById = async (userId) => {
    return await User.findOne({
      _id: userId,
      isactive: true,
    }).select('-password');
  };

  updateUser = async (userId, updateData) => {
    return await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true },
    ).select('-password');
  };

  //soft delete
  DeleteUser = async (userId, isactive) => {
    return await User.findByIdAndUpdate(
      userId,
      { $set: { isactive: isactive } },
      { new: true },
    );
  };

  isEmailExistsForOtherUser = async (email, currentUserId) => {
    return await User.findOne({
      email,
      _id: { $ne: currentUserId },
      isactive: true,
    });
  };

  isEmailExists = async (email) => {
    return await User.findOne({
      email,
      isactive: true,
    });
  };

  //hard delete
  deleteUserPermanently = async (userId) => {
    return await User.findByIdAndDelete(userId);
  };
}

module.exports = UserRepo;
