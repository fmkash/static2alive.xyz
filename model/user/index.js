const userserv = require('./user.model')
const UserService = require('./user.service')

module.exports = UserService(userserv)