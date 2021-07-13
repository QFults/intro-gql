const { Item } = require('../models')

const resolvers = {
  Query: {
    items: async () => await Item.find({}),
    item: async (parent, { _id }) => await Item.findById(_id)
  }
}

module.exports = resolvers
