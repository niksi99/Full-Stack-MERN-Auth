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
            expiresIn: 5 * 60 * 1000
        }).json({
            success: true,
            access_token
        });

    } catch (error) {
        res.json({
            succes: false,
            message: error.message
        })
    }
}

module.exports.GoogleOath = async(req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password: hashedPassword, ...rest } = user._doc;
            const expiryDate = new Date(Date.now() + 3600000); // 1 hour
            res
            .cookie('access_token', token, {
                httpOnly: true,
                expires: expiryDate,
            })
            .status(200)
            .json(rest);
        } else {
          const generatedPassword =
            Math.random().toString(36).slice(-8) +
            Math.random().toString(36).slice(-8);
          const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
          const newUser = new User({
            Username:
              req.body.name.split(' ').join('').toLowerCase() +
              Math.random().toString(36).slice(-8),
            Email: req.body.email,
            Password: hashedPassword,
            ProfilePhoto: req.body.photo,
          });
          await newUser.save();
          const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
          const { password: hashedPassword2, ...rest } = newUser._doc;
          const expiryDate = new Date(Date.now() + 3600000); // 1 hour
          res
            .cookie('access_token', token, {
              httpOnly: true,
              expires: expiryDate,
            })
            .status(200)
            .json(rest);
        }
      } catch (error) {
        next(error);
      }
}