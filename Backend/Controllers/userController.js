const User = require("../Models/userModel");
const { securePassword } = require("../Config/bcryption");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");

exports.userRegistration = async (req, res) => {
  try {
    const { name, email, number, password } = req.body;
    const secPassword = await securePassword(password);
    const exist = await User?.findOne({ email: email });
    if (exist) {
      res.json({
        alert: "Given email is already exist, please login.",
        status: false,
      });
    } else {
      const user = new User({
        userName: name,
        email: email,
        mobile: number,
        password: secPassword,
      });

      const userData = await user.save();
      const token = jwt.sign(
        { userId: userData._id },
        process.env.SECRET_TOKEN,
        { expiresIn: "1h" }
      );
      res.json({ userData, alert: "registration", token, status: true });
    }
  } catch (error) {
    console.log(error.message);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const exist = await User?.findOne({ email: email });
    if (exist) {
      const compare = await bcrypt.compare(password, exist.password);
      if (compare) {
        let token = jwt.sign({ userId: exist._id }, process.env.SECRET_TOKEN, {
          expiresIn: "1h",
        });
        res.json({
          userLoginData: exist,
          status: true,
          err: null,
          token,
        });
      } else {
        res.json({
          err: "pass",
          alert: "Wrong password ! Enter valid password.",
        });
      }
    } else {
      res.json({
        err: "email",
        alert: "Account isn't exist, please register.",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

exports.imageUpload = async (req, res) => {
  const id = req.body.userId;
  const image = req.file.filename;
  const imageUpdate = await User.findOneAndUpdate(
    { _id: id },
    { $set: { image: image } },
    { new: true }
  ).then((response) => {
    res.json({ updated: true, data: response });
  });
};
