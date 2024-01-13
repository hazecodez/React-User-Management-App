const User = require('../Models/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { securePassword } = require('../Config/bcryption')
require('dotenv').config()

exports.login = async(req,res) =>{
    try {
        const {email,password} = req.body;
        const exist = await User.findOne({ email : email});
        if(exist) {
            if(exist.is_Admin) {
                const compare = await bcrypt.compare(password,exist.password);
                if(compare) {
                    const token = jwt.sign(
                        {adminId : exist._id},
                        process.env.SECRET_TOKEN,
                        {expiresIn : "1h"}
                    )
                    res.json({ status: true , token , adminData: exist })
                }else {
                    res.json({ err: "password", alert : "Wrong password."})
                }
            } else {
                res.json({ err:"email", alert : "Enter valid Email Address."})
            }
        } else {
            res.json({ err:"email", alert: "Email not exist." })
        }
    } catch (error) {
        console.log(error.message);
    }
}