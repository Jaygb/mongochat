const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema(
  {
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    lastMessage: { type: String, maxlength: 500 },
    lastMessageTime: { type: Date, default: Date.now },
    isGroup: { type: Boolean, default: false },
    groupName: { type: String, maxlength: 100 },
    isActive: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model(
  'Conversation',
  conversationSchema,
  'chat_conversation',
);
