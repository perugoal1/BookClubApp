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

UserSchema.methods.matchPassword = async function matchPassword(password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error(error);
    }
};

const UserModel = mongoose.model('users', UserSchema, 'users');

module.exports = UserModel;
