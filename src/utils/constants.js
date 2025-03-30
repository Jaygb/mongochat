const kStatusCodes = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  INVALID_TOKEN: 498,
};

const kMessages = {
  NDF404: '404 route not found',

  // ==========================   user ===========================
  USER_ADDED: 'User added successfully',
  LOGIN_SUCCESS: 'Login successfully',
  EMAIL_SENT: 'Email sent successfully',
  SET_PASSWORD: 'Password set successfully',
};

module.exports = {
  kStatusCodes,
  kMessages,
};
