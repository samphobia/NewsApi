const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  registerStatus: {
    type: String,
    default: 'Registered'
  },
  loginStatus: {
    type: String,
    default: 'Logged in'
  },
  account: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Account'
    }
  ],
  transactions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Transactions'
    }
  ]
},
{ timestamps: true}
);

module.exports = mongoose.model('User', userSchema)