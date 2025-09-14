const API_KEY = 'abcd1234yourapikeyhere';  // ✅ Apni real TMDb API key yahan daalein
const searchInput = document.querySelector('#search');
const moviesContainer = document.querySelector('#movies');

searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();
    if (query.length === 0) {
        moviesContainer.innerHTML = '';
        return;
    }

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
            moviesContainer.innerHTML = data.results.map(movie => `
                <div class="movie-card">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                    <h3>${movie.title}</h3>
                </div>
            `).join('');
        })
        .catch(err => console.error('Error fetching movies:', err));
});
