// const fs = require('fs');
// const path = require('path')
const { validationResult } = require('express-validator');

const { Account } = require('../models/Account')
const User = require('../models/User')

exports.createAccount = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect');
    error.statusCode = 422;
    throw error
  }
  const accNo = Math.floor(1000000000 + Math.random() * 900000000000).toString();
  // console.log(accNo)
  const accBalance = Math.floor(0.00).toString();
  const accType = req.body.accType
  const bvn = req.body.bvn;
  let accountUser 

  const account = new Account({
    accNumber: accNo,
    accBalance: accBalance,
    accType: accType,
    bvn: bvn,
    accountUser: req.user
  });
  account
    .save()
    .then(result => {
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

exports.fundAccount = (req, res, next) => {
  const errors = validationResult(req.body);
  if (!errors.isEmpty()) {
    const error = new Error('Please check details inputed');
    error.statusCode = 422;
    throw error
  }
  const accNumber = req.body.accNumber;
  const addAmount = req.body.addAmount;
  User.findOne({accNumber: accNumber, accBalance: accBalance})
  .then(account => {
    if (!account) {
      const error = new Error('Please enter valid Account details')
      error.statusCode = 404;
      throw error;
    }
    if (account.userId.toString() !== req.userId) {
      const error = new Error('Not authorized')
      error.statusCode = 401
      throw error
    }
    const accBalance = account.accBalance + addAmount
    accBalance = accBalance;
    return account.save()
  })
  .then(result => {
    res.status(200).json({
      data: account,
      status: 'Success',
      message: `Account ${account} was credited with ${addAmount}`
    })
  })
  .catch(err => {
    res.status(400).json({
      error: err,
      status: "Failed",
      message: "Error funding account"
    })
    next(err);
  })
  
}