// /Libro.js

class Libro {
    constructor(titulo, autor, anio, disponibilidad = true) {
      this.titulo = titulo;
      this.autor = autor; // instancia de Autor
      this.anio = anio;
      this.disponibilidad = disponibilidad;
    }
  
    informacion() {
      return `${this.titulo} por ${this.autor.informacion()} (${this.anio})`;
    }
  
    prestar() {
      this.disponibilidad = false;
    }
  
    devolver() {
      this.disponibilidad = true;
    }
  }
  
  module.exports = Libro;
  