// Controller/noteController.js
const Note = require('../Model/note.js');

// Example controller functions
const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Add more controller functions as needed

module.exports = {
  getAllNotes,
  // Add more exports as needed
};
