const mongoose = require("mongoose");
const moment = require("moment");
var schema = mongoose.Schema;

const RideSchema = new schema({

    username: { type: schema.Types.ObjectId, ref: 'user' },

    ride: [{
        time:Date,
        to:String,
        from:String,
        cancel:Boolean,
        fare:Number
    }]
    
}, { collection: "ride" });

module.exports = mongoose.model('ride', RideSchema);
