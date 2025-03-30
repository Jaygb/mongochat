const jwt = require('jsonwebtoken');
const config = require('../utils/config');

class TokenService {
  static _jwtPass = config.secret.tokenSecret;

  static async signToken(userId) {
    try {
      const token = jwt.sign({ userId }, this._jwtPass);
      return token;
    } catch (error) {
      console.log('error', error);
    }
    return '';
  }

  static async signTokenWithExpiry(userId, expiry) {
    try {
      const token = jwt.sign({ userId }, this._jwtPass, {
        expiresIn: expiry,
      });
      return token;
    } catch (error) {
      console.log('error', error);
    }
    return '';
  }

  static async signTokenForSetPassword(userId, secret) {
    try {
      const token = await jwt.sign({ userId, secret }, this._jwtPass, {
        expiresIn: '24h',
      });
      return token;
    } catch (error) {
      console.log('error', error);
    }
    return '';
  }

  static async verifyTokenForSetPassword(token) {
    try {
      return await jwt.verify(token, this._jwtPass);
    } catch (error) {
      console.log('Token verification error', error);
      return null;
    }
  }
}

module.exports = TokenService;
