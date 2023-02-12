const User = require('../models/User.js');

const login = async (usernameOrEmail, password) => {
  try {
    const user = await User.findOne({ $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] });
    if (!user) {
      throw new Error('User not found');
    }
    if (user.password !== password) {
      throw new Error('Incorrect password');
    }
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = login;
