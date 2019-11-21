const mongoose = require("mongoose");
const moment = require("moment");
var schema = mongoose.Schema;

const RidesSchema = new schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    cancel: {
        type: Boolean,
        required: Boolean
    },
    fare: {
        type: Number,
        required: true
    },
    time: {
        type: Date
    }
}, { collection: "Rides" });

module.exports = mongoose.model('rides', RidesSchema);