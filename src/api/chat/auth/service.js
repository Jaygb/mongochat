const AuthRepo = require('./repo');
const {
  comparePasswords,
  generatePassword,
} = require('../../../services/securePasswordService');
const authTokenService = require('../../../services/authTokenService');
const sendEmail = require('../../../services/sendEmail');
const config = require('../../../utils/config');
const getHTMLContent = require('../../../utils/getHTMLContent');

class AuthService {
  constructor() {
    this._repo = new AuthRepo();
  }

  async generateToken(userid, expirytime) {
    const token = await authTokenService.signTokenWithExpiry(
      userid,
      expirytime,
    );

    return token;
  }

  async login(req) {
    const { username, password } = req.body;
    const checkUser = await this._repo.isUserExists(username);
    console.log('checkUser :', checkUser);
    if (!checkUser) {
      throw 'User with this email not found';
    }

    if (checkUser.password == null) {
      throw 'Please set your password';
    }

    const comparePassword = await comparePasswords(
      checkUser.password,
      password,
    );

    if (comparePassword == false) {
      throw 'Invalid Password.';
    }
    console.log('object ::', checkUser);
    const token = await this.generateToken(checkUser._id, '24hour');

    const user = checkUser.toObject();
    delete user.password;

    let obj = {
      ...user,
      token,
    };

    return obj;
  }

  async forgotpassword(email) {
    const checkUser = await this._repo.isUserExists(email);
console.log("checkUser ::",checkUser);
    if (checkUser.length == 0) {
      throw 'User with this email not found';
    }

    const token = await this.generateToken(checkUser._id, '24hour');

    const url = config.urls.admin + '/setpassword?token=' + token;

    const htmlContent = await getHTMLContent({
      publicPath: 'templates/setpassword.html',
      url,
    });

    await sendEmail(email, 'Set Password', htmlContent);
  }

  setpassword = async (password, token) => {
    const verify = await authTokenService.verifyTokenForSetPassword(token);

    if (verify == null) {
      throw 'Incorrect Token';
    }
    const userId = verify.userId;

    const hashPassword = await generatePassword(password);

    const setPassword = await this._repo.setpassword(userId, hashPassword);

    if (setPassword == false) {
      throw 'Unable to set password';
    }
  };
}

module.exports = AuthService;
