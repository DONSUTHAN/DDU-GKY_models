const express = require('express')
const Router = express.Router()
const BlogController = require('../controllers/BlogController')
<<<<<<< HEAD:React/backend/routes/BlogRoutes.js
// const Authmiddlewares = require('../middleware/middleware')
=======
//postcontroller

const Authmiddlewares = require('../middleware/middleware')
>>>>>>> 435aaa046e14fa7f91a8ab39ae759f62b81fa220:BACKING-backend/backend/routes/BlogRoutes.js


Router.post('/createpost',Authmiddlewares,BlogController.createpost)
Router.get('/allposts',BlogController.getposts)
Router.put('/updatepost/:id',BlogController.updatepost)
Router.delete('/deletepost/:id',BlogController.deletepost)
//route path
<<<<<<< HEAD:React/backend/routes/BlogRoutes.js
// Router.post('/create post',Authmiddlewares,BlogController.createpost)

=======
>>>>>>> 435aaa046e14fa7f91a8ab39ae759f62b81fa220:BACKING-backend/backend/routes/BlogRoutes.js
module.exports = Router