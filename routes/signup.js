const bcrypt = require('bcrypt');
const User = require('../models/User');

const signup = async (root, args) => {
  try {
    const existingUser = await User.findOne({ username: args.username });
    if (existingUser) {
      throw new Error('Username is already taken');
    }

    const hashedPassword = await bcrypt.hash(args.password, 10);
    const user = await User.create({
      username: args.username,
      email: args.email,
      password: hashedPassword,
    });

    return {
      user,
      token: "",
    };
  } catch (error) {
    throw error;
  }
};

module.exports = signup;
