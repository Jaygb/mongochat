// test.js
const mongoose = require('mongoose');
const User = require('../src/models/user'); // Adjust path based on your structure
require('dotenv').config();
const config = require("../src/utils/config");

// Connect to MongoDB
mongoose
  .connect(config.mongodb.uri)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ Connection error:', err));

// Create a New User Document
const createUser = async () => {
  try {
    const user = new User({
      username: 'john_doe',
      displayname: 'John Doe',
      password: 'securepassword',
      email: 'john@example.com',
      contact: '9876543210',
      firstname: 'John',
      lastname: 'Doe',
    });

    await user.save();
    console.log("✅ User created successfully:", user);

    // const findone = await User.findOne({ email: 'john@example.com' }).sort({
    //   createdAt: -1,
    // });
    // console.log('✅ User created successfully:', findone);
    // console.log('UTC Time:', findone.createdAt);
    // console.log(
    //   'Local Time:',
    //   findone.createdAt.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }),
    // );

    // const findit = await User.aggregate([
    //   {
    //     $match: { email: "john@example.com" },
    //   },
    //   {
    //     $sort: { createdAt: -1 },
    //   },
    //   {
    //     $limit: 1,
    //   },
    // ]);

    // console.log('aavo aavo :', findit);
  } catch (err) {
    console.error('❌ Error creating user:', err.message);
  } finally {
    mongoose.connection.close(); // Close the connection after operation
  }
};

// Run the function
createUser();

  // async addUser(req) {
  //   const { email, contact, firstname, lastname } = req.body;

  //   // Check if the user already exists
  //   const existingUser = await this._repo.isUserExists(email);
  //   if (existingUser) {
  //     throw 'User with this email already exists';
  //   }

  //   // Create a new user
  //   const newUser = await this._repo.addUser({ email, contact, firstname, lastname });

  //   // Generate a token for setting the password
  //   const token = await this.generateToken(newUser._id, '24hour');

  //   // Generate email content
  //   const url = `${config.urls.admin}/setpassword?token=${token}`;
  //   const htmlContent = await getHTMLContent({
  //     publicPath: 'templates/setpassword.html',
  //     url,
  //   });

  //   // Send email to set password
  //   await sendEmail(email, 'Set Your Password', htmlContent);

  //   return newUser;
  // }