const mongoose = require('mongoose');

async function connectDB() {
    
    await mongoose.connect("mongodb+srv://manish:CY6pHEiZkSRtPMJ3@cluster0.5iijpxl.mongodb.net/halley")

    console.log("Connected to DB")

}

module.exports = connectDB