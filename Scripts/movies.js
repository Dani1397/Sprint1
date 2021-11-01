let formulario = document.getElementById('form');
let btnTitulo = document.getElementById('btn-buscar-titulo');
let btnEditar = document.getElementById('btnEditar');
let url = 'http://localhost:4001/movies/'

formulario.addEventListener('submit', async (e) => {
    e.preventDefault();
    let name = document.getElementById('poster').value;
    let lastName = document.getElementById('title').value;
    let email = document.getElementById('desription').value;

    await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            name,
            lastName,
            email
        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    })

})

btnTitulo.addEventListener('click', async () => {
    //Que voy a buscar     

    let movieToSearch = document.getElementById('title').value;
    const datos = await fetch(url);
    const data = await datos.json();

    //como lo voy a buscar

    const busqueda = data.find(movies => {
        return movies.title.toLowerCase() === movieToSearch.toLowerCase()
    });
    document.getElementById('title').setAttribute("readonly", true);
    if (busqueda === undefined) {
        return alert('Película no encontrada');
    }
    //Desestructuramos 

    const { poster, title, desription, id } = busqueda;
    document.getElementById('poster').value = poster;
    document.getElementById('title').value = title;
    document.getElementById('desription').value = desription;
    document.getElementById('id').value = id;

})

btnEditar.addEventListener('click', async () => {
    let poster = document.getElementById('poster').value;
    let title = document.getElementById('title').value;
    let desription = document.getElementById('desription').value;
    let id = document.getElementById('id').value;

    await fetch(url + id, {
        method: 'PUT',
        body: JSON.stringify({
            poster,
            title,
            desription
        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    })

    return alert('Cambios guardados exitosamente')
})
 
btnEliminar.addEventListener('click', async () => {
    let idModificar = document.getElementById('id').value; 
    let resp = await fetch(`http://localhost:4001/movies/${idModificar}`,{method:'DELETE',})
})

