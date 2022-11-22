const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    Users: async () => {
      return User.find().populate('books');
    },
    User: async (parent, { username }) => {
      return User.findOne({ username }).populate('books');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const profile = await User.findOne({ email });

      if (!profile) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(profile);

      return { token, profile };
    },
    saveBook: async (parent,args,context) => {
        if (context.user) {
            const updatedUser = await User.findByIdAndUpdate(
                { _id: context.user._id},
                { $addToSet: { savedBooks: args.input } },
                { new: true}
            );
            return updatedUser;
        }
        throw new AuthenticationError('You need to be logged ini!');
    },

    removeBook: async (parent,args,context) => {
        if (context.user) {
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id},
                { $pull: { savedBooks: { bookId: args.bookId } } },
                { new: true}
            );
            return updatedUser;
        }
        throw new AuthenticationError('You need to be logged ini!');
    }
}

};

module.exports = resolvers;
