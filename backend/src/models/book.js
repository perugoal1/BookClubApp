const mongoose = require('mongoose');

const { Schema } = mongoose;
const UserSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    genre: {
        type: Array,
        required: [String],
    },
    author: {
        type: String,
        required: true,
    },
    published_year: {
        type: Date,
        required: true,
    },
    availability: {
        type: Number,
        required: true,
    },
    last_borrower: {
        type: mongoose.Schema.Types.ObjectId,
    },
    current_borrower: {
        type: mongoose.Schema.Types.ObjectId,
    },
});

const UserModel = mongoose.model('books', UserSchema, 'books');

module.exports = UserModel;
