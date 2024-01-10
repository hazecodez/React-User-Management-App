require("dotenv").config();
const mongoose = require("mongoose");

module.exports = {
  Database: () => {
    mongoose
      .connect(process.env.MongoDB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => {
        console.log("Database Connected");
      })
      .catch((error) => {
        console.log("Error occured:", error);
      });
  },
};
