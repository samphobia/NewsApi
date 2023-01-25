const User = require("../models/user")
const Transactions = require("../models/transactions")
const Account = require("../models/account")

exports.transactionOut = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
  const error = new Error('Validation failed.');
  error.statusCode = 422;
  error.data = errors.array();
  throw error;
  }
  try {
    const sender =  await User.findOne(req.body.userId);
    const receiver =  await Account.findOne(req.body.transactionTo);
    const amount = req.body.amount;

    if (sender.accBalance < amount) {
      return res.status(400).json({
        status: "Transaction Failed",
        message: "Insufficient funds"
      })
    }

    sender.accBalance -= amount
    await sender.save()

    receiver.accBalance += amount
    await receiver.save()

    const transaction = new Transactions({
      transactionType: "Debit",
      transactionstatus: "Success",
      amount: amount,
      transactionTo: receiver
    })
    return transaction.save()

    res.status(200).json({
      transaction: transaction,
      status: "Success",
      message: "Transfer successful"
    })
  } catch (err) {
    res.status(500).json({
      transaction: transaction,
      status: "Failed",
      message: "Transfer declined"
    })
  }
}