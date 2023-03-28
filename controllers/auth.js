const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Account} = require('../models/Account')
const User = require('../models/User');

function generateAccountNumber() {
  const accountNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
  return accountNumber.toString();
}

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
  const error = new Error('Validation failed.');
  error.statusCode = 422;
  error.data = errors.array();
  throw error;
}

const fullName =  req.body.fullName;
const email = req.body.email
const phone = req.body.phone;
const password = req.body.password;
const dOfBirth = req.body.dOfBirth;
const gender = req.body.gender;
const address = req.body.address;
bcrypt.hash(password, 12).then(hashedPw => {
  const user = new User({
    fullName: fullName,
    email: email,
    phone: phone,
    password: hashedPw,
    dOfBirth: dOfBirth,
    gender: gender,
    address: address
  });
  return user.save()
  .then((savedUser)=> {
    const accNumber = generateAccountNumber()
    const account = new Account({accNumber, user: savedUser._id})
    return account.save()
  })
  .then(result => {
    return User.findById(req.userId)
  })
  .then(user => {
    user = user;
    user.account.push(account)
    return user.save()
  })
})
.then(user => {
  res.status(201).json({
    user: user,
    status: 'SUCCESS',
    message: 'Registration completed successfully'
  })
})
.catch(err => {
  res.status(402).json({
    error: err,
    status: "Failed",
    message: "please try signing in again"
  })
  next(err)
});
}

exports.login = (req, res, next) => { 
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  User.findOne({email: email})
    .then(user => {
      if (!user) {
        const error = new Error('A user with this email could not be found.');
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password)
    })
    .then(isEqual  => {
      if (!isEqual) {
        const error = new Error('Wrong password');
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString()
        },
        'denukanfinanceapp',
        { expiresIn: 60 * 5 }
      );
      res.status(200).json({
        token: token, 
        user: loadedUser,
        status: 'SUCCESS',
        message: 'login successful'
      });
    })
    .catch(err => {
      res.status(402).json({
        error: err,
        status: "Failed",
        message: "please try login in again"
      })
      next(err)
    });
}

exports.getUser = (req, res, next) => {
  if(req.params.id){
    const Id = req.params.id
    User.findById({_id: Id})
    .then(user => {
    res.status(200).json({
      user: user,
      status: "Success",
      message: "User Loaded Successfully"
    })
  })
  .catch(err => {
    console.log(err)
    res.status(402).json({
      status: "Failed loading article",
      message: "user not found"
    })
  })
  }
  
  }