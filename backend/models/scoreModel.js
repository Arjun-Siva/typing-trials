const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scoreSchema = new Schema({
    speed:{
        type: Number,
        required: true
    },
    accuracy:{
        type: Number,
        required: true
    },
    user_id:{
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Score', scoreSchema);
