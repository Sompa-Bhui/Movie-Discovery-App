const API_KEY = 'YOUR_TMDB_API_KEY'; // ← Replace with your TMDb API Key
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const moviesContainer = document.getElementById('movies-container');
const searchInput = document.getElementById('search-input');
const movieModal = document.getElementById('movie-modal');
const modalTitle = document.getElementById('modal-title');
const modalOverview = document.getElementById('modal-overview');
const modalRelease = document.getElementById('modal-release');
const modalRating = document.getElementById('modal-rating');
const closeModalBtn = document.getElementById('close-modal');
const toggleThemeBtn = document.getElementById('toggle-theme');

// Fetch and display trending movies
async function getTrendingMovies() {
    const res = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
    const data = await res.json();
    displayMovies(data.results);
}

// Search movies
searchInput.addEventListener('input', async () => {
    const query = searchInput.value.trim();
    if (query.length === 0) {
        getTrendingMovies();
        return;
    }
    const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
    const data = await res.json();
    displayMovies(data.results);
});

// Display movie cards
function displayMovies(movies) {
    moviesContainer.innerHTML = '';
    movies.forEach(movie => {
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie-card');
        movieEl.innerHTML = `
            <img src="${IMG_URL + movie.poster_path}" alt="${movie.title}" />
            <h3>${movie.title}</h3>
        `;

        movieEl.addEventListener('click', () => showMovieDetails(movie));

        moviesContainer.appendChild(movieEl);
    });
}

// Show movie details in modal
function showMovieDetails(movie) {
    modalTitle.textContent = movie.title;
    modalOverview.textContent = movie.overview;
    modalRelease.textContent = movie.release_date;
    modalRating.textContent = movie.vote_average;
    movieModal.classList.remove('hidden');
}

// Close modal
closeModalBtn.addEventListener('click', () => {
    movieModal.classList.add('hidden');
});

// Dark/Light mode toggle
toggleThemeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
});

getTrendingMovies();
