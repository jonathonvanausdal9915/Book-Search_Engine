const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    _id: ID
    authors:[Author]
    description: String!
    bookId: String!
    image: String!
    link: String!
    title: String!
  }

type User {
    _id: ID
    username:string!
    email:string!
    password:string!
    savedBooks:[bookSchema]
}
input savedBook {
    description: String
    title:String
    bookId:String
    image:String
    link:String
    authors: [String]
}

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user: [User]
    user(name: String!): User
    books(name: String): [Book]
    book(bookId: ID!): Book
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(input: savedBook!): User
    removeBook(postId: ID!): User
   
  }
`;

module.exports = typeDefs;
