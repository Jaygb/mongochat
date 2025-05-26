const z = require('zod');

const createUserSchema = z.object({
  email: z
    .string({
      required_error: 'email is required',
    })
    .email('Invalid email format')
    .min(1, 'email cannot be blank')
    .max(167, 'email is too long'),
  firstname: z
    .string({
      required_error: 'firstname is required',
    }),
  lastname: z
    .string({
      required_error: 'lastname is required',
    }),
  contact: z
    .string({
      required_error: 'contact is required',
    }),
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
});

module.exports = {
  createUserSchema,
  updateUserSchema
};