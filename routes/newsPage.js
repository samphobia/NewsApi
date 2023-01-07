const express = require('express');

const newsPageController = require('../controllers/newsPage')

const router = express.Router()

// router.get('/add-newsArticle', newsPageController.getAddNewsArticle)
// /**
//  * @swagger
//  * components:
//  *  securitySchemes:
//  *    bearerAuth:
//  *      type: http
//  *      scheme: bearer
//  *      bearerFormat: JWT
//  *      
//  *      
//  *    
//  */

/**
 * @swagger
 * components:
 *  schemas:
 *    News Articles:
 *      type: object
 *      required:
 *        - Title
 *        - imageUrl
 *        - details
 *        - date
 *      properties:
 *        firstName:
 *          type: string
 *          description: first name of user
 *        lastName:
 *          type: string
 *          description: first name of user
 *        email:
 *          type: string
 *          description: first name of user
 *        password:
 *          type: string
 *          description: first name of user
 *      
 */

/**
 * @swagger
 * tags:
 *  name: News Article
 *  description: create and read news articles
 */

/**
 * @swagger
 * /news/newsArticle:
 *  get:
 *    summary: Get all new Article
 *    tags: [News Article]
 *    responses: 
 *      200:
 *        description: Get all News Articles
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 * 
 */

router.get('/newsArticle', newsPageController.getNewsArticle)

/**
 * @swagger
 * /news/add-newsArticle:
 *  post:
 *    summary: creates a news Article
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *              imageUrl:
 *                type: string
 *              details:
 *                type: string
 *              date:
 *                type: string
 *    tags: [News Article]
 *    responses: 
 *      200:
 *        description: created new article
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *      400:
 *        description: There was an error creating the news Article
 * 
 */

router.post('/add-newsArticle', newsPageController.postAddNewsArticle)

/**
 * @swagger
 * tags:
 *  name: News Article
 *  description: create and read news articles
 */

/**
 * @swagger
 * /news/newsArticle:
 *  get:
 *    summary: Get all new Article
 *    tags: [News Article]
 *    responses: 
 *      200:
 *        description: Get all News Articles
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *      400:
  *        description: There was an error loading all news Article
 * 
 */

 router.get('/newsArticle', newsPageController.getNewsArticle)

 /**
  * @swagger
  * /news/{id}:
  *  get:
  *    summary: gets article by id
  *    tags: [News Article]
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
  *        description: article loaded successfully
  *        content:
  *          application/json:
  *            schema:
  *              type: object
  *      400:
  *        description: There was an error loading the news Article
  * 
  */

router.get('/:id', newsPageController.getNewsArticleId )

module.exports = router;