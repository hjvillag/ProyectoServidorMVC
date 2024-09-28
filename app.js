require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const userRouter = require('./controllers/usuarios')
const taskRouter = require('./controllers/tareas')

//crear funcion para conectar a la base de datos
async function conectarBD() {
    try{
        await mongoose.connect(process.env.token)
        console.log("Se conecto a la BD")
    }catch(error){
        console.log("No se ha podido conectar a la BD")
    }    
}

//llamar a la funcion conectarBD
conectarBD()

//rutas fronted
app.use('/',express.static(path.resolve('views','home')))
app.use('/tareas',express.static(path.resolve('views','tareas')))
app.use('/home',express.static(path.resolve('views','home')))
app.use('/controllers',express.static(path.resolve('controllers')))

app.use(express.json())

//rutas de backend
app.use('/api/users',userRouter)
app.use('/api/tareas',taskRouter)

module.exports = app