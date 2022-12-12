const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastNmae: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  Account: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Account'
    }
  ]
},
{ timestamps: true}
);

module.exports = mongoose.model('User', userSchema)