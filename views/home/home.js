//crear selectores
const formC = document.querySelector('#form-create');
const formL = document.querySelector('#form-login');
const loginInput = document.querySelector('#login-input');
const createInput = document.querySelector('#create-input');
const notificacion = document.querySelector('.notification');

formC.addEventListener('submit', async e=>{
    e.preventDefault();
    //const response = await fetch('http://localhost:3000/users',{method:'GET'});
    const response = await axios.get('/api/users')
    const users = await response.data;

    //voy a buscar el usuario que estoy colocando en el campo dentro del recurso users
    const user = users.find(user=>user.username === createInput.value)

    //validamos
    if(!createInput.value){
        //si el campo esta vacio
        notificacion.innerHTML = "El campo de usuario no puede estar vacio";
        notificacion.classList.add('show-notification');

        setTimeout(() => {
            notificacion.classList.remove('show-notification')
        }, 3000);
    }else if(user){
        //caso de que el usuario exista
        notificacion.innerHTML = "El usuario ya existe";
        notificacion.classList.add('show-notification');

        setTimeout(() => {
            notificacion.classList.remove('show-notification')
        }, 3000);
    }else{
        /*await fetch('http://localhost:3000/users',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({username: createInput.value}),
        });*/

        //enviando al backend o router/controller
        const response = await axios.post('/api/users',{username:createInput.value})
        console.log(response)

        notificacion.innerHTML = `El usuario ${createInput.value} ha sido creado`
        notificacion.classList.add('show-notification');

        setTimeout(() => {
            notificacion.classList.remove('show-notification');
        }, 3000);
        createInput.value = '';
    }
})

formL.addEventListener('submit', async e=>{
    e.preventDefault();

    //const response = await fetch('http://localhost:3000/users',{method:'GET'});
    const response = await axios.get('/api/users')
    const users = await response.data;

    const user = users.find(user => user.username === loginInput.value);
    //console.log(user);

    if(!user){
        notificacion.innerHTML = 'El usuario no existe';
        notificacion.classList.add('show-notification')

        setTimeout(() => {
            notificacion.classList.remove('show-notification')
        }, 3000);
    }else{
        localStorage.setItem('user',JSON.stringify(user))
        window.location.href = '../tareas/index.html';
    }
})