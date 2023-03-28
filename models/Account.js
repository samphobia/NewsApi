const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const accountSchema = new Schema(
  {
    accNumber: {
      type: String,
      required: true,
    },
    accBalance: {
      type: String,
      default: '0.00'
    },
    accType: {
      type: String,
      default: 'savings'
    },
    // bvn: {
    //   type: String,
    //   required: true
    // },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
   },
},
{ timestamps: true}
);

const Account = mongoose.model('Account', accountSchema);

exports.Account = Account 
