const AuthController = require('./controller');
const express = require('express');
const {
  loginUserSchema,
  setPasswordSchema,
  forgotPasswordSchema,
} = require('./validation');
const { commonValidationChecker } = require('../../../utils/validationChecker');

class AuthRouter {
  /**
   * @param {AuthController} controller
   */

  constructor(controller) {
    this._controller = controller;
  }

  getRouter() {
    const router = express.Router();

    router.post(
      '/login',
      commonValidationChecker(loginUserSchema),
      this._controller.login,
    );

    router.post(
      '/forgot_password',
      commonValidationChecker(forgotPasswordSchema),
      this._controller.forgotpassword,
    );

    router.post(
      '/set_password',
      commonValidationChecker(setPasswordSchema),
      this._controller.setpassword,
    );

    return router;
  }
}

module.exports = AuthRouter;
