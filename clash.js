
fetch('https://api.clashofclans.com/v1/clans/{clanTag}', {
    headers: {
        'Authorization': 'Bearer YOUR_API_KEY',
        'Accept': 'application/json',
    }
})
.then(response => response.json())
.then(data => {
    // Display the data on the web page
    displayClashData(data);
})
.catch(error => console.error('Error fetching Clash API:', error));

// Function to display Clash data on the web page
function displayClashData(data) {
    const clashDataElement = document.getElementById('clashData');
    
    // Customize the display based on your needs
    clashDataElement.innerHTML = `
        <h1>Clash of Clans Clan Info</h1>
        <p>Clan Name: ${data.name}</p>
        <p>Clan Level: ${data.clanLevel}</p>
        <p>Clan Points: ${data.clanPoints}</p>
        <!-- Add more data as needed -->
    `;
}