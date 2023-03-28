const express = require('express');
const { body } = require('express-validator');

const accountController = require('../controllers/account')

const router = express.Router()
/**
 * @swagger
 * tags:
 *  name: Account
 *  description: Account microservices
 */

/**
 * @swagger
 * /account/createAccount:
 *  post:
 *    summary: create account number
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              bvn:
 *                type: string
 *              accType:
 *                type: string
 *    tags: [Account]
 *    responses: 
 *      200:
 *        description: Account created successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *      400:
 *        description: There was an error creating account
 * 
 */


router.post(
  '/createAccount',
  [
    body('bvn')
      .trim()
      .isLength({min: 11 })
  ],
  accountController.createAccount
)

/**
 * @swagger
 * /account/fundAccount:
 *  post:
 *    summary: Fund account 
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              accNumber:
 *                type: string
 *              addAmount:
 *                type: string
 *    tags: [Account]
 *    responses: 
 *      200:
 *        description: Account funded successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *      400:
 *        description: There was an error funding account
 * 
 */

router.post('/fundAccount', accountController.fundAccount)

module.exports = router;