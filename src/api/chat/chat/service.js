const ChatRepo = require('./repo');
const mongoose = require('mongoose');

class ChatService {
  /**
   * @param {ChatRepo} repo
   */
  constructor(repo) {
    this._repo = repo;
  }

  async createConversation(data) {
    // If it's not a group chat, check if a conversation already exists between these users
    if (!data.isGroup && data.participants.length === 1) {
      // Add the current user to participants
      const allParticipants = [...data.participants, data.createdBy];
      
      // Check for existing conversation
      const existingConversation = await this._repo.findExistingDirectConversation(
        allParticipants[0], 
        allParticipants[1]
      );
      
      if (existingConversation) {
        return existingConversation;
      }
      
      // Create new conversation with both users
      return await this._repo.createConversation({
        participants: allParticipants,
        isGroup: false,
        createdBy: data.createdBy
      });
    }
    
    // For group conversations, add the creator to participants
    if (!data.participants.includes(data.createdBy)) {
      data.participants.push(data.createdBy);
    }
    
    return await this._repo.createConversation(data);
  }

  async getUserConversations(userId) {
    return await this._repo.getUserConversations(userId);
  }

  async getConversationById(conversationId, userId) {
    // Check if user is part of this conversation
    const conversation = await this._repo.getConversationById(conversationId);
    
    if (!conversation) {
      throw 'Conversation not found';
    }
    
    if (!conversation.participants.some(p => p._id.toString() === userId.toString())) {
      throw 'You do not have access to this conversation';
    }
    
    return conversation;
  }

  async sendMessage(messageData) {
    // Check if conversation exists and user is part of it
    const conversation = await this._repo.getConversationById(messageData.conversationId);
    
    if (!conversation) {
      throw 'Conversation not found';
    }
    
    if (!conversation.participants.some(p => p._id.toString() === messageData.sender.toString())) {
      throw 'You do not have permission to send messages to this conversation';
    }
    
    // Create message
    const message = await this._repo.createMessage(messageData);
    
    // Update conversation with last message info
    await this._repo.updateConversationLastMessage(
      messageData.conversationId,
      messageData.content
    );
    
    // Emit socket event
    if (global.socketService) {
      global.socketService.emitToConversation(
        messageData.conversationId,
        'new_message',
        message
      );
      
      // Also emit unread message notification to all other participants
      conversation.participants.forEach(participant => {
        if (participant._id.toString() !== messageData.sender.toString()) {
          global.socketService.emitToUser(
            participant._id.toString(),
            'unread_message',
            {
              conversationId: messageData.conversationId,
              messageId: message._id,
              sender: messageData.sender,
              content: messageData.content,
            }
          );
        }
      });
    }
    
    return message;
  }

  async getMessagesByConversation(conversationId, userId, page, limit) {
    // Check if user is part of this conversation
    const conversation = await this._repo.getConversationById(conversationId);
    
    if (!conversation) {
      throw 'Conversation not found';
    }
    
    if (!conversation.participants.some(p => p._id.toString() === userId.toString())) {
      throw 'You do not have access to this conversation';
    }
    
    return await this._repo.getMessagesByConversation(conversationId, page, limit);
  }

  async markMessageAsRead(messageId, userId) {
    // Get the message
    const message = await this._repo.getMessageById(messageId);
    
    if (!message) {
      throw 'Message not found';
    }
    
    // Check if user is part of this conversation
    const conversation = await this._repo.getConversationById(message.conversationId);
    
    if (!conversation) {
      throw 'Conversation not found';
    }
    
    if (!conversation.participants.some(p => p._id.toString() === userId.toString())) {
      throw 'You do not have access to this conversation';
    }
    
    // Mark as read
    const updatedMessage = await this._repo.markMessageAsRead(messageId, userId);
    
    // Emit socket event
    if (global.socketService) {
      global.socketService.emitToConversation(
        message.conversationId.toString(),
        'message_read',
        {
          messageId,
          readBy: userId,
        }
      );
    }
    
    return updatedMessage;
  }
}

module.exports = ChatService;