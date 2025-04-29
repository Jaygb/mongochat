const UserRepo = require('./repo');
const { kMessages } = require('../../../utils/constants');

class UserService {
  constructor() {
    this._repo = new UserRepo();
  }

  async createUser(userData) {
    const existingUser = await this._repo.isEmailExists(userData.email);
    if (existingUser) {
      throw 'Email already exists';
    }

    return await this._repo.createUser(userData);
  }

  async getAllUsers() {
    return await this._repo.getAllActiveUsers();
  }

  async getUserById(userId) {
    const user = await this._repo.getUserById(userId);
    if (!user) {
      throw 'User not found';
    }
    return user;
  }

  async updateUser(userId, updateData) {
    if (updateData.email) {
      const existingUserWithEmail = await this._repo.isEmailExistsForOtherUser(
        updateData.email, 
        userId
      );
      
      if (existingUserWithEmail) {
        throw 'Email already in use by another user';
      }
    }

    if (updateData.password) {
      delete updateData.password;
    }

    const updatedUser = await this._repo.updateUser(userId, updateData);
    
    if (!updatedUser) {
      throw 'User not found or could not be updated';
    }

    return updatedUser;
  }

  async deleteUser(userId) {
    const deletedUser = await this._repo.softDeleteUser(userId);
    
    if (!deletedUser) {
      throw 'User not found or could not be deleted';
    }

    return deletedUser;
  }
}

module.exports = UserService;