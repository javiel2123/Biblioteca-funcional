// Clase Autor
class Autor {
    constructor(nombre, nacionalidad) {
        this.nombre = nombre;
        this.nacionalidad = nacionalidad;
    }

    informacion() {
        console.log(`Autor: ${this.nombre}`);
        console.log(`Nacionalidad: ${this.nacionalidad}`);
    }
}

// Clase Libro
class Libro {
    constructor(titulo, autor, anioPublicacion, disponibilidad = true) {
        this.titulo = titulo;
        this.autor = autor; // Relación con la clase Autor
        this.anioPublicacion = anioPublicacion;
        this.disponibilidad = disponibilidad;
    }

    informacion() {
        console.log(`Título: ${this.titulo}`);
        console.log(`Autor: ${this.autor.nombre} (${this.autor.nacionalidad})`);
        console.log(`Año de publicación: ${this.anioPublicacion}`);
        console.log(`Disponible: ${this.disponibilidad ? 'Sí' : 'No'}`);
    }

    prestar() {
        if (this.disponibilidad) {
            this.disponibilidad = false;
            console.log(`El libro "${this.titulo}" ha sido prestado.`);
        } else {
            console.log(`El libro "${this.titulo}" no está disponible para préstamo.`);
        }
    }

    devolver() {
        this.disponibilidad = true;
        console.log(`El libro "${this.titulo}" ha sido devuelto.`);
    }
}

// Clase Biblioteca
class Biblioteca {
    constructor() {
        this.libros = []; // Lista de libros en la biblioteca
    }

    agregarLibro(libro) {
        this.libros.push(libro);
        console.log(`Libro "${libro.titulo}" agregado a la biblioteca.`);
    }

    listarLibros() {
        console.log("Lista de libros en la biblioteca:");
        this.libros.forEach(libro => libro.informacion());
    }

    buscarPorTitulo(titulo) {
        const librosEncontrados = this.libros.filter(libro => libro.titulo.toLowerCase().includes(titulo.toLowerCase()));
        console.log(`Libros encontrados con el título "${titulo}":`);
        librosEncontrados.forEach(libro => libro.informacion());
    }

    buscarPorAutor(nombreAutor) {
        const librosPorAutor = this.libros.filter(libro => libro.autor.nombre.toLowerCase().includes(nombreAutor.toLowerCase()));
        console.log(`Libros encontrados del autor "${nombreAutor}":`);
        librosPorAutor.forEach(libro => libro.informacion());
    }

    librosDisponibles() {
        const disponibles = this.libros.filter(libro => libro.disponibilidad);
        console.log("Libros disponibles para préstamo:");
        disponibles.forEach(libro => libro.informacion());
    }
}

// Crear autores
const autor1 = new Autor("Gabriel García Márquez", "Colombiano");
const autor2 = new Autor("J.K. Rowling", "Británica");

// Crear libros
const libro1 = new Libro("Cien años de soledad", autor1, 1967);
const libro2 = new Libro("Harry Potter y la piedra filosofal", autor2, 1997);
const libro3 = new Libro("El amor en los tiempos del cólera", autor1, 1985);

// Crear una biblioteca y agregar libros
const biblioteca = new Biblioteca();
biblioteca.agregarLibro(libro1);
biblioteca.agregarLibro(libro2);
biblioteca.agregarLibro(libro3);

// Listar todos los libros
biblioteca.listarLibros();

// Buscar libros por título
biblioteca.buscarPorTitulo("Harry Potter");

// Buscar libros por autor
biblioteca.buscarPorAutor("Gabriel García Márquez");

// Ver libros disponibles
biblioteca.librosDisponibles();

// Prestar un libro
libro1.prestar();

// Ver libros disponibles después de prestar
biblioteca.librosDisponibles();

// Devolver un libro
libro1.devolver();

// Ver libros disponibles después de devolver
biblioteca.librosDisponibles();
