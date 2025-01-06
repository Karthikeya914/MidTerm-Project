const token =
  "BQDtwze257N9TuZYUgwSRu7w92-GdeBxzGG0XVMG9WeHWlsaSarmoZY37a1hg_Lt5I2GFsx30pu39T3ZbJuepteJimtKq9xqObOPYUa27Pj50RQ4dFA"; // Replace with your Spotify token
const searchButton = document.getElementById("search-btn");
const resultContainer = document.getElementById("result-container");

searchButton.addEventListener("click", function () {
  const searchQuery = document.getElementById("search-bar").value.trim();

  if (!searchQuery) {
    resultContainer.innerHTML =
      "<p style='color: red;'>Please enter a search term!</p>";
    return;
  }

  fetch(
    "https://api.spotify.com/v1/search?q=" +
      encodeURIComponent(searchQuery) +
      "&type=track&limit=10",
    {
      headers: { Authorization: "Bearer " + token },
    }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (!data.tracks || !data.tracks.items.length) {
        resultContainer.innerHTML =
          "<p style='color: red;'>No songs found.</p>";
      } else {
        displayResults(data.tracks.items);
      }
    })
    .catch(function () {
      resultContainer.innerHTML =
        "<p style='color: red;'>Error fetching data. Please check your network or token and try again.</p>";
    });
});

function displayResults(songs) {
  var resultsHTML = "";
  for (var i = 0; i < songs.length; i++) {
    var song = songs[i];
    resultsHTML +=
      '<div class="song-result" onclick="zoomSong(this)">' +
      '<img src="' +
      song.album.images[0].url +
      '" alt="Album Art">' +
      '<div class="song-info">' +
      "<h3>" +
      song.name +
      "</h3>" +
      "<p>" +
      song.artists[0].name +
      "</p>" +
      "<p>" +
      song.album.name +
      "</p>" +
      "</div>" +
      "</div>";
  }
  resultContainer.innerHTML = resultsHTML;
}

function zoomSong(selectedSong) {
  var songResults = document.querySelectorAll(".song-result");
  for (var i = 0; i < songResults.length; i++) {
    var song = songResults[i];
    song.classList.toggle("zoomed", song === selectedSong);
    song.classList.toggle("blurred", song !== selectedSong);
  }
  selectedSong.addEventListener("mouseleave", resetZoom);
}

function resetZoom() {
  var songResults = document.querySelectorAll(".song-result");
  for (var i = 0; i < songResults.length; i++) {
    songResults[i].classList.remove("zoomed", "blurred");
  }
}
