const { Item } = require('../models')

const resolvers = {
  Query: {
    items: async () => await Item.find({}),
    item: async (parent, { _id }) => await Item.findById(_id)
  },
  Mutation: {
    addItem: async (parent, item) => await Item.create(item),
    markDone: async (parent, { _id, isDone }) => await Item.findByIdAndUpdate(_id, { $set: { isDone } }),
    deleteItem: async (parent, { _id }) => await Item.findByIdAndDelete(_id)
  }
}

module.exports = resolvers
