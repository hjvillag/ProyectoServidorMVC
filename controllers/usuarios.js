//1 definir el router
//router: POST, GET, DELETE, UPDATE

const userRouter = require('express').Router()

//conectar al modelo
const user = require('../models/usuario')

//2 registro del nombre que el usuario ingreso en el formulario
userRouter.post('/',(request,response)=>{
    //cuando ingrese a este metodo es porque lo estoy llamando desde el js del front relacionado al formulario donde quiero realizar el registro
    const {username} = request.body
    console.log('extraccion ',username) // este console.log va a aparecer en la terminal

    //validaciones a nivel de backend
    if(!username){
        //al realizar esta validacion retorno al frontend que hay un error
        return response
        .status(400)
        .json({error:'Todos los campos son obligatorios'})
    }else{
        //caso en que esta correcto el dato a registrar, luego nos toca enviarlos a la BD
        console.log('recibido en backend ',username)
        //enviar los datos a la BD
        let usuario = new user()
        usuario.username = username

        async function guardarUsuario() {
            await usuario.save() // guardo en la bd
            //console.log('hola')
            const usuarioConsulta = await user.find()
            console.log(usuarioConsulta)

            guardarUsuario().catch(console.error)
        }
        guardarUsuario()
        
        return response
        .status(200)
        .json({mensaje:'Se ha creado el usuario'})
    }
})

userRouter.get('/', async (request, response)=>{
    try{
        const usuarios = await user.find()
        console.log(usuarios)
        return response.status(200).json(usuarios)
    }catch(error){
        console.error(error)
        return response.status(400).json({error: 'Error al obtener los usuarios'})
    }
})

//userRouter.delete()

module.exports = userRouter;