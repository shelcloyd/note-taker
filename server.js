const express = require('express');
const path = require('path');
const fs = require('fs');
const api = require('./routes/index');
const notes = require('./routes/notes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
app.use(express.static('public'));

// route for homepage
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// route for notes page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// route for 404 page
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/pages/404.html'))
);

// listen() listens on specified port 
app.listen(PORT, () =>
    console.log(`listening at http://localhost:${PORT}`)
);
