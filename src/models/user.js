const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: { type: String, maxlength: 167 },
    displayname: { type: String, maxlength: 167 },
    password: { type: String, maxlength: 167 },
    email: { type: String, maxlength: 167 },
    contact: { type: String, maxlength: 17 },
    isactive: { type: Boolean, default: true },
    firstname: { type: String, maxlength: 67 },
    lastname: { type: String, maxlength: 67 },
    isdefault: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

// Set MongoDB collection name to 'usr_user'
module.exports = mongoose.model('User', userSchema, 'usr_user');
