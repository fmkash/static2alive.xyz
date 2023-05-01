const mongoose = require('mongoose')
const UserService = require('./user/user.service')
const stripe = require('./stripe/connect')
const hasPlan = require('./middleware/hasPlan')


const UserSchema =  new mongoose.Schema(
	{
    email: { type: String, required: true, unique: true },
		username: { type: String, required: true, unique: true },
		password: { type: String, required: true },
    billingID: { type: String },
    plan: { type: String, enum: ['none', 'gold', 'fiamond', ], default: 'none' },
  hasTrial: { type: Boolean, default: false },
  endDate: { type: Date, default: null },
  role: { type: String, enum: ['banned', 'member', 'admin', ], default: 'member' },
	},
	{ collection: 'users' }
)


const model = mongoose.model('UserSchema', UserSchema)

module.exports = model