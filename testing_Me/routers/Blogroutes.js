const express = require ('express')
const Router = express.Router()
const BlogController = require('../controller/BlogController')
Router.post('./createpost',BlogController.createpost)
Router.get('./allpost',BlogController.getposts)
Router.put('./updatepost',BlogController.updatepost)

module.exports = Router