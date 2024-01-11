const User = require("../Models/userModel");
const { securePassword } = require("../Config/bcryption");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.userRegistration = async (req, res) => {
  try {
    const { name, email, number, password } = req.body;
    const secPassword = await securePassword(password);
    const exist =  await User?.findOne({ email: email });
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
      res.json({ userData, alert: "registration" , token , status: true })
    }
  } catch (error) {
    console.log(error.message);
  }
};
