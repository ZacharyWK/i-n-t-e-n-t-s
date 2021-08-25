const { AuthenticationError } = require('apollo-server-express');
const { User, Thought, BlogPost, Park } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('thoughts');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('thoughts');
    },
    thoughts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Thought.find(params).sort({ createdAt: -1 });
    },
    thought: async (parent, { thoughtId }) => {
      return Thought.findOne({ _id: thoughtId});
    },
    users: async () => {
      return User.find().populate('blogPosts');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('blogPosts');
    },
    blogPosts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return BlogPost.find(params).sort({ createdAt: -1 });
    },
    blogPost: async (parent, { blogPostId }) => {
      return BlogPost.findOne({ _id: blogPostId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('blogPosts');
      }
      throw new AuthenticationError('You are not logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },

    addBlogPost: async (parent, { blogPostTxt }, context) => {
      if (context.user) {
        const blogPost = await Blog.create({
          blogPostTxt,
          blogPostAuthor: context.user.email,
          blogPostAuthor: context.user.username,
          parkCode,
        });
  
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { blogPosts: blogPost._id } }
        );
  
        return blogPost;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addBlogComment: async (parent, { blogPostId, commentText, commentAuthor }) => {
      return Thought.findOneAndUpdate(
        { _id: blogPostId },
        {
          $addToSet: { comments: { commentText, commentAuthor } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removeBlogPost: async (parent, { blogPostId }) => {
      return BlogPost.findOneAndDelete({ _id: blogPostId });
    },
    removeBlogComment: async (parent, { blogPostId, commentId }) => {
      return BlogPost.findOneAndUpdate(
        { _id: blogPostId },
        { $pull: { comments: { _id: commentId } } },
        { new: true }
      );
    },


    addThought: async (parent, { parkCode, thoughtText, thoughtAuthor }) => {
      const thought = await Thought.create({ parkCode, thoughtText, thoughtAuthor });

      await User.findOneAndUpdate(
        { username: thoughtAuthor },
        { $addToSet: { thoughts: thought._id } },
        { $parkCode: parkCode}
      );

      return thought;
    },
    addComment: async (parent, { thoughtId, commentText, commentAuthor }) => {
      return Thought.findOneAndUpdate(
        { _id: thoughtId },
        {
          $addToSet: { comments: { commentText, commentAuthor } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removeThought: async (parent, { thoughtId }) => {
      return Thought.findOneAndDelete({ _id: thoughtId });
    },
    removeComment: async (parent, { thoughtId, commentId }) => {
      return Thought.findOneAndUpdate(
        { _id: thoughtId },
        { $pull: { comments: { _id: commentId } } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
