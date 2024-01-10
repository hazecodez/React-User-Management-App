const express = require('express');
const userRoutes = express()
const userController = require('../Controllers/userController')


userRoutes.get('/',userController.home)
userRoutes.post('/signup',userController.signup)


module.exports = userRoutes; 