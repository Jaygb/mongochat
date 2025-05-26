const { kMessages, kStatusCodes } = require('../../../utils/constants');
const { getErrorMessage } = require('../../../utils/customErrorBuilder');
const AuthService = require('./service');

class AuthController {
  /**
   * @param {AuthService} service
   */
  constructor(service) {
    this._service = service; 
  }

  login = async (req, res) => {
    try {
      res.status(kStatusCodes.NOT_FOUND);

      const login = await this._service.login(req);

      return res.status(kStatusCodes.OK).json({
        status: 1,
        message: kMessages.LOGIN_SUCCESS,
        data: login,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        status: 0,
        message: getErrorMessage(error),
      });
    }
  };

  forgotpassword = async (req, res) => {
    try {
      res.status(kStatusCodes.NOT_FOUND);

      await this._service.forgotpassword(req.body.email);

      return res.status(kStatusCodes.OK).json({
        status: 1,
        message: kMessages.EMAIL_SENT,
        data: {},
      });
    } catch (error) {
      console.log(error);
      return res.json({
        status: 0,
        message: getErrorMessage(error),
      });
    }
  };

  setpassword = async (req, res) => {
    try {
      res.status(kStatusCodes.NOT_FOUND);

      await this._service.setpassword(req.body.password, req.body.token);

      return res.status(kStatusCodes.OK).json({
        status: 1,
        message: kMessages.SET_PASSWORD,
        data: {},
      });
    } catch (error) {
      console.log(error);
      return res.json({
        status: 0,
        message: getErrorMessage(error),
      });
    }
  };
}

module.exports = AuthController;
