const User = require('../models/User')

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