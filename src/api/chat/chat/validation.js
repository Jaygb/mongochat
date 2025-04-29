const z = require('zod');
const mongoose = require('mongoose');

// Helper function to validate ObjectId
const isValidObjectId = (value) => {
  return mongoose.Types.ObjectId.isValid(value);
};

const objectIdSchema = z.string().refine(isValidObjectId, {
  message: 'Invalid ObjectId format',
});

const createConversationSchema = z.object({
  participants: z.array(objectIdSchema).min(1, 'At least one participant is required'),
  isGroup: z.boolean().optional(),
  groupName: z.string().max(100).optional(),
});

const sendMessageSchema = z.object({
  conversationId: objectIdSchema,
  content: z.string().min(1, 'Message content cannot be empty').max(1000, 'Message too long'),
  attachments: z
    .array(
      z.object({
        fileUrl: z.string().max(500),
        fileType: z.string().max(50),
        fileName: z.string().max(100),
      })
    )
    .optional(),
});

const getMessagesSchema = z.object({
  page: z.string().regex(/^\d+$/).transform(Number).optional(),
  limit: z.string().regex(/^\d+$/).transform(Number).optional(),
}).refine(data => {
  // This will validate the conversationId in the params, not in the body
  return true;
});

module.exports = {
  createConversationSchema,
  sendMessageSchema,
  getMessagesSchema,
};