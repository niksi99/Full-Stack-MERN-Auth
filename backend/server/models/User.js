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
    }
})

UserSchema.pre("save", async function(next) {
    if(!this.isModified)
        next();

    this.Password = await bcrypt.hash(this.Password, 12);
})

module.exports = mongoose.model("User", UserSchema);