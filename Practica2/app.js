class Persona {
    constructor(id,nombre, apellido, edad) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
    }
}

class Futbolista extends Persona {
    constructor(id,nombre, apellido, edad, posicion, equipo) {
        super(id,nombre, apellido, edad);
        this.posicion = posicion;
        this.equipo = equipo;
    }
}

class Profesional extends Persona {
    constructor(id,nombre, apellido, edad, titulo, facultad) {
        super(id,nombre, apellido, edad);
        this.titulo = titulo;
        this.facultad = facultad;
    }
}

class Modelo{
    constructor() {
        this.personas = [];
    }
}

class Vista{
    constructor() {
        this.head = document.getElementById("head");
        this.tbody = document.getElementById("tbody");
        this.form = document.getElementById("formulario");
        this.btnEnviar = document.getElementById("enviar");
        this.btnAgregar = document.getElementById("btn_agregar");
        this.spinner = document.getElementById("spinner");
    }

    mostrarSpinner(show) {
                this.spinner.classList.toggle("hidden", !show);
            }
    
    mostrarFormulario() {
                this.head.classList.add("hidden");
                this.form.classList.remove("hidden");
            }

     mostrarTabla() {
                this.head.classList.remove("hidden");
                this.form.classList.add("hidden");
            }

    dibujarTabla(personas) {
        this.tbody.innerHTML = "";

        personas.forEach(p => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                    <td>${p.id}</td>
                    <td>${p.nombre}</td>
                    <td>${p.apellido}</td>
                    <td>${p.edad}</td>
                    <td>${p.equipo || "N/A"}</td>
                    <td>${p.posicion || "N/A"}</td>
                    <td>${p.titulo || "N/A"}</td>
                    <td>${p.facultad || "N/A"}</td>
                    <td><button class="modificar" data-id="${p.id}">Modificar</button></td>
                    <td><button class="eliminar" data-id="${p.id}">Eliminar</button></td>
                    `
                    this.tbody.appendChild(tr);
        })
    }
}
class Control{
    constructor(modelo, vista) {
        this.modelo = modelo;
        this.vista = vista;
        this.URL = "https://examenesutn.vercel.app/api/PersonasFutbolistasProfesionales";
        this.obtenerDatos();
    
        this.vista.btnAgregar.addEventListener("click", () => this.vista.mostrarFormulario());
        this.vista.btnEnviar.addEventListener("click", (e) => {
            e.preventDefault();
            this.cargaDatos();
                });

    }

    obtenerDatos() {

        this.vista.mostrarSpinner(true);

        fetch(this.URL)
            .then (response => response.json())
            .then (data => {
                const arrayPersonas = data.map(item => {
                    if (equipo && posicion) {
                        return new Futbolista(item.id, item.nombre, item.apellido, item.edad, item.posicion, item.equipo);
                    } else if (titulo && facultad) {
                        return new Profesional(item.id, item.nombre, item.apellido, item.edad, item.titulo, item.facultad);
                    }
                })
                    this.modelo.personas = arrayPersonas;
                    this.vista.dibujarTabla(this.modelo.personas);
            })
            .catch (error => {
                console.error("Error fetching data:", error);
            })
            .finally (() => {
                console.log("Fetch completed");
                this.vista.mostrarSpinner(false);
            });
    }

    cargaDatos(){
        this.vista.mostrarSpinner(true);
        const nombre = document.getElementById("nombre").value;
        const apellido = document.getElementById("apellido").value;
        const edad = document.getElementById("edad").value;
        const equipo = document.getElementById("equipo").value;
        const posicion = document.getElementById("posicion").value;
        const titulo = document.getElementById("titulo").value;
        const facultad = document.getElementById("facultad").value;

        let persona;
        if (equipo && posicion) {
            persona = new Futbolista(this.modelo.personas.length + 1, nombre, apellido, edad, posicion, equipo);
        } else if (titulo && facultad) {
            persona = new Profesional(this.modelo.personas.length + 1, nombre, apellido, edad, titulo, facultad);
        }

        const options = {
                    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(persona)
                }

                fetch(this.URL, options)
                    .then(response => response.text())
                    .then(data => {
                        console.log("Data sent successfully:", data);

                        persona.id = JSON.parse(data).id

                        this.vista.mostrarTabla();

                        const arrai = [...this.modelo.personas, persona];
                        this.modelo.personas = arrai;

                        this.vista.dibujarTabla(this.modelo.personas);
                    })
                    .catch(error => {
                        console.error("Error sending data:", error);
                    })
                    .finally(() => {
                        this.vista.mostrarSpinner(false);
                    });
    }
        
}


const modelo = new Modelo();
const vista = new Vista();
const control = new Control(modelo, vista);