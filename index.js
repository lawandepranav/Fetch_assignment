document.getElementById("searchInput").addEventListener("search", () => {
    let movie = document.getElementById("searchInput").value;

    fetch(`http://www.omdbapi.com/?t=${movie}&apikey=4e1018d4`)
      .then(function (response) {
        response.json().then((movies) => {
          console.log(movies);

          if (movies.Response == "False") {
            document.getElementById("container").innerHTML = "";
            let err = document.createElement("P");
            err.textContent="404 Error found"
            document.getElementById("container").append(err);
          } else {
            let showMovies = movies;
            localStorage.setItem("moviesData", JSON.stringify([showMovies]));

            displayData([showMovies]);
          }
        });
      })
      .catch(function (error) {
        console.log("Error", error);
      });
  });

  function displayData(movies) {
    document.getElementById("container").innerHTML = "";
    movies.forEach((movie) => {
      let movieCard = document.createElement("div");

      let poster = document.createElement("img");
      poster.src = movie.Poster;

      let title = document.createElement("p");
      title.textContent = movie.Title;

      let releaseYear = document.createElement("p");
      releaseYear.textContent = movie.Year;

      let rating = document.createElement("p");
      rating.textContent = movie.imdbRating;

      if (movie.imdbRating > 8.5) {
        let recomm = document.createElement("p");
        recomm.textContent = "Recommended";
        movieCard.append(poster, recomm, title, releaseYear, rating);
        document.getElementById("container").append(movieCard);
      } else {
        movieCard.append(poster, title, releaseYear, rating);
        document.getElementById("container").append(movieCard);
      }
    });
  }

  let moviesPersists = JSON.parse(localStorage.getItem("moviesData"));
  displayData(moviesPersists);

  