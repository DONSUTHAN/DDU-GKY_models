const express = require('express')
const Router = express.Router()
const BlogController = require('../controllers/BlogController')
const Authmiddlewares = require('../middleware/middleware')


Router.post('/createpost',BlogController.createpost)
Router.get('/allposts',BlogController.getposts)
Router.put('/updatepost/:id',BlogController.updatepost)
Router.delete('/deletepost/:id',BlogController.deletepost)
//route path
Router.post('/create post',Authmiddlewares,BlogController.createpost)

module.exports = Router