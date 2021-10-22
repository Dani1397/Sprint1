/*let templateCard = document.getElementById('template-card').content;
let fragment = document.createDocumentFragment();
let items = document.getElementById('items');

const getData = async () => {

    let url = 'https://raw.githubusercontent.com/jennymontoya1001/endpointheroesjson/main/heroes.json';
    let response = await fetch(url);
    let data = await response.json();
    let { results } = data;
    return results;
}

const showData = async () => {

    let dataBase = await getData();
    dataBase.forEach(heroe => {
        let { superhero, image } = heroe;
        templateCard.querySelector('h5').textContent = superhero;
        templateCard.querySelector('img').setAttribute('src', image);
        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
    });
    items.appendChild(fragment);

}

document.addEventListener('DOMContentLoaded', showData)


let boton = document.getElementById('btnBuscar');

boton.addEventListener('click', async () => {
    let texto = document.getElementById('inputBuscar').value;
    
    let dataBase = await getData();
    let searching = dataBase.filter(hero => hero.superhero.toLowerCase() === texto.toLowerCase())
    searching.forEach(heroe => {
        let {superhero,image} = heroe;
        templateCard.querySelector('h5').textContent = superhero;
        templateCard.querySelector('img').setAttribute('src',image);
        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
    })
    items.innerHTML = "";
    items.appendChild(fragment);
})*/

const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1%27';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_URL = 'http://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

const templateCard = document.getElementById("template-card").content;
const itemsCards = document.getElementById("items-card");
const fragment = document.createDocumentFragment();

async function getMovies(url) {
    try {
        const res = await fetch(url);
        const data = await res.json();
        showMovies(data.results);
    } catch (error) {
        console.log("Error en la ejecución", error);
    }
}

getMovies(API_URL);

function showMovies(movies) {
    movies.forEach(movie => {
        templateCard.querySelector(".image").setAttribute("src", IMG_PATH + movie.poster_path);
        templateCard.querySelector(".status").textContent = movie.vote_average;

        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
    });

    itemsCards.appendChild(fragment);
}



