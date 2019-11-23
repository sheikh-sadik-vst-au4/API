var mongoose = require("mongoose");

// Get the Schema constructor
var Schema = mongoose.Schema;

// Using Schema constructor, create a ProductSchema
var USerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phoneno: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    rides: [{
        type: Schema.Types.ObjectId,
        ref: 'ride'
    }]
}, { collection: "user" });

// Create model from the schema
module.exports = mongoose.model("user", USerSchema);