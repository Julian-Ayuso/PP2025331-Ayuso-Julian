class Persona {
    id;
    nombre;
    aprellido;
    edad;
    constructor(id,nombre,apellido,edad){
        this.id = id;
        this.nombre = nombre;
        this.aprellido = apellido;
        this.edad = edad;
    }   
}

class Futbolista extends Persona {
    equipo;
    pocision;
    cantidadGoles;
    constructor(id,nombre,apellido,edad,equipo,pocision,cantidadGoles){
        super(id,nombre,apellido,edad);
        this.equipo = equipo;
        this.pocision = pocision;
        this.cantidadGoles = cantidadGoles;
    }
}

class Profesional extends Persona{
    titulo;
    facultad;
    añoGraduacion;
    constructor(id,nombre,apellido,edad,titulo,facultad,añoGraduacion){
        super(id,nombre,apellido,edad);
        this.titulo = titulo;
        this.facultad = facultad;
        this.añoGraduacion = añoGraduacion;
    }
}

cadenaCaracteresConsigna = '[{"id":1, "nombre":"Marcelo", "apellido":"Luque", "edad":45, "titulo":"Ingeniero", "facultad":"UTN", "añoGraduacion":2002},{"id":2, "nombre":"Ramiro", "apellido":"Escobar", "edad":35, "titulo":"Medico", "facultad":"UBA", "añoGraduacion":20012},{"id":3, "nombre":"Facundo", "apellido":"Cairo", "edad":30, "titulo":"Abogado", "facultad":"UCA", "añoGraduacion":2017},{"id":4, "nombre":"Fernando", "apellido":"Nieto", "edad":18, "equipo":"Independiente", "posicion":"Delantero", "cantidadGoles":7},{"id":5, "nombre":"Manuel", "apellido":"Loza", "edad":20, "equipo":"Racing", "posicion":"Volante", "cantidadGoles":2},{"id":6, "nombre":"Nicolas", "apellido":"Serrano", "edad":23, "equipo":"Boca", "posicion":"Arquero", "cantidadGoles":0}]';
