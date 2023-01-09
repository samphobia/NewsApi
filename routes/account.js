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

router.put('/account/fundAccount', accountController.fundAccount)

module.exports = router;