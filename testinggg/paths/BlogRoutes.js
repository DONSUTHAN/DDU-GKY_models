const express = require ('express')
const path = express.Router()
const userContoller = require('../controllers/userContoller')

path.post('/create',userContoller.CreateBlog)
path.get('/allpost',userContoller.getposts)
path.put('/update',userContoller.updatepost)
path.delete('/delete',userContoller.Deletepost)

module.exports = path