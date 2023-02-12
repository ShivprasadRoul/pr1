const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const UserResolvers = {
  Query: {
    async login(_, { username, password }) {
      try {
        const user = await User.findOne({ username });
        if (!user) {
          throw new Error('User not found');
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
          throw new Error('Incorrect password');
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        return {
          token,
          user,
        };
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    async signup(_, { username, email, password }) {
      try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          throw new Error('Username already taken');
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
          username,
          email,
          password: hashedPassword,
        });

        const result = await user.save();
        return result;
      } catch (error) {
        throw error;
      }
    },
  },
};

module.exports = UserResolvers;
