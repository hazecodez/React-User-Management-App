const express = require("express");
const adminRoutes = express();
const adminController = require("../Controllers/adminController");

adminRoutes.post("/login", adminController.login);

module.exports = adminRoutes;
