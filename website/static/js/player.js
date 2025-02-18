// Function to update the player with new data
function updatePlayer(data) {
    document.getElementById('song').textContent = data.song;
    document.getElementById('artist').textContent = data.artist;
    document.getElementById('album').textContent = data.album;

    // Update album art if it exists
    const albumArtElement = document.querySelector('#album-art img');
    if (albumArtElement && data.album_art) {
        albumArtElement.src = data.album_art;
        albumArtElement.alt = `${data.album} album art`;
    }
}

// Function to fetch data from the API
async function fetchMusicData() {
    try {
        const response = await fetch('https://aishik999.pythonanywhere.com/');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        updatePlayer(data);
    } catch (error) {
        console.error('Error fetching music data:', error);
        // Update player with error state
        document.getElementById('song-title').textContent = 'Error loading song data';
    }
}

// Function to start periodic updates
function startPeriodicUpdates(interval = 30000) {
    // Initial fetch
    fetchMusicData();

    // Set up periodic updates
    setInterval(fetchMusicData, interval);
}

// Start updates when the document is loaded
document.addEventListener('DOMContentLoaded', () => {
    startPeriodicUpdates();
});