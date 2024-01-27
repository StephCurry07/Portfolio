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
app.get('/coc', async (req, res) => {
    // res.sendFile(path.join(__dirname, 'game/index.html'))
    // console.log('Request received for /game'); 
    try {
        // Make the Clash API call
        const response = await fetch('https://api.clashofclans.com/v1/players/%23PYJCLCRLJ', {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImQwNDRiZjNkLTFjOWQtNDljZi1iZjAzLTRlOTdlZGMxMzAwNSIsImlhdCI6MTcwNjM1NTkwOCwic3ViIjoiZGV2ZWxvcGVyLzUwZDNlYTVlLTJlOTYtOWMzZC1iODljLTBiM2NmNjQ2OTNiMCIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjExNy4yMDYuMjA0LjE3MSJdLCJ0eXBlIjoiY2xpZW50In1dfQ.B_m6idBwEQTtX2-FTG9sktFkGrG5y989Ixwv1ficLqeAqSKo1Sx_Q8ttA9I2JyPVdAuKC6ddXB-ZEcU7cOGd4g',
            },
        });

        // Check if the response is successful
        if (response.ok) {
            const playerData = await response.json();
            res.send(playerData);
        }
    } catch (error) {
        console.error('Error handling Clash API response:', error);
        res.end('Error handling Clash API response');
    }
});

app.get('/bs', async (req, res) => {
    // console.log('Request received for /game'); 
    try {
        const response = await fetch('https://api.brawlstars.com/v1/players/%238CLCU9QP', {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjVlOTM5ZWJiLWQzZmUtNDU2MC1hYjRjLTUyNzVkMjA0YzAzOSIsImlhdCI6MTcwNjM4NTE3MCwic3ViIjoiZGV2ZWxvcGVyL2Y5N2I5MDAyLTAxYjQtNmQ1Yy04YWQ4LTg0ZTRkNGU0YTM5ZCIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiMTE3LjIwNi4yMDQuMTcxIl0sInR5cGUiOiJjbGllbnQifV19.XLAqF_kn0NmCRKFbMYZ1kCQJh7rmZO68guLAz-etmVT8gAkfcrEIT43u65Eavn26vE1cJFAYzL11aQnXSjPByg',
            },
        });

        if (response.ok) {
            const playerData = await response.json();
            res.send(playerData);
        }
    } catch (error) {
        console.error('Error handling BS API response:', error);
        res.end('Error handling BS API response');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
