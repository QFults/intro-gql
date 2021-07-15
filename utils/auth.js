const jwt = require('jsonwebtoken')
const { User } = require('../models')

module.exports = {
  authMiddleware: async ({ req }) => {
    let token
    if (req.headers.authorization) {
      token = req.headers.authorization.split(' ').pop().trim()
    } else {
      return req
    }

    try {
      const { _id } = jwt.verify(token, process.env.SECRET, { maxAge: '2h' })
      const user = await User.findById(_id)
      req.user = user
    } catch (err) {
      console.log('Invalid Token')
    }
    return req
  },
  signToken: _id => jwt.sign({ _id }, process.env.SECRET, { expiresIn: '2h' })
}
