const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  urls: {
    admin: process.env.ADMIN_PUBLIC_URL || '',
  },
  secret: {
    tokenSecret: process.env.TOKEN_SECRET || '',
    encryptSK: process.env.ENCRYPT_SECRET_KEY || '',
    encryptIV: process.env.ENCRYPT_IV_KEY || '',
  },
  smtp: {
    email: process.env.EMAIL || '',
    password: process.env.EMAIL_APP_PASSWORD || '',
  },
  mongodb: {
    uri: process.env.MONGO_URI || '',
  },
};

module.exports = config;
