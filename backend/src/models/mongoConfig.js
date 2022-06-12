const mongoose = require('mongoose');

function initMongoose() {
    const { MONGO_URL, MONGO_USERNAME, MONGO_PASSWORD, MONGO_DB } = process.env;
    mongoose.connect(`mongodb://${MONGO_URL}:27017/${MONGO_DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        auth: {
            username: MONGO_USERNAME,
            password: MONGO_PASSWORD,
        },
        authSource: 'admin',
    });

    const db = mongoose.connection;

    db.on('error', () => {
        console.error('could not connect');
    });
    db.once('open', () => {
        console.error('Successfully connected to database');
    });
}

module.exports = initMongoose;
