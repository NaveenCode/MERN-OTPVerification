const mongoose = require("mongoose");
require('colors');
const connect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB connected: ${conn.connection.host}`.blue);

    } catch (error) {
        console.log('Error:Failed to connect mongodb', error)
    }
}

module.exports = connect;