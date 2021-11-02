let formulario = document.getElementById('form');
let btnTitulo = document.getElementById('btn-buscar-titulo');
let btnEditar = document.getElementById('btnEditar');
let url = 'http://localhost:3000/movies/'
let id ;

formulario.addEventListener('submit', async (e) => {
    e.preventDefault();
    let poster = document.getElementById('poster').value;
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;

    const movies = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            poster,
            title,
            description
        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    }) .then(r=>r.json());
    showMovies(movies);

})

btnTitulo.addEventListener('click', async () => {
    //Que voy a buscar     

    let movieToSearch = document.getElementById('title').value;
    const datos = await fetch(url);
    const data = await datos.json();

    //como lo voy a buscar

    const busqueda = data.find(movies => {
        return movies.title.toLowerCase().includes(movieToSearch.toLowerCase());
    });
    document.getElementById('title').setAttribute("readonly", true);
    if (busqueda === undefined) {
        return alert('Película no encontrada');
    }
    //Desestructuramos 

    const { poster, title, description, id:nuevoid } = busqueda;
    document.getElementById('poster').value = poster;
    document.getElementById('title').value = title;
    document.getElementById('description').value = description;
    id= nuevoid;
    console.log(nuevoid, id);

})

btnEditar.addEventListener('click', async () => {
    let poster = document.getElementById('poster').value;
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;

    const movies= await fetch (url + id, {
        method:'PUT',
        body: JSON.stringify({
            id,
            poster,
            title,
            description
        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    }) .then(r=>r.json());
    showMovies(movies);

    return alert('Cambios guardados exitosamente')
})
 
btnEliminar.addEventListener('click', async () => {
    let movies = await fetch(url+id,{method:'DELETE',}).then(r=>r.json());
    showMovies(movies);
    }) 

const templateCard = document.getElementById('template-card').content;
const fragment = document.createDocumentFragment();
const itemsCards = document.getElementById("items-card");

async function getMovies(){
    let resp = await fetch(`http://localhost:3000/movies`).then(r=>r.json());
    showMovies(resp)
}

function showMovies(movies) {
    itemsCards.innerHTML=''
    movies.forEach(movie => {
        templateCard.querySelector(".image").setAttribute("src", movie.poster);
        templateCard.querySelector(".title").textContent = movie.title; 
        

        const clone = templateCard.cloneNode(true);

        fragment.appendChild(clone);
    });

    itemsCards.appendChild(fragment);
}

getMovies()