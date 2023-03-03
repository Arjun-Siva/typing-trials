const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const paragraphSchema = new Schema({
    data: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Paragraph', paragraphSchema);