const express = require('express');
const userRoutes = express()
const userController = require('../Controllers/userController')
const {uploadOptions} = require('../Config/multer')


userRoutes.post('/signup',userController.userRegistration)
userRoutes.post('/login', userController.loginUser)
userRoutes.post('/imageUpload', uploadOptions.single('image') ,userController.imageUpload)


module.exports = userRoutes;