const mongoose = require('mongoose');
const colors = require('colors');

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB connected: ${mongoose.connection.host}`.bgCyan.white);
    } catch (error) {
        console.error(`Error: ${error.message}`.bgRed);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDb;
