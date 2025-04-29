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
  GET_USER: 'Users Fetched successfully',
  UPDATE_USER: 'User updated successfully',
  DELETE_USER: 'User deleted successfully',
  LOGIN_SUCCESS: 'Login successfully',
  EMAIL_SENT: 'Email sent successfully',
  SET_PASSWORD: 'Password set successfully',

  // ==========================   chat ===========================
  CONVERSATION_CREATED: 'Conversation created successfully',
  CONVERSATIONS_FETCHED: 'Conversations fetched successfully',
  CONVERSATION_FETCHED: 'Conversation details fetched successfully',
  MESSAGE_SENT: 'Message sent successfully',
  MESSAGES_FETCHED: 'Messages fetched successfully',
  MESSAGE_READ: 'Message marked as read',
};

module.exports = {
  kStatusCodes,
  kMessages,
};
