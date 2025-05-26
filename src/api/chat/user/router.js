const express = require('express');
const UserController = require('./controller');
const UserService = require('./service');
const { 
  createUserSchema, 
  updateUserSchema
} = require('./validation');
const { commonValidationChecker, queryValidationChecker } = require('../../../utils/validationChecker');
const authMiddleware = require('../auth/index').authMiddleware;

class UserRouter {
  constructor() {
    this._service = new UserService();
    this._controller = new UserController(this._service);
  }

  getRouter() {
    const router = express.Router();

    router.post(
      '/',
      commonValidationChecker(createUserSchema),
      this._controller.createUser
    );

    router.get(
      '/',
      authMiddleware.isAuthenticated,
      this._controller.getAllUsers
    );

    router.get(
      '/viewById',
      authMiddleware.isAuthenticated,
      this._controller.getUserById
    );

    router.put(
      '/',
      authMiddleware.isAuthenticated,
      commonValidationChecker(updateUserSchema),
      this._controller.updateUser
    );

    router.delete(
      '/',
      authMiddleware.isAuthenticated,
      this._controller.deleteUser
    );

    return router;
  }
}

module.exports = UserRouter;