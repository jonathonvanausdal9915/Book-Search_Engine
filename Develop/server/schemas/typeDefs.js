const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    _id: ID
     authors:[String]
    description: String!
    bookId: String!
    image: String!
    link: String!
    title: String!
  }

  input InputBook {
    bookId: String
    authors: [String]
    title: String
    description: String
    image: String
    link: String
  }


type User {
    _id: ID
    username:String!
    email:String!
    password:String!
    savedBooks:[Book]
    bookCount:Int
}


  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(newBook: InputBook!): User
    removeBook(postId: ID!): User
   
  }
`;

module.exports = typeDefs;
