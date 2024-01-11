//Database configuration
const Mongoose = require("./Config/mongoDB_Config");
Mongoose.Database();

const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Securing requests by cors
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

//Routes Setting
const userRoutes = require("./Routes/userRoutes");
const adminRoutes = require("./Routes/adminRoutes");

app.use("/", userRoutes);
app.use("/admin", adminRoutes);

app.listen(8000, () => {
  console.log(`Server running on ${"http://localhost:8000"}`);
});
