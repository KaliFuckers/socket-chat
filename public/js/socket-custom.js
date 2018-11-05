var socket = io();
var params = new URLSearchParams(window.location.search);

if(!params.has('nombre') && !params.has('sala')){
    window.location = 'index.html';
    throw new Error('El nombre es necesario')
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');
});

socket.emit('entrarAlChat', usuario, function(resp){
    /* console.log('Usuarios conectados ', resp); */
    renderizarUsuario(resp);
})

socket.on('usuarioMessageDesconnection', function(data){
    console.log(data);
});

socket.on('crearMensaje', function(resp){
    console.log(resp);
    renderizarMensaje(resp);
    scrollBottom()
});

socket.on('listaPersonas', function(data){
    renderizarUsuario(data);
});

/* socket.emit('mensajePrivado', function(data){
    console.log(data);
}) */