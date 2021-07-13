const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const { typeDefs, resolvers } = require('./schemas')

const app = express()

const server = new ApolloServer({ typeDefs, resolvers })

server.applyMiddleware({ app })

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

require('./db')
  .then(() => app.listen(process.env.PORT || 3001))
