const { kMessages, kStatusCodes } = require("./constants");
const { getErrorMessage } = require("./error");

const paramIdValidator = (idKey) => (req, res, next) => {
  try {
    const id = req.params[idKey];

    if (!id) {
      res.statusCode = kStatusCodes.BAD_REQUEST;
      throw kMessages.badRequest;
    }

    const parsedId = Number.parseInt(id);

    if (isNaN(parsedId)) {
      res.statusCode = kStatusCodes.BAD_REQUEST;
      throw kMessages.badRequest;
    }

    next();
  } catch (error) {
    return res.json({
      status: 0,
      message: getErrorMessage(error),
    });
  }
};

module.exports = paramIdValidator;
