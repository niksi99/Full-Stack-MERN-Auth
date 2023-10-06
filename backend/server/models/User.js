const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    Username: {
        type: String,
        unique: true,
        required: true
    },
    Email: {
        type: String,
        unique: true,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    ProfilePhoto: {
        type: String,
        default: "https://cdn4.vectorstock.com/i/1000x1000/06/18/male-avatar-profile-picture-vector-10210618.jpg"
    }
})

UserSchema.pre("save", async function(next) {
    if(!this.isModified)
        next();

    this.Password = await bcrypt.hash(this.Password, 12);
})

module.exports = mongoose.model("User", UserSchema);