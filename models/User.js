const mongoose = require("mongoose");
const moment = require("moment");
var schema = mongoose.Schema;

const ProfileSchema = new schema({
    imageurl: {
        type: String
    }
}, { collection: "image" });

module.exports = mongoose.model('image', ProfileSchema);