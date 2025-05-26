const UserService = require('./service');
const { kMessages, kStatusCodes } = require('../../../utils/constants');
const { getErrorMessage } = require('../../../utils/customErrorBuilder');
const authTokenService = require('../../../services/authTokenService');

class AuthMiddleware {
  /**
   * @param {UserService} service
   */
  constructor(service) {
    this._service = service; // AuthService
  }

  isAuthenticated = async (req, res, next) => {
    try {
      const authorization = req.headers.authorization;

      const token = authorization
        ? authorization.replace('Bearer ', '')
        : undefined;

      if (token === undefined) {
        res.status(kStatusCodes.UNAUTHORIZED).json({
          status: 0,
          message: 'Token is missing',
        });
        return;
      }

      const verify = await authTokenService.verifyTokenForSetPassword(token);
      console.log('verify==', verify);

      if (!verify) {
        return res.status(kStatusCodes.UNAUTHORIZED).json({
          status: 0,
          message: 'User is unauthorized',
        });
      }
console.log("verify ::",verify);
      req.userId = verify.userId;
      next();
    } catch (error) {
      console.log(error);

      return res.status(kStatusCodes.INTERNAL_SERVER_ERROR).json({
        status: 0,
        message: getErrorMessage(error),
      });
    }
  };
}

module.exports = AuthMiddleware;
