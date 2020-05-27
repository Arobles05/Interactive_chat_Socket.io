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

   //escuchando el emit enviado desde el front-end llamado **
   socket.on('mensaje_Enviado', function(datos){
    console.log('Mensaje recibido del usuario '+ datos.usuario+' con el mensaje>>>>'+datos.mensaje );
    io.emit('ChattingMsj',{usuario:datos.usuario,mensaje:datos.mensaje});
});

   
});
