// /api/index.js

const express = require('express');
const bodyParser = require('body-parser');
const Autor = require('../Autor');
const Libro = require('../Libro');

const app = express();
app.use(bodyParser.json());

// Clase Biblioteca  controlador
class Biblioteca {
  constructor() {
    this.libros = [];
  }

  agregarLibro(libro) {
    this.libros.push(libro);
  }

  listarLibros() {
    return this.libros.map((libro, index) => ({
      id: index + 1,
      titulo: libro.titulo,
      autor: libro.autor.informacion(),
      anio: libro.anio,
      disponibilidad: libro.disponibilidad,
    }));
  }

  buscarPorTitulo(titulo) {
    return this.libros.filter((libro) =>
      libro.titulo.toLowerCase().includes(titulo.toLowerCase())
    );
  }

  buscarPorAutor(nombreAutor) {
    return this.libros.filter((libro) =>
      libro.autor.nombre.toLowerCase().includes(nombreAutor.toLowerCase())
    );
  }

  librosDisponibles() {
    return this.libros.filter((libro) => libro.disponibilidad);
  }

  librosNoDisponibles() {
    return this.libros.filter((libro) => !libro.disponibilidad);
  }
}

// Instancia de la biblioteca
const biblioteca = new Biblioteca();

// Agregar libros
biblioteca.agregarLibro(
  new Libro("Cuentos Escritos en el Exilio", new Autor("Juan Bosch", "Dominicana"), 1962)
);
biblioteca.agregarLibro(
  new Libro("La Mañosa", new Autor("Juan Bosch", "Dominicana"), 1936)
);
biblioteca.agregarLibro(
  new Libro("Poema en veinte surcos", new Autor("Julia de Burgos", "Dominicana"), 1938)
);
biblioteca.agregarLibro(
  new Libro("El Hijo de la Lluvia", new Autor("Alicia L. Rodríguez", "Dominicana"), 2015)
);
biblioteca.agregarLibro(
  new Libro("La Fiesta del Chivo", new Autor("Mario Vargas Llosa", "Peruana-Dominicana"), 2000)
);

// Ruta de bienvenida
app.get("/", (req, res) => {
  res.send("Este es mi API - Javiel Alexander Hidalgo 2-EISN-2-019");
});

// Listar todos los libros
app.get("/libros", (req, res) => {
  res.json(biblioteca.listarLibros());
});

// Listar libros disponibles
app.get("/libros/disponibles", (req, res) => {
  const disponibles = biblioteca.librosDisponibles();
  res.json(disponibles.map((libro) => libro.informacion()));
});

// Listar libros no disponibles
app.get("/libros/nodisponibles", (req, res) => {
  const noDisponibles = biblioteca.librosNoDisponibles();
  res.json(noDisponibles.map((libro) => libro.informacion()));
});

// Buscar libros por título
app.get("/libros/titulo/:titulo", (req, res) => {
  const { titulo } = req.params;
  const libros = biblioteca.buscarPorTitulo(titulo);
  libros.length
    ? res.json(libros.map((libro) => libro.informacion()))
    : res.status(404).send("No se encontraron libros con ese título.");
});

// Buscar libros por autor
app.get("/autores", (req, res) => {
  const autores = [
    ...new Set(biblioteca.libros.map((libro) => libro.autor.informacion())),
  ];
  res.json(autores);
});

// Prestar un libro
app.get("/libros/prestar/:id", (req, res) => {
  const { id } = req.params;
  const index = parseInt(id) - 1;
  if (biblioteca.libros[index]) {
    biblioteca.libros[index].prestar();
    res.send(`El libro "${biblioteca.libros[index].titulo}" fue prestado.`);
  } else {
    res.status(404).send("Libro no encontrado.");
  }
});

// Devolver un libro
app.get("/libros/devolver/:id", (req, res) => {
  const { id } = req.params;
  const index = parseInt(id) - 1;
  if (biblioteca.libros[index]) {
    biblioteca.libros[index].devolver();
    res.send(`El libro "${biblioteca.libros[index].titulo}" fue devuelto.`);
  } else {
    res.status(404).send("Libro no encontrado.");
  }
});
const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Exportar la función para Vercel
module.exports = app;
