const express = require('express')
const Router = express.Router()
const BlogController = require('../controllers/BlogController')


Router.post('/createblog',BlogController.createBlog)

module.exports = Router