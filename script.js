const token =
  "BQAvdNbKzUKMjBWswjI3HkBq_6XkttYsYcGBl46VeJNCFslYCwoAZb_YypOsvUUDWp7sEgByPBzObNsxWn6C7kS-y-611vtWXVdgGm4gPmXu_ggZDtM"; // Replace "YOUR_SPOTIFY_TOKEN" with the token you got from the terminal after running the code given in the readme file.
const searchButton = document.getElementById("search-btn");
const resultContainer = document.getElementById("result-container");

searchButton.addEventListener("click", function () {
  const searchQuery = document.getElementById("search-bar").value.trim();

  if (!searchQuery) {
    alert("Please enter a search term!");
    return;
  }

  fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      searchQuery
    )}&type=track&limit=10`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (!data.tracks || !data.tracks.items.length) {
        // Check if no tracks are found
        resultContainer.innerHTML = "<p>No songs found.</p>";
      } else {
        displayResults(data.tracks.items);
      }
    })
    .catch(function () {
      alert("Please update the access token.");
    });
});

function displayResults(songs) {
  resultContainer.innerHTML = songs
    .map(function (song) {
      return `
        <div class="song-result" onclick="zoomSong(this)">
          <img src="${song.album.images[0].url}" alt="Album Art">
          <div class="song-info">
            <h3>${song.name}</h3>
            <p>${song.artists[0].name}</p>
            <p>${song.album.name}</p>
          </div>
        </div>
      `;
    })
    .join("");
}

function zoomSong(selectedSong) {
  document.querySelectorAll(".song-result").forEach(function (song) {
    song.classList.toggle("zoomed", song === selectedSong);
    song.classList.toggle("blurred", song !== selectedSong);
  });
  selectedSong.addEventListener("mouseleave", resetZoom);
}

function resetZoom() {
  document.querySelectorAll(".song-result").forEach(function (song) {
    song.classList.remove("zoomed", "blurred");
  });
}
