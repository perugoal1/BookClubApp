const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    approved: {
        type: Boolean,
        required: true,
    },
    role: {
        // can be 'admin', editor or 'member'
        type: String,
        required: true,
    },
    date_joined: {
        type: Date,
        required: true,
    },
});

UserSchema.pre('save', async function saveUser(next) {
    try {
        // check method of registration
        const user = this;
        if (!user.isModified('password')) next();
        // generate salt
        const salt = await bcrypt.genSalt(10);
        // hash the password
        const hashedPassword = await bcrypt.hash(this.password, salt);
        // replace plain text password with hashed password
        this.password = hashedPassword;
        next();
    } catch (error) {
        console.log(21312);
        return next(error);
    }
});

UserSchema.methods.matchPassword = async function matchPassword(password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error(error);
    }
};

const UserModel = mongoose.model('users', UserSchema, 'users');

module.exports = UserModel;
