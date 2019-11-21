const mongoose = require("mongoose");
var schema = mongoose.Schema;

const DriverSchema = new schema({
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
},{collection:"drivers"});

module.exports = mongoose.model('drivers', DriverSchema);