const apiKey = 'cc034b50'; // Your API key
const moviesWrapper = document.getElementById('moviesWrapper');
const searchInput = document.getElementById('searchInput');

// Function to fetch movies from the OMDB API
async function fetchMovies(query) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`);
    const data = await response.json();
    return data.Search || []; // Return the movies or an empty array if none found
}

// Function to display movies
function displayMovies(movies) {
    moviesWrapper.innerHTML = movies.map(movie => `
        <div class="movie">
            <img src="${movie.Poster}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>Year: ${movie.Year}</p>
        </div>
    `).join('');
}

// Event listener for search input
searchInput.addEventListener('input', async (event) => {
    const query = event.target.value;
    const movies = await fetchMovies(query);
    displayMovies(movies);
});

// Initial fetch for a default query
fetchMovies('death').then(displayMovies);