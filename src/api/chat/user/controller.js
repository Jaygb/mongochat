const { kMessages, kStatusCodes } = require('../../../utils/constants');
const { getErrorMessage } = require('../../../utils/customErrorBuilder');
const UserService = require('./service');

class UserController {
  constructor() {
    this._service = new UserService();
  }

  createUser = async (req, res) => {
    try {
      const user = await this._service.createUser(req);

      return res.status(kStatusCodes.CREATED).json({
        status: 1,
        message: kMessages.USER_ADDED,
        data: user
      });
    } catch (error) {
      console.log(error);
      return res.status(kStatusCodes.BAD_REQUEST).json({
        status: 0,
        message: getErrorMessage(error),
      });
    }
  };

  getAllUsers = async (req, res) => {
    try {
      const users = await this._service.getAllUsers(req);

      return res.status(kStatusCodes.OK).json({
        status: 1,
        message: kMessages.GET_USER,
        data: users
      });
    } catch (error) {
      console.log(error);
      return res.status(kStatusCodes.INTERNAL_SERVER_ERROR).json({
        status: 0,
        message: getErrorMessage(error),
      });
    }
  };

  getUserById = async (req, res) => {
    try {
      const user = await this._service.getUserById(req);

      return res.status(kStatusCodes.OK).json({
        status: 1,
        message: kMessages.GET_USER,
        data: user
      });
    } catch (error) {
      console.log(error);
      return res.status(kStatusCodes.NOT_FOUND).json({
        status: 0,
        message: getErrorMessage(error),
      });
    }
  };

  updateUser = async (req, res) => {
    try {
      const updatedUser = await this._service.updateUser(req)

      return res.status(kStatusCodes.OK).json({
        status: 1,
        message: kMessages.UPDATE_USER,
        data: updatedUser
      });
    } catch (error) {
      console.log(error);
      return res.status(kStatusCodes.BAD_REQUEST).json({
        status: 0,
        message: getErrorMessage(error),
      });
    }
  };

  deleteUser = async (req, res) => {
    try {
      await this._service.deleteUser(req);

      return res.status(kStatusCodes.OK).json({
        status: 1,
        message: kMessages.DELETE_USER,
      });
    } catch (error) {
      console.log(error);
      return res.status(kStatusCodes.BAD_REQUEST).json({
        status: 0,
        message: getErrorMessage(error),
      });
    }
  };
}

module.exports = UserController;