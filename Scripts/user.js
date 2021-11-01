let formulario = document.getElementById('form');
let btnCorreo = document.getElementById('btnCorreo');
let btnEditar = document.getElementById('btnEditar');
let url = 'http://localhost:4000/usuarios/'

formulario.addEventListener('submit', async (e) => {
    e.preventDefault();
    let name = document.getElementById('name').value;
    let lastName = document.getElementById('lastName').value;
    let email = document.getElementById('email').value;

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

btnCorreo.addEventListener('click', async () => {
    //Que voy a buscar     

    let emailToSearch = document.getElementById('email').value;
    const datos = await fetch(url);
    const data = await datos.json();

    //como lo voy a buscar

    const busqueda = data.find(user => {
        return user.email.toLowerCase() === emailToSearch.toLowerCase()
    });
    document.getElementById('email').setAttribute("readonly", true);
    if (busqueda === undefined) {
        return alert('Usuario no encontrado');
    }
    //Desestructuramos 

    const { name, lastName, email, id } = busqueda;
    document.getElementById('name').value = name;
    document.getElementById('lastName').value = lastName;
    document.getElementById('email').value = email;
    document.getElementById('id').value = id;

})

btnEditar.addEventListener('click', async () => {
    let name = document.getElementById('name').value;
    let lastName = document.getElementById('lastName').value;
    let email = document.getElementById('email').value;
    let id = document.getElementById('id').value;

    await fetch(url + id, {
        method: 'PUT',
        body: JSON.stringify({
            name,
            lastName,
            email
        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    })

    return alert('Cambios guardados exitosamente, vuelve a ingresar')
})
 
btnEliminar.addEventListener('click', async () => {
    let idModificar = document.getElementById('id').value; 
    let resp = await fetch(`http://localhost:4000/usuarios/${idModificar}`,{method:'DELETE',})
})

