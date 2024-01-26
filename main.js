const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/', express.static(path.join(__dirname, '')));
app.use('/game', express.static(path.join(__dirname, 'game')));

// Set up a route for the main portfolio page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

function getValueByTag(tag, jsonData) {
    return jsonData.tag;
}

app.get('/game/:tag', async (req, res) => {
    const tag = req.params.tag;

    try {
        // Make the Clash API call
        const response = await fetch('https://api.clashofclans.com/v1/players/%23PYJCLCRLJ', {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjQ3ZTgxZjdiLWUwNDUtNDY3MC1hMTQ3LWNkODgyNzM2NTgxZiIsImlhdCI6MTcwNjI4Mjc2MSwic3ViIjoiZGV2ZWxvcGVyLzUwZDNlYTVlLTJlOTYtOWMzZC1iODljLTBiM2NmNjQ2OTNiMCIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjExNy4yMjAuMTc3LjIxNiJdLCJ0eXBlIjoiY2xpZW50In1dfQ.oEk0ZemUr-Gu8Q4kt9nMo-gH0pLwvdsNaZIhOGihfdvcYgzjSsfTA1H_kyCmi4jcxVcWM5Y78gQiFGQLlExEfQ',
            },
        });

        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON response
        const playerData = await response.json();

        // Extract the desired value based on the provided tag
        const extractedValue = getValueByTag(tag, playerData);

        // Send the extracted value to the client
        res.send(extractedValue);
    } catch (error) {
        console.error('Error handling Clash API response:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Set up a route for the game page
app.get('/gamer', async (req, res) => {
    // res.sendFile(path.join(__dirname, 'game/index.html'))
    console.log('Request received for /game'); 
    try {
        // Make the Clash API call
        const response = await fetch('https://api.clashofclans.com/v1/players/%23PYJCLCRLJ', {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjQ3ZTgxZjdiLWUwNDUtNDY3MC1hMTQ3LWNkODgyNzM2NTgxZiIsImlhdCI6MTcwNjI4Mjc2MSwic3ViIjoiZGV2ZWxvcGVyLzUwZDNlYTVlLTJlOTYtOWMzZC1iODljLTBiM2NmNjQ2OTNiMCIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjExNy4yMjAuMTc3LjIxNiJdLCJ0eXBlIjoiY2xpZW50In1dfQ.oEk0ZemUr-Gu8Q4kt9nMo-gH0pLwvdsNaZIhOGihfdvcYgzjSsfTA1H_kyCmi4jcxVcWM5Y78gQiFGQLlExEfQ',
            },
        });

        // Check if the response is successful
        if (response.ok) {
            const playerData = await response.json();
            const warStars = playerData.warStars;

            // Send the extracted value to the client
            res.json({ warStars });
        }
    } catch (error) {
        console.error('Error handling Clash API response:', error);
        res.end('Error handling Clash API response');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
