const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up a route for the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Set up a route to fetch data from an API
app.get('/api/data', async (req, res) => {
    console.log('Hi');
    try {
        // Make an example API call (replace with your actual API endpoint)
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
        const data = await response.json();

        // Send the API data to the client
        res.json(data);
    } catch (error) {
        console.error('Error fetching API data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
