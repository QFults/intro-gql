const { Item, User } = require('../models')
const { signToken } = require('../utils/auth.js')

const resolvers = {
  Query: {
    items: async () => await Item.find({}),
    item: async (parent, { _id }) => await Item.findById(_id)
  },
  Mutation: {
    addItem: async (parent, item) => await Item.create(item),
    markDone: async (parent, { _id, isDone }) => await Item.findByIdAndUpdate(_id, { $set: { isDone } }),
    deleteItem: async (parent, { _id }) => await Item.findByIdAndDelete(_id),
    register: async (parent, data) => {
      const user = await User.create(data)
      const token = signToken(user._id)
      return { token, user }
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email }).populate('items')
      if (user) {
        const correct = await user.isCorrectPassword(password)
        if (correct) {
          const token = signToken(user._id)
          return { token, user }
        }
      }
    }
  }
}

module.exports = resolvers
