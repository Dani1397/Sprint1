const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = `https://image.tmdb.org/t/p/w1280`
const SEARCH_URL = 'http://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

const templateCard = document.getElementById("template-card").content;
const itemsCards = document.getElementById("items-card");
const fragment = document.createDocumentFragment();
const slides = document.querySelector('.slider');
const templateDetail = document.getElementById('template-card-2').content;

async function getVideos(id) {

    return fetch(`http://api.themoviedb.org/3/movie/${id}/videos?api_key=3fd2be6f0c70a2a598f084ddfb75487c`).then(r => r.json());
}

async function getMovies(url) {
    try {
        const data = await fetch(url).then(r => r.json());
        showMovies(data.results);
    } catch (error) {
        console.log("Error en la ejecución", error);
    }
}

getMovies(API_URL);

function showMovies(movies) {
    console.log(movies)
    movies.forEach(movie => {
        templateCard.querySelector(".image").setAttribute("src", IMG_PATH + movie.poster_path);
        templateCard.querySelector(".status").textContent = movie.vote_average;

        const clone = templateCard.cloneNode(true);


        clone.firstElementChild.addEventListener('click', () => {
            slides.innerHTML = ''
            templateDetail.querySelector("#image").setAttribute("src", IMG_PATH + movie.poster_path);
            templateDetail.querySelector('.movie-title').textContent = movie.title;
            templateDetail.querySelector('.movie-resume').innerHTML = movie.overview;

            window.scrollTo(0, 0);

            const clone = templateDetail.cloneNode(true);
            clone.firstElementChild.addEventListener('click', async () => {
                console.log('btnWatchTrailer')
                const videos = await getVideos(movie.id);
                const video = videos.results[0].key;
                console.log(video);
                slides.innerHTML = `<iframe width="250" height="250" src="https://www.youtube.com/embed/${video}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`

            })


            slides.appendChild(clone);
        });
        fragment.appendChild(clone);
    });

    itemsCards.appendChild(fragment);
}

const btnsearching = document.getElementById('btnBuscar');
const inputsearch = document.getElementById('inputBuscar');

btnsearching.addEventListener('click', async () => {
    const text = inputsearch.value;
    if (text.length <= 1) {
        return alert('Ingrese al menos dos caracteres');
    }
    try {
        const data = await fetch(SEARCH_URL + text).then(r => r.json());
        templateCard.innerHTML = ''
        itemsCards.innerHTML = ''
        const search = data.results;
        //const searchResult = search.filter(movie => movie.original_title.toLowerCase() == text.toLowerCase());
        showMovies(search);
        window.scrollTo(0, 0);
    } catch (error) {
        console.log("Error en la ejecución", error);

    }

})




