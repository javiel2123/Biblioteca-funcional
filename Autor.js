// /Autor.js

class Autor {
    constructor(nombre, nacionalidad) {
      this.nombre = nombre;
      this.nacionalidad = nacionalidad;
    }
  
    informacion() {
      return `${this.nombre}, ${this.nacionalidad}`;
    }
  }
  
  module.exports = Autor;
  