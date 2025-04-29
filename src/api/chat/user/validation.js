const z = require('zod');

const createUserSchema = z.object({
  username: z
    .string({
      required_error: 'Username is required',
    })
    .min(1, 'Username cannot be blank')
    .max(167, 'Username is too long'),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email format')
    .min(1, 'Email cannot be blank')
    .max(167, 'Email is too long'),
  firstname: z
    .string()
    .optional(),
  lastname: z
    .string()
    .optional(),
  contact: z
    .string()
    .optional(),
  displayname: z
    .string()
    .optional()
});

const updateUserSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email format')
    .min(1, 'Email cannot be blank')
    .max(167, 'Email is too long'),
  firstname: z
    .string()
    .optional(),
  lastname: z
    .string()
    .optional(),
  contact: z
    .string()
    .optional(),
  displayname: z
    .string()
    .optional()
});

const getUserByIdSchema = z.object({
  id: z
    .string({
      required_error: 'User ID is required',
    })
    .min(1, 'User ID cannot be blank')
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  getUserByIdSchema
};