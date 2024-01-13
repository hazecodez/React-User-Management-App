const express = require("express");
const adminRoutes = express();
const adminController = require("../Controllers/adminController");

adminRoutes.post("/login", adminController.login);
adminRoutes.get('/loadUsers', adminController.loadUsers);
adminRoutes.post('/deleteUser', adminController.deleteUser)

module.exports = adminRoutes;
