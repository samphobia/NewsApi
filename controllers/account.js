const { validationResult } = require('express-validator')

const Account = require('../models/account')
const User = require('../models/user')

exports.createAccount = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect');
    error.statusCode = 422;
    throw error
  }
  const accNo = Math.floor(1000000000 + Math.random() * 900000000000);
  const accBalance = Math.floor(0.00);
  const bvn = req.body.bvn;
  let accountUser;
  const account = new Account({
    accNumber: accNo,
    accBalance: accBalance,
    bvn: bvn,
    accountUser: req.userId
  });
  account
    .save()
    .tnen(result => {
      return User.findById(req.userId);
    })
    .then(user => {
      accountUser = user;
      user.account.push(account);
      return user.save();
    })
    .then(result => {
      res.status(200).json({
        message: 'Your Account was generated successfully',
        account: account,
        accountUser: {_id: account._id, name: accountUser.name}
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}