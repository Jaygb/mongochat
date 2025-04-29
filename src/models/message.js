const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conversation',
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: { type: String, maxlength: 1000, required: true },
    isRead: { type: Boolean, default: false },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    attachments: [
      {
        fileUrl: { type: String, maxlength: 500 },
        fileType: { type: String, maxlength: 50 },
        fileName: { type: String, maxlength: 100 },
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Message', messageSchema, 'chat_message');
