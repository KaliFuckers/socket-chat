
class Usuarios{
    constructor(){
        this.personas = [];
    }

    agregarPersona(id, nombre, sala){
        const persona = {id, nombre, sala}
        this.personas.push(persona);
        return this.personas;
    }

    getPersona(id){
        const persona = this.personas.find(persona => persona.id === id);
        console.log(persona);
        return persona;
    }

    getPersonas(){
        return this.personas;
    }

    getPersonasPorSalas(sala){
        const personas = this.personas.filter(persona => persona.sala === sala);
        return personas;
    }

    borrarPersona(id){
        const personaBorrada = this.getPersona(id);
        this.personas = this.personas.filter(persona => persona.id !== id);
        return personaBorrada;
    }

}

module.exports = Usuarios;