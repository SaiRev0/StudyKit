const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FlashcardSchema = new Schema({
    question: String,
    answer: String,
});

module.exports = mongoose.model("Flashcard", FlashcardSchema);