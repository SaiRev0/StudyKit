const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StickynoteSchema = new Schema({
    datata: String,
});

module.exports = mongoose.model("Stickynotes", StickynoteSchema);