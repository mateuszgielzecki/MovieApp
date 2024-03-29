const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

const main = document.querySelector('.main');
const search = document.querySelector('.search');
const form = document.getElementById('form');

const getMovies = function (url) {
fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data.results)

        renderMovies(data.results)
    })
}

getMovies(API_URL);



const renderMovies = function (data) {
    main.innerHTML = '';

    data.forEach(el => {
        const html = `<div class="movie__box">
        <div class="movie__poster">
            <img  class="movie__img" src="${IMG_PATH + el.poster_path}"
                alt="Movie poster">
        </div>
        <div class="movie__info">
            <h3 class="movie__title">${el.title}</h3>
            <p class="movie__rate ${getClassByRate(el.vote_average)}">${el.vote_average}</p>
        </div>
        <div class="movie__overview">
            <h4>Overview</h4>
            <p class="overview">${el.overview}
            </p>
        </div>`;

        main.insertAdjacentHTML('beforeend', html);
    });
}

function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green'
    } else if(vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)

        search.value = '';
    } else {
        window.location.reload();
    }

})