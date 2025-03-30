const User = require('../../models/user');

class AuthRepo {
  constructor() {}

  // Check if a user exists by username
  isUserExists = async (username) => {
    return await User.findOne({ username });
  };

  // Set password for a user
  setpassword = async (userid, password) => {
    return await User.updateOne({ _id: userid }, { $set: { password } });
  };
}

module.exports = AuthRepo;
