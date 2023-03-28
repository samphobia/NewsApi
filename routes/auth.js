const express = require('express');
const { body } = require('express-validator');

const User = require('../models/User');
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
 *              fullName:
 *                type: string
 *              email:
 *                type: string
 *              phone:
 *                type: string
 *              password:
 *                type: string
 *              dOfBirth:
 *                type: string
 *              gender:
 *                type: string
 *              address:
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
    body('fullName')
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

 /**
  * @swagger
  * /auth/{id}:
  *  get:
  *    summary: gets User by id
  *    tags: [Authentication]
  *    parameters:
  *       - in: path
  *         name: id
  *         schema:
  *            type: array
  *            items:
  *               type: string
  *         required: true
  *         description: news Article ID
  *    responses: 
  *      200:
  *        description: User loaded successfully
  *        content:
  *          application/json:
  *            schema:
  *              type: object
  *      400:
  *        description: There was an error loading the User
  * 
  */

router.get('/:id', authController.getUser)

module.exports = router;