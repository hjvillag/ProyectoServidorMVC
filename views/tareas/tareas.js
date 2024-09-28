// Obtener elementos del DOM
const user = JSON.parse(localStorage.getItem('user'));
const formulario = document.querySelector('#form-todos');
const lista = document.querySelector('#todos-list');
const inputF = document.querySelector('#form-input');
const cerrarBtn = document.querySelector('#cerrar-btn');
//import express from 'express'

// Redireccionar a la página de inicio si no hay usuario logueado
if (!user) {
  window.location.href = '../home/index.html';
}

// Función para obtener la lista de tareas
const obtenerLista = async () => {
  try {
    /*const response = await fetch('http://localhost:3000/tareas', {
      method: 'GET',
    });*/
    const response = await axios.get('/api/tareas')
    const list = await response.data;
    const userList = list.filter((i) => i.user === user.username);
    console.log(userList);

    // Limpiar la lista antes de agregar nuevos elementos
    lista.innerHTML = '';

    userList.forEach((lista) => {
      const listado = document.createElement('li');
      listado.innerHTML = `
        <li id="${lista.id}" class="todo-item ${lista.checked ? 'check-todo' : ''}">
          <button class="delete-btn">&#10006;</button>
          <p>${lista.text}</p>
          <button class="check-btn">&#10003;</button>
        </li>
      `;
      document.querySelector('#todos-list').appendChild(listado);
    });
  } catch (error) {
    console.error(error);
  }
};

// Obtener la lista de tareas al cargar la página
obtenerLista();

// Agregar evento de submit al formulario
formulario.addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    const newTarea = {
      text: inputF.value,
      user: user.username,
    }
    console.log(newTarea)
    const response = await axios.post('/api/tareas',newTarea)
    
    /*await fetch('http://localhost:3000/tareas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: inputF.value,
        user: user.username,
      }),*/

    obtenerLista();
    inputF.value = '';

  }catch(error) {
    console.log(error);
  }

  
});

// Agregar evento de click al botón de cerrar sesión
cerrarBtn.addEventListener('click', async (e) => {
  localStorage.removeItem('user');
  window.location.href = '../home/index.html';
});

// Agregar evento de click a la lista de tareas
lista.addEventListener('click', async (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const id = e.target.parentElement.id;
    try {
      //await fetch(`http://localhost:3000/tareas/${id}`, { method: 'DELETE' });
      await axios.delete(`/api/tareas/${id}`)
      e.target.parentElement.remove();
    } catch (error) {
      console.error(error);
    }
  } else if (e.target.classList.contains('check-btn')) {
    const id = e.target.parentElement.id;
    try {
      /*const respuestaJSON = await fetch(`http://localhost:3000/tareas/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          checked: e.target.parentElement.classList.contains('check-todo')
            ? false
            : true,
        }),
      });*/
      const respuestaJSON = await axios.patch(`/api/tareas/${id}`,{
        checked: e.target.parentElement.classList.contains('check-todo')
            ? false
            : true
      })
      const respuesta = await respuestaJSON.data;
      e.target.parentElement.classList.toggle('check-todo');
    } catch (error) {
      console.error(error);
    }
  }
});