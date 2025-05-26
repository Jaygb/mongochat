const UserRepo = require('./repo');
const { kMessages } = require('../../../utils/constants');
const sendEmail = require('../../../services/sendEmail');
const getHTMLContent = require('../../../utils/getHTMLContent');
const authTokenService = require('../../../services/authTokenService');
const config = require('../../../utils/config');

class UserService {
  constructor() {
    this._repo = new UserRepo();
  }

  async generateToken(userid, expirytime) {
    const token = await authTokenService.signTokenWithExpiry(
      userid,
      expirytime,
    );

    return token;
  }

  async createUser(req) {
    const { email, firstname, lastname, contact } = req.body;

    const existingUser = await this._repo.isEmailExists(email);
    if (existingUser) {
      throw 'Email already exists';
    }

    const adduser = await this._repo.createUser({
      username: email,
      email,
      firstname,
      lastname,
      displayname: firstname + ' ' + lastname,
      contact,
    });

    const token = await this.generateToken(adduser._id, '24hour');
    const url = config.urls.admin + '/setpassword?token=' + token;

    const htmlContent = await getHTMLContent({
      publicPath: 'templates/setpassword.html',
      url,
    });

    await sendEmail(email, 'Set Password', htmlContent);
  }

  async getAllUsers(req) {
    const userId = req.userId;
    console.log(userId);
    const userlist = await this._repo.getAllActiveUsers();

    return { list: userlist };
  }

  async getUserById(req) {
    const userId = req.userId;
    const user = await this._repo.getUserById(userId);
    if (!user) {
      throw 'User not found';
    }
    return user;
  }

  async updateUser(req) {
    const userId = req.userId;
    const { email, firstname, lastname, contact } = req.body;

    const existingUserWithEmail = await this._repo.isEmailExistsForOtherUser(
      email,
      userId,
    );

    if (existingUserWithEmail) {
      throw 'Email already in use by another user';
    }

    const updateData = {
      email,
      firstname,
      lastname,
      contact,
      displayname: firstname + ' ' + lastname,
    };

    const updatedUser = await this._repo.updateUser(userId, updateData);

    if (!updatedUser) {
      throw 'User not found or could not be updated';
    }

    return updatedUser;
  }

  async deleteUser(req) {
    const userId = req.userId;
    const { isactive } = req.body;
    const deletedUser = await this._repo.DeleteUser(userId, isactive);

    if (!deletedUser) {
      throw 'User not found or could not be deleted';
    }

    return deletedUser;
  }
}

module.exports = UserService;
