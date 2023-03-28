const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  // lastName: {
  //   type: String,
  //   required: true
  // },
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
  dOfBirth: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true,
    default: 'Male or Female'
  },
  address: {
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
  ]
},
{ timestamps: true}
);

module.exports = mongoose.model('User', userSchema)