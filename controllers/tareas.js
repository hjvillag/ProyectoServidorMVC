//1 hacer el router
//router: registrar POST, GET, DELETE
const taskRouter = require('express').Router()

const task = require('../models/tarea')

//registrar la informacion que el usuario envia a traves del formulario
taskRouter.post('/', async (request, response) => {
    try {
      const newTarea = new task(request.body);
      await newTarea.save();
      response.status(200).json(newTarea);
    } catch (error) {
      console.error(error);
      response.status(400).json({ message: 'Error al crear recurso' });
    }
})

taskRouter.get('/', async (request, response)=>{
    try{
        const tareas = await task.find()
        console.log(tareas)
        return response.status(200).json(tareas)
    }catch(error){
        console.error(error)
        return response.status(400).json({error: 'Error al obtener los recursos'})
    }
})

taskRouter.delete('/:id', async (request, response) => {
  try {
    // Busca la tarea por su ID
    const tarea = await task.findByIdAndDelete(request.params.id);
    response.status(200).json({ message: 'Tarea eliminada exitosamente' });
  } catch (error) {
    console.error(error);
    response.status(400).json({ message: 'Error al eliminar la tarea' });
  }
})

taskRouter.patch('/:id', async (request, response) => {
  try {
    // Busca la tarea por su ID
    const tarea = await task.findById(request.params.id);

    // Actualiza solo los campos especificados en el cuerpo de la solicitud
    Object.assign(tarea, request.body);

    // Guarda los cambios
    const tareaActualizada = await tarea.save();
    response.status(200).json(tareaActualizada);
  } catch (error) {
    console.error(error);
    response.status(400).json({ message: 'Error al actualizar la tarea' });
  }
});


module.exports = taskRouter;