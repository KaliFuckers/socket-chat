var params = new URLSearchParams(window.location.search);
var nombre = params.get('nombre');
var sala = params.get('sala');

var divUsuarios = $('#divUsuarios');
var txtMensaje = $('#txt-mensaje');
var divChatBox = $('#divChatbox');

function renderizarMensaje(mensaje, yo){
    var fecha = new Date(mensaje.fecha);
    var hora = fecha.getHours() + ':' + fecha.getMinutes();

    var html = '';
    var adminClass = 'info';
    if(mensaje.nombre === 'Admin'){
        adminClass = 'danger'
    }

    if(yo){
        html += '<li class="reverse animated fadeIn">';
        html += '<div class="chat-content">';
        html += '<h5>'+ mensaje.nombre +'</h5>';
        html += '<div class="box bg-light-inverse">'+ mensaje.message +'</div>';
        html += '</div>';
        html += '<div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        html += '<div class="chat-time">'+ hora +'</div>';
        html += '</li>';
    }
    else{
        html += '<li animated fadeIn>';
        if(mensaje.nombre !== 'Admin'){
            html += '<div class="chat-img"><img src="assets/images/users/2.jpg" alt="user" /></div>';
        }
        html += '<div class="chat-content">';
        html += '<h5>'+ mensaje.nombre +'</h5>';
        html += '<div class="box bg-light-'+ adminClass +'">'+ mensaje.message +'</div>';
        html += '</div>';
        html += '<div class="chat-time">'+ hora +'</div>';
        html += '</li>';
    }



    divChatBox.append(html);
}

function scrollBottom() {

    // selectors
    var newMessage = divChatBox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}

function renderizarUsuario(personas){
    var html = '';
    html += '<li>'
    html += '<a href="javascript:void(0)" class="active"> Chat de <span>' + params.get('sala') + '</span></a>';
    html += '</li>';

    for(var i = 0; i < personas.length; i++){
        html += '<li>';
        html += '<a data-id="'+ personas[i].id +'"href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + personas[i].nombre + '<small class="text-success">online</small></span></a>';
        html += '</li>';
    }

    divUsuarios.html(html);
    
}

divUsuarios.on('click', 'a', function(){
    var id = $(this).data('id');
    if(id){
        console.log(id);
    }
});

$('#enviar').on('submit', function(e){
    e.preventDefault();
    var data = txtMensaje[0].value.trim();
    socket.emit('crearMensaje', {mensaje: data}, function(data){
        txtMensaje.focus();
        txtMensaje[0].value = '';
        console.log(data);
        renderizarMensaje(data, true);
        scrollBottom();
    });
    
});




