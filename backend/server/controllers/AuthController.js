const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.Register = async(req, res) => {
    const newUser = await User.create(req.body);
    try {
        res.json({
            succes: true,
            newUser
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

module.exports.Login = async(req, res) => {

    const { Email, Password } = req.body
    const registeredUser = await User.findOne({Email})
    console.log(registeredUser)

    if(!registeredUser) {
        res.json({
            success: false,
            message: 'User not found'
        })
    }

    const isPasswordValid = await bcrypt.compare(Password, registeredUser.Password);
    if(!isPasswordValid) {
        res.json({
            success: false,
            message: 'Wrong credentials'
        })
    }

    const access_token = jwt.sign(
        {id: registeredUser.id, email: registeredUser.Email},
        process.env.JWT_SECRET,
        {expiresIn: 300}
    )

    try {
        res.cookie("access_token", access_token, {
            httpOnly: true,
            maxAge: 5 * 60 * 1000
        });

        res.json({
            success: true,
            access_token
        })

    } catch (error) {
        res.json({
            succes: false,
            message: error.message
        })
    }
}