const Conversation = require('../../../models/conversation');
const Message = require('../../../models/message');
const mongoose = require('mongoose');

class ChatRepo {
  async createConversation(data) {
    const conversation = new Conversation(data);
    await conversation.save();
    return await this.getConversationById(conversation._id);
  }

  async findExistingDirectConversation(userId1, userId2) {
    return await Conversation.findOne({
      participants: { $all: [userId1, userId2], $size: 2 },
      isGroup: false
    }).populate('participants', 'username displayname firstname lastname');
  }

  async getUserConversations(userId) {
    return await Conversation.find({
      participants: userId
    })
    .populate('participants', 'username displayname firstname lastname')
    .populate('createdBy', 'username displayname')
    .sort({ lastMessageTime: -1 })
    .exec();
  }

  async getConversationById(conversationId) {
    return await Conversation.findById(conversationId)
      .populate('participants', 'username displayname firstname lastname')
      .populate('createdBy', 'username displayname')
      .exec();
  }

  async updateConversationLastMessage(conversationId, lastMessage) {
    return await Conversation.findByIdAndUpdate(
      conversationId,
      {
        lastMessage,
        lastMessageTime: new Date()
      },
      { new: true }
    );
  }

  async createMessage(messageData) {
    const message = new Message(messageData);
    await message.save();
    
    return await Message.findById(message._id)
      .populate('sender', 'username displayname firstname lastname')
      .exec();
  }

  async getMessagesByConversation(conversationId, page, limit) {
    const skip = (page - 1) * limit;
    
    const messages = await Message.find({ conversationId })
      .populate('sender', 'username displayname firstname lastname')
      .populate('readBy', 'username displayname')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
    
    const totalMessages = await Message.countDocuments({ conversationId });
    const totalPages = Math.ceil(totalMessages / limit);
    
    return {
      messages: messages.reverse(),
      pagination: {
        page,
        limit,
        totalMessages,
        totalPages
      }
    };
  }

  async getMessageById(messageId) {
    return await Message.findById(messageId);
  }

  async markMessageAsRead(messageId, userId) {
    return await Message.findByIdAndUpdate(
      messageId,
      {
        $addToSet: { readBy: userId },
        isRead: true
      },
      { new: true }
    )
    .populate('sender', 'username displayname firstname lastname')
    .populate('readBy', 'username displayname')
    .exec();
  }
}

module.exports = ChatRepo;