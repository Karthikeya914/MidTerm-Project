const token =
  "BQDUrwrfDwK_vLnpDlCLm13UPCeMBpPWfzjBCFGJzklA3q1y2Q7z6R8uZH6jNpr7q5OkW2T77MhR-X8GsIa_4WdPpicPNfrGYngCOGxU6ghnHWPLHus"; // Replace with your Spotify token
const searchButton = document.getElementById("search-btn");
const resultContainer = document.getElementById("result-container");

searchButton.addEventListener("click", () => {
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
    .then((response) => response.json())
    .then((data) => {
      if (!data.tracks || !data.tracks.items.length) {
        resultContainer.innerHTML = "<p>No songs found.</p>";
      } else {
        displayResults(data.tracks.items);
      }
    })
    .catch(() => {
      resultContainer.innerHTML = "<p>Error fetching data. Please try again.</p>";
    });
});

function displayResults(songs) {
  resultContainer.innerHTML = songs
    .map(
      (song) => `
      <div class="song-result" onclick="zoomSong(this)">
        <img src="${song.album.images[0].url}" alt="Album Art">
        <div class="song-info">
          <h3>${song.name}</h3>
          <p>${song.artists[0].name}</p>
          <p>${song.album.name}</p>
        </div>
      </div>
    `
    )
    .join("");
}

function zoomSong(selectedSong) {
  document.querySelectorAll(".song-result").forEach((song) => {
    song.classList.toggle("zoomed", song === selectedSong);
    song.classList.toggle("blurred", song !== selectedSong);
  });
  selectedSong.addEventListener("mouseleave", resetZoom);
}

function resetZoom() {
  document.querySelectorAll(".song-result").forEach((song) => {
    song.classList.remove("zoomed", "blurred");
  });
}

it should send an alert while there is an error in fetching data
