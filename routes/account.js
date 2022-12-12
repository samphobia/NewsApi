const express = require('express');
const { body } = require('express-validator');

const accountController = require('../controller/account')

const router = express.Router()

router.post(
  '/account',
  [
    body('bvn')
      .trim()
      .isLength({min: 11, max: 11 })
  ],
  accountController.createAccount
)