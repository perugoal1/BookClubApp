const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;
const MakerCheckerSchema = new Schema({
    type: { // Its user now, addtional items can be added later like books
        type: String,
        required: true,
    },
    action: { // It can be create, delete or update
        type: String,
        required: true,
    },
    data: {
        type: Schema.Types.Mixed,
    },
    itemId : {
        type: mongoose.Schema.Types.ObjectId,
    },
    primary_admin : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }
});

MakerCheckerSchema.pre('save', async function saveUser(next) {
    try {
        // check method of registration
        const user = this;
        if (!user.isModified('data.password')) next();
        // generate salt
        const salt = await bcrypt.genSalt(10);
        // hash the password
        const hashedPassword = await bcrypt.hash(this.data.password, salt);
        // replace plain text password with hashed password
        this.data.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

const MakerCheckerModel = mongoose.model('makerChecker', MakerCheckerSchema, 'makerChecker');

module.exports = MakerCheckerModel;
