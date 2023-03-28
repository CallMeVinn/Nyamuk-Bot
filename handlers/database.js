const mongoose = require("mongoose");

exports.load = () => {
    mongoose.connect(process.env.MongoURL).catch(console.error);
}