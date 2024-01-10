const User = require('../Models/userModel')
const { securePassword } = require('../Config/bcryption')

exports.home = async (req,res) =>{
    try {
        res.send('Hello world')
    } catch (error) {
        
    }
}

exports.signup = async(req,res)=>{
    try {
        console.log(req.body);
        const {userName,email,password,mobile} = req.body;
        const hashPassword = await securePassword(password)
        console.log(hashPassword);
        const userData = new User({
            userName:userName,
            mobile:mobile,
            password:hashPassword,
            email:email
        })
        await userData.save()
    } catch (error) {
        console.log(error.message);
    }
}
