const mongoose = require("mongoose");
var schema = mongoose.Schema;

const DriverSchema = new schema({
    // _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    phoneno: {
        type: String,
        required: true
    },
    cartype: {
        type: String,
        required: true
    },
    carnumber: {
        type: String,
        required: true
    }
},{collation:"drivers"});
var collectionName = "drivers"
module.exports = mongoose.model('drivers', DriverSchema, collectionName);