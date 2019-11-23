const mongoose = require("mongoose");
const moment = require("moment");
var schema = mongoose.Schema;

const UserSchema = new schema({
    name: {
        type: String
    },
    phoneno: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
}, { collection: "user"});

module.exports = mongoose.model('user', UserSchema);