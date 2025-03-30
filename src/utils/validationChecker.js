const {
  extractErrorFromValidation,
  getErrorMessage,
} = require('../utils/customErrorBuilder');
const { kStatusCodes } = require('../utils/constants');

const commonValidationChecker = (schema) => {
  return (req, res, next) => {
    try {
      const data = req.body;

      const result = schema.safeParse(data);

      if (!result.success) {
        return res.status(kStatusCodes.BAD_REQUEST).json({
          status: 0,
          message: extractErrorFromValidation(result.error),
        });
      }

      next();
    } catch (error) {
      if (
        typeof error === 'string' ||
        error instanceof Error ||
        (error && typeof error === 'object' && 'message' in error)
      ) {
        return res.status(kStatusCodes.INTERNAL_SERVER_ERROR).json({
          status: 0,
          message: getErrorMessage(error),
        });
      }

      return res.status(kStatusCodes.INTERNAL_SERVER_ERROR).json({
        status: 0,
        message: 'An unknown error occurred',
      });
    }
  };
};

const queryValidationChecker = (schema) => {
  return (req, res, next) => {
    try {
      const data = req.query;

      const result = schema.safeParse(data);

      if (!result.success) {
        return res.status(kStatusCodes.BAD_REQUEST).json({
          status: 0,
          message: extractErrorFromValidation(result.error),
        });
      }

      next();
    } catch (error) {
      if (
        typeof error === 'string' ||
        error instanceof Error ||
        (error && typeof error === 'object' && 'message' in error)
      ) {
        return res.status(kStatusCodes.INTERNAL_SERVER_ERROR).json({
          status: 0,
          message: getErrorMessage(error),
        });
      }

      return res.status(kStatusCodes.INTERNAL_SERVER_ERROR).json({
        status: 0,
        message: 'An unknown error occurred',
      });
    }
  };
};

module.exports = { commonValidationChecker, queryValidationChecker };
