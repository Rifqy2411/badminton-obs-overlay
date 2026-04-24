const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'scoreboard.json');

app.use(cors());
app.use(express.json());

// Get player names
app.get('/api/scoreboard', (req, res) => {
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) {
            return res.json({ playername1: '', playername2: '' });
        }
        try {
            const json = JSON.parse(data);
            res.json(json);
        } catch (e) {
            res.json({ playername1: '', playername2: '' });
        }
    });
});

// Set player names
app.post('/api/scoreboard', (req, res) => {
    const { playername1, playername2 } = req.body;
    const data = { playername1: playername1 || '', playername2: playername2 || '' };
    fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), err => {
        if (err) return res.status(500).json({ error: 'Failed to save' });
        res.json({ success: true });
    });
});

app.listen(PORT, () => {
    console.log(`Scoreboard server running on http://localhost:${PORT}`);
});
