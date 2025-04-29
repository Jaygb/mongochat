const { kMessages, kStatusCodes } = require('../../../utils/constants');
const { getErrorMessage } = require('../../../utils/customErrorBuilder');
const ChatService = require('./service');

class ChatController {
  /**
   * @param {ChatService} service
   */
  constructor(service) {
    this._service = service;
  }

  createConversation = async (req, res) => {
    try {
      res.status(kStatusCodes.BAD_REQUEST);

      const { participants, isGroup, groupName } = req.body;
      const userId = req.userId; // From auth middleware
      
      const conversation = await this._service.createConversation({
        participants,
        isGroup,
        groupName,
        createdBy: userId
      });

      return res.status(kStatusCodes.CREATED).json({
        status: 1,
        message: kMessages.CONVERSATION_CREATED,
        data: conversation,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        status: 0,
        message: getErrorMessage(error),
      });
    }
  };

  getUserConversations = async (req, res) => {
    try {
      res.status(kStatusCodes.NOT_FOUND);

      const userId = req.userId; // From auth middleware
      const conversations = await this._service.getUserConversations(userId);

      return res.status(kStatusCodes.OK).json({
        status: 1,
        message: kMessages.CONVERSATIONS_FETCHED,
        data: conversations,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        status: 0,
        message: getErrorMessage(error),
      });
    }
  };

  getConversationById = async (req, res) => {
    try {
      res.status(kStatusCodes.NOT_FOUND);

      const conversationId = req.params.conversationId;
      const userId = req.userId; // From auth middleware
      
      const conversation = await this._service.getConversationById(conversationId, userId);

      return res.status(kStatusCodes.OK).json({
        status: 1,
        message: kMessages.CONVERSATION_FETCHED,
        data: conversation,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        status: 0,
        message: getErrorMessage(error),
      });
    }
  };

  sendMessage = async (req, res) => {
    try {
      res.status(kStatusCodes.BAD_REQUEST);

      const { conversationId, content, attachments } = req.body;
      const userId = req.userId; // From auth middleware
      
      const message = await this._service.sendMessage({
        conversationId,
        sender: userId,
        content,
        attachments
      });

      return res.status(kStatusCodes.CREATED).json({
        status: 1,
        message: kMessages.MESSAGE_SENT,
        data: message,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        status: 0,
        message: getErrorMessage(error),
      });
    }
  };

  getMessagesByConversation = async (req, res) => {
    try {
      res.status(kStatusCodes.NOT_FOUND);

      const conversationId = req.params.conversationId;
      const userId = req.userId; // From auth middleware
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 20;
      
      const messages = await this._service.getMessagesByConversation(
        conversationId,
        userId,
        page,
        limit
      );

      return res.status(kStatusCodes.OK).json({
        status: 1,
        message: kMessages.MESSAGES_FETCHED,
        data: messages,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        status: 0,
        message: getErrorMessage(error),
      });
    }
  };

  markMessageAsRead = async (req, res) => {
    try {
      res.status(kStatusCodes.NOT_FOUND);

      const messageId = req.params.messageId;
      const userId = req.userId; // From auth middleware
      
      await this._service.markMessageAsRead(messageId, userId);

      return res.status(kStatusCodes.OK).json({
        status: 1,
        message: kMessages.MESSAGE_READ,
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

module.exports = ChatController;