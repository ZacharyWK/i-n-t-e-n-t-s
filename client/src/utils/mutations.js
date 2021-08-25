import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_PARK = gql`
  mutation addPark($fullName:String!,$parkCode:String!,$state:String!){
    addPark(fullName:$fullName,parkCode:$parkCode,state:$state){
      _id
      fullName
      parkCode
      state
      blogPosts {
        _id
        commentText
      }
    }
  }
`

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_BLOGPOST = gql`
  mutation addBlogPost($blogText: String!, $blogAuthor: String!) {
    addBlogPost(blogPostText: $blogPostText, blogPostAuthor: $blogPostAuthor) {
      _id
      blogPostText
      blogPostAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_BLOGCOMMENT = gql`
  mutation addBlogComment(
    $blogPostId: ID!
    $commentText: String!
    $commentAuthor: String!
  ) {
    addComment(
      blogPostId: $blogPostId
      commentText: $commentText
      commentAuthor: $commentAuthor
    ) {
      _id
      blogPostText
      blogPostAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

export const ADD_THOUGHT = gql`
  mutation addThought($parkCode: String!, $thoughtText: String!, $thoughtAuthor: String!) {
    addThought(parkCode:$parkCode, thoughtText: $thoughtText, thoughtAuthor: $thoughtAuthor) {
      _id
      parkCode
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment(
    $thoughtId: ID!
    $commentText: String!
    $commentAuthor: String!
  ) {
    addComment(
      thoughtId: $thoughtId
      commentText: $commentText
      commentAuthor: $commentAuthor
    ) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
