const express = require('express');
const userRoutes = express()
const userController = require('../Controllers/userController')


userRoutes.post('/signup',userController.userRegistration)


module.exports = userRoutes; 