const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    blogPosts:[BlogPost]
    thoughts: [Thought]!
  }

  type Park {
    _id: ID
    fullName: String
    parkCode: String
    state: String
    post: [BlogPost]!
  }

  type BlogPost {
    _id: ID
    postTxt: String
    postAuthor: String
    created: String
    # parkCode: String
    comments: [Comment]!
  }

  type Thought {
    _id: ID
    parkCode: String
    thoughtText: String
    thoughtAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me:  User
    users: [User]
    user(username: String!): User
    
    blogPosts(username: String): [BlogPost]
    blogPost(thoughtId: ID!): BlogPost
    
    thoughts(username: String): [Thought]
    thought(thoughtId: ID!): Thought
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    
    addBlogPost(parkCode: String!, blogPostText: String!, blogPostAuthor: String!): BlogPost
    addBlogComment(
      thoughtId: ID!
      commentText: String!
      commentAuthor: String!
      ): BlogPost
    removeBlogPost(blogPostId: ID!): BlogPost
    removeBlogComment(blogPostId: ID!, commentId: ID!): BlogPost
    
    addThought(parkCode: String!, thoughtText: String!, thoughtAuthor: String!): Thought
    addComment(
      thoughtId: ID!
      commentText: String!
      commentAuthor: String!
    ): Thought
    removeThought(thoughtId: ID!): Thought
    removeComment(thoughtId: ID!, commentId: ID!): Thought
  }
`;

module.exports = typeDefs;
