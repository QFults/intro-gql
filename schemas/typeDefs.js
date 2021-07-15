const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type Item {
    _id: ID!
    text: String!
    isDone: Boolean!
  }
  type User {
    _id: ID!
    name: String!
    email: String!
    items: [Item!]
  }
  type Auth {
    token: ID!
    user: User!
  }
  type Query {
    items: [Item!]!
    item(_id: ID!): Item!
  }
  type Mutation {
    addItem(text: String!, isDone: Boolean!): Item!
    markDone(_id: ID!, isDone: Boolean!): Item
    deleteItem(_id: ID!): Item!
    register(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`

module.exports = typeDefs
