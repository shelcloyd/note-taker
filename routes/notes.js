const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
    readFromFile,
    readAndAppend,
    writeToFile,
} = require('../helpers/fsUtils');

// get route for retrieving all notes
notes.get('/api/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// delete route for a specific note
notes.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        const result = json.filter((note) => note.id !== id);

        writeToFile('./db/db.json', result);

        res.json(`Note ${noteId} has been deleted`);
    });
});

// post route for a new note
notes.post('/api/notes', (req, res) => {
    console.log(req.body);
    const {
        title,
        text
    } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };
        
        readAndAppend(newNote, './db/db.json');
        res.json('Note added successfully');
    } else {
        res.error('Error adding note')
    }
});

module.exports = notes;

