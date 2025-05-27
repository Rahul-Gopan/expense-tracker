const mongoose = require('mongoose');

const ConnectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);

        console.log('Database connected successfully');
        
    } catch (error) {
        console.log(`Database connection failed ${error}`);
        throw new Error('Database connection failed');
    }
}

module.exports = ConnectToDB;