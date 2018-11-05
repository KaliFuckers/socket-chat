const { io } = require('../server');
const { crearMensaje } = require('../utils/utils');
const Usuario = require('../classes/usuario');

const usuario = new Usuario();
io.on('connection', (client) => {
    console.log('Usuario conectado');

    client.on('entrarAlChat', (data, callback) => {
        if(!data.nombre && !data.sala){
            return callback({
                ok: false,
                message: 'El nombre/sala es requerido'
            })
        }

        client.join(data.sala);
        const personas = usuario.agregarPersona(client.id, data.nombre, data.sala);
        client.broadcast.to(data.sala).emit('listaPersonas', usuario.getPersonasPorSalas(data.sala))
        callback(usuario.getPersonasPorSalas(data.sala));
        client.broadcast.to(data.sala).emit('crearMensaje', crearMensaje('Admin', `${data.nombre} se unió l chat`));
    });

    client.on('crearMensaje', (data, callback) => {
        const persona = usuario.getPersona(client.id);
        const mensaje = crearMensaje(persona.nombre, data.mensaje);
        callback(mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);
    });

    client.on('disconnect', () => {
        const personaBorrada = usuario.borrarPersona(client.id);
        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Admin', `${personaBorrada.nombre} abandonó el chat`));
        client.broadcast.to(personaBorrada.sala).emit('listaPersonas', usuario.getPersonasPorSalas(personaBorrada.sala));
    });

    client.on('mensajePrivado', data => {
        const persona = usuario.getPersona(client.id);
        client.broadcast.to(data.para).emit('crearMensaje',crearMensaje(persona.nombre, data.mensaje));
    })

});