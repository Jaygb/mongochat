const bcrypt = require('bcrypt');

const saltRounds = 10;

const generatePassword = async (password) => {
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (error) {
    console.error('Error generating password hash:', error);
    return '';
  }
};

const comparePasswords = async (password, userPassword) => {
  try {
    const isMatch = await bcrypt.compare(userPassword, password);
    return isMatch;
  } catch (error) {
    console.error('Error comparing passwords:', error);
    return false;
  }
};

const generateRandomNumber = async () => {
  return Math.floor(100000 + Math.random() * 900000);
};

module.exports = {
  generatePassword,
  comparePasswords,
  generateRandomNumber,
};
