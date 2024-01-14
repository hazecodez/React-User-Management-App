const express = require("express");
const adminRoutes = express();
const adminController = require("../Controllers/adminController");

adminRoutes.post("/login", adminController.login);
adminRoutes.get("/loadUsers", adminController.loadUsers);
adminRoutes.post("/deleteUser", adminController.deleteUser);
adminRoutes.post("/loadEditUser", adminController.loadEditUser);
adminRoutes.post("/updateUser", adminController.updateUser);
adminRoutes.post("/addUser", adminController.addUser);

module.exports = adminRoutes;
