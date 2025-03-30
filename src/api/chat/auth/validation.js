const z = require('zod');

const loginUserSchema = z.object({
  username: z
    .string({
      required_error: 'username is required',
    })
    .min(1, 'username cannot be blank')
    .max(167, 'username is Too Long'),
  password: z
    .string({
      required_error: 'password is required',
    })
    .min(1, 'password cannot be blank')
    .max(20, 'password is Too Long'),
});

const forgotPasswordSchema = z.object({
  email: z
    .string({
      required_error: 'email is required',
    })
    .min(1, 'email cannot be blank')
    .max(167, 'email is Too Long'),
});

const setPasswordSchema = z.object({
  token: z
    .string({
      required_error: 'token is required',
    })
    .min(1, 'token cannot be blank')
    .max(267, 'token is Too Long'),
  password: z
    .string({
      required_error: 'password is required',
    })
    .min(1, 'password cannot be blank')
    .max(20, 'password is Too Long'),
});

module.exports = {
  loginUserSchema,
  forgotPasswordSchema,
  setPasswordSchema,
};
