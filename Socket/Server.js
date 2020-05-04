console.log("Starting server.........");

const express  = require('../node_modules/express/index');
const app = express();

const http = require('http');
const server = http.createServer(app);

server.listen(3000);

app.use(express.static('views'));

const socketIo = require('../node_modules/socket.io');
const io = socketIo.listen(server);

io.on('connect',function(socket){
    console.log('nueva conexion Id'+ socket.id);

    socket.on('datos_usuario_enviados', function(datos){
        console.log('correo:'+ datos.correo +' usuario '+ datos.usuario );
        io.emit('nuevo_usuario',{user:datos.usuario});
    });
   // 
});
