const token = "BQAvdNbKzUKMjBWswjI3HkBq_6XkttYsYcGBl46VeJNCFslYCwoAZb_YypOsvUUDWp7sEgByPBzObNsxWn6C7kS-y-611vtWXVdgGm4gPmXu_ggZDtM";// Replace "YOUR_SPOTIFY_TOKEN" with the token you got from terminal after running the code given in readme file.
      const searchButton = document.getElementById("search-btn");
      const resultContainer = document.getElementById("result-container");
      const finalbox = ""; 
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
            console.log(data.tracks.items[0].album.images[0].wrongUrl);
            displayResults(data.tracks.items);
          })
          .catch(() => alert("Please Update Access Token"));
      });
      function displayResults(songs) {
        resultContainer.innerHTML = songs.length
          ? songs
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
              .join("")
          : "<p>No songs 123found.</p>";
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
