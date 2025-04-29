const express = require('express');
const { commonValidationChecker } = require('../../../utils/validationChecker');
const { 
  createConversationSchema, 
  sendMessageSchema,
  getMessagesSchema
} = require('./validation');

class ChatRouter {
  /**
   * @param {ChatController} controller
   */
  constructor(controller) {
    this._controller = controller;
  }

  getRouter() {
    const router = express.Router();

    // Conversation endpoints
    router.post(
      '/conversations',
      commonValidationChecker(createConversationSchema),
      this._controller.createConversation
    );
    
    router.get(
      '/conversations',
      this._controller.getUserConversations
    );
    
    router.get(
      '/conversations/:conversationId',
      this._controller.getConversationById
    );

    // Message endpoints
    router.post(
      '/messages',
      commonValidationChecker(sendMessageSchema),
      this._controller.sendMessage
    );
    
    router.get(
      '/conversations/:conversationId/messages',
      commonValidationChecker(getMessagesSchema),
      this._controller.getMessagesByConversation
    );
    
    router.patch(
      '/messages/:messageId/read',
      this._controller.markMessageAsRead
    );

    return router;
  }
}

module.exports = ChatRouter;