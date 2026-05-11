const express = require('express')
const Router = express.Router()
const BlogController = require('../controllers/BlogController')

Router.post('/createpost',BlogController.createpost)
Router.get('/getpost',BlogController.getpost)
Router.put('/update/:id',BlogController.updatepost)
Router.delete('/delete/:id',BlogController.deletepost)

module.exports = Router