const User = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { securePassword } = require("../Config/bcryption");
require("dotenv").config();

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const exist = await User?.findOne({ email: email });
    if (exist) {
      if (exist.is_Admin) {
        const compare = await bcrypt.compare(password, exist.password);
        if (compare) {
          const token = jwt.sign(
            { adminId: exist._id },
            process.env.SECRET_TOKEN,
            { expiresIn: "1h" }
          );
          res.json({ status: true, token, adminData: exist });
        } else {
          res.json({ err: "password", alert: "Wrong password." });
        }
      } else {
        res.json({ err: "email", alert: "Enter valid Email Address." });
      }
    } else {
      res.json({ err: "email", alert: "Email not exist." });
    }
  } catch (error) {
    console.log(error.message);
  }
};

exports.loadUsers = async (req, res) => {
  try {
    const userData = await User?.find({ is_Admin: false });
    if (userData) {
      res.json({ status: true, userData });
    } else {
      res.json({ status: false });
    }
  } catch (error) {
    console.log(error.message);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User?.deleteOne({ _id: req.body.userId });
    if (deleted) {
      res.json({ status: true });
    } else {
      res.json({ status: false });
    }
  } catch (error) {
    console.log(error.message);
  }
};

exports.loadEditUser = async (req, res) => {
  try {
    const id = req.body.id;
    const userData = await User?.findOne({ _id: id });
    if (userData) {
      res.json({ userData: userData });
    } else {
      res.json({ status: false });
    }
  } catch (error) {
    console.log(error.message);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updated = await User?.findOneAndUpdate(
      { _id: req.body.id },
      {
        $set: {
          email: req.body.email,
          mobile: req.body.number,
          userName: req.body.name,
        },
      }
    );
    if (updated) {
      res.json({ updated, status: true, message: "Updated successfully !" });
    } else {
      res.json({ status: false });
    }
  } catch (error) {
    console.log(error.message);
  }
};

exports.addUser = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body.userData;
    const exist = await User?.findOne({ email: email });
    if (exist) {
      res.json({ err: "email", message: "Given email is already taken." });
    } else {
      const secPass = await securePassword(password);
      const user = new User({
        userName: name,
        email: email,
        mobile: mobile,
        password: secPass,
      });
      const updated = await user.save();
      if (updated) {
        let token = jwt.sign(
          { userId: updated._id },
          process.env.SECRET_TOKEN,
          { expiresIn: "1h" }
        );
        res.json({ updated, token, message: "Added successfully !!" });
      } else {
        res.json({ message: "Uh-Oh something went wrong !" });
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};
