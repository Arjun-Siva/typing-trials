const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const arenaSchema = new Schema({
    arena_id: {
        type: String,
        required: true
    },
    owner_id: {
        type: String,
        required: true
    },
    owner_name: {
        type: String,
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model('Arena', arenaSchema);