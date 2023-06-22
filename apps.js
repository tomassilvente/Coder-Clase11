import express from "express"
import handlebars from "express-handlebars"
import __dirname from "./utils.js"
import viewRouter from './routes/views.router.js'
import { Server } from 'socket.io'

const app = express()
const httpserver = app.listen(8080, ()=>console.log("ServerArriba"))

const socketServer = new Server(httpserver)

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine','handlebars')
app.use(express.static(__dirname+'/public'))
app.use('/', viewRouter)

const message = []

//Escuchar y recibir info
socketServer.on('connection', socket=>{
    console.log("Cliente conectado")

    socket.on('message',data=>{
        message.push(data)
        socketServer.emit('messageLog',message)
    })
})