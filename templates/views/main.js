const movieDetailsDiv = document.getElementById('movieDetails');

function displayMovieDetails(data) {
         movieDetailsDiv.innerHTML = `
    <div class="movie-details">
      <h2>${data.Title}</h2>
      <p><strong>Year:</strong> ${data.Year}</p>
      <p><strong>Rated:</strong> ${data.Rated}</p>
      <p><strong>Released:</strong> ${data.Released}</p>
      <p><strong>Runtime:</strong> ${data.Runtime}</p>
      <p><strong>Genre:</strong> ${data.Genre}</p>
      <p><strong>Director:</strong> ${data.Director}</p>
      <p><strong>Writer:</strong> ${data.Writer}</p>
      <p><strong>Actors:</strong> ${data.Actors}</p>
      <p><strong>Plot:</strong> ${data.Plot}</p>
      <p><strong>Language:</strong> ${data.Language}</p>
      <p><strong>Country:</strong> ${data.Country}</p>
      <p><strong>Awards:</strong> ${data.Awards}</p>
      <img src="${data.Poster}" alt="${data.Title} Poster">
      <p><strong>IMDb Rating:</strong> ${data.imdbRating}</p>
      <p><strong>Rotten Tomatoes Rating:</strong> ${data.Ratings.find(rating => rating.Source === 'Rotten Tomatoes').Value}</p>
      <p><strong>Metacritic Score:</strong> ${data.Metascore}</p>
      <p><strong>IMDb Votes:</strong> ${data.imdbVotes}</p>
      <p><strong>IMDb ID:</strong> ${data.imdbID}</p>
      <p><strong>Type:</strong> ${data.Type}</p>
      <p><strong>DVD Release:</strong> ${data.DVD}</p>
      <p><strong>Box Office:</strong> ${data.BoxOffice}</p>
      <p><strong>Production:</strong> ${data.Production}</p>
      <p><strong>Website:</strong> ${data.Website}</p>
      <p><strong>Response:</strong> ${data.Response}</p>
    </div>
  `;
}

const omdbApiKey = '5c42cfe';
const movieId = 'tt3896198';

fetch(`http://www.omdbapi.com/?apikey=${omdbApiKey}&i=${movieId}`)
         .then((response) => response.json())
         .then((data) => {
                  displayMovieDetails(data);
         })
         .catch((error) => console.error('Error fetching movie details:', error));