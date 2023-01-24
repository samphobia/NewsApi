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
      requied: true
    },
    accType: {
      type: String,
      requied: true
    },
    bvn: {
      type: String,
      required: true
    },
    accountUser: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
},
{ timestamps: true}
);

const Account = mongoose.model('Account', accountSchema);

exports.Account = Account 