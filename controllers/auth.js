const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
  const error = new Error('Validation failed.');
  error.statusCode = 422;
  error.data = errors.array();
  throw error;
}
const firstName =  req.body.firstName;
const lastName =  req.body.lastName;
const email = req.body.email;
const password = req.body.password;
bcrypt.hash(password, 12).then(hashedPw => {
  const user = new User({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashedPw,
  });
  return user.save()
})
.then(result => {
  res.status(201).json({
    user: result,
    status: 'SUCCESS',
    message: 'Registration completed successfully'
  })
})
.catch(err => {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  next(err)
})
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
        userId: loadedUser,
        status: 'SUCCESS',
        message: 'login successful'
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err);
    })
}