const axios = require('axios');

const apiKey = 'YOUR_API_KEY';
const playerId = 'PLAYER_ID';

axios.get(`https://api.clashofclans.com/v1/players/${playerId}`, {
  headers: {
    Authorization: `Bearer ${apiKey}`,
    Accept: 'application/json',
  },
})
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error);
  });