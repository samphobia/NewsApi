const express = require('express');
const { body } = require('express-validator');

const User = require('../models/user');
const authController = require('../controllers/auth')

const router = express.Router();

// /**
//  * @swagger
//  * tags:
//  *  name: Authentication
//  *  description: login and SignUp User
//  */
/**
 * @swagger
 * /auth/signup:
 *  put:
 *    summary: creates a user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *              email:
 *                type: string
 *              password:
 *                type: string
 *    tags: [Authentication]
 *    responses: 
 *      200:
 *        description: created new user
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *      400:
 *        description: There was an error creating the news user
 * 
 */

router.put(
  '/signup',
  [
    body('firstName')
      .trim()
      .not()
      .isEmpty(),
    body('lastName')
      .trim()
      .not()
      .isEmpty(),
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, {req})  => {
        return User.findOne({email: value}).then(userDoc => {
          if (userDoc) {
            return Promise.reject('E-mail address already exist!');
          }
        })
      })
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({min: 8})
  ],
  authController.signup
)

/**
 * @swagger
 * /auth/login:
 *  post:
 *    summary: login user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *    tags: [Authentication]
 *    responses: 
 *      200:
 *        description: login user successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *      400:
 *        description: There was an error logging the user
 * 
 */

router.post('/login', authController.login)

module.exports = router;