const express = require('express')
const Router = express.Router()
const BlogController = require('../controllers/BlogController')
//postcontroller

const Authmiddlewares = require('../middleware/middleware')

             
Router.post('/createpost',Authmiddlewares,BlogController.createpost)
Router.get('/allposts',BlogController.getposts)
Router.put('/updatepost/:id',BlogController.updatepost)
Router.delete('/deletepost/:id',BlogController.deletepost)
//route path
module.exports = Router