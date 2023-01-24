const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const transactionsSchema = new Schema(
  {
    transactionType: {
      type: String,
      required: true,
    },
    transactionStatus: {
      type: String,
      requied: true
    },
    amount: {
      type: String,
      requied: true
    },
    transactionTo: {
      type: String,
      required: true
    },
    transactionUser: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
},
{ timestamps: true}
);

const Transactions = mongoose.model('Transactions', transactionsSchema);

exports.Transactions = Transactions 