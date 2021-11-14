const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost:27017/inotebook'
const dance="hello"
const connectToMongo = () => {
    mongoose.connect(mongoUri, () => {
        console.log("connection was successfully implied")
    });
}

module.exports = connectToMongo