import mongoose from 'mongoose';

const { MONGO_URL, MONGO_USERNAME, MONGO_PASSWORD, MONGO_DB } = process.env;

mongoose.connect(`mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_URL}:27017/${MONGO_DB}`);

export default mongoose;