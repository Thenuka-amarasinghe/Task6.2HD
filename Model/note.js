// Model/note.js
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  // Add more fields as needed
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
