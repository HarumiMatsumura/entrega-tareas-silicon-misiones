
// ===== PARTE A: array de valores simples =====
console.log("--- PARTE A ---");
let categorias = ["Nombre", "Lanzamiento", "Tematica", "Puntuacion"];

// Pendiente: mostrar el array completo y su cantidad de elementos
console.log(categorias);
console.log("La Cantidad De Elementos Es De:", categorias.length);


// Pendiente: mostrar el primer elemento y el último (a partir de .length)
console.log('El Primer Elemento Es:', categorias[0]);
console.log('El Ultimo Elemento Es:', categorias[categorias.length - 1]);


// Pendiente: incorporar un elemento con .push()
categorias.push("Trofeo");
console.log(categorias);


// Pendiente: eliminar el último con .pop() y guardar el valor devuelto
categorias.pop();
console.log(categorias);


// ===== PARTE B: objeto =====

console.log("--- PARTE B ---");

let usuario = {
nombre: "Harumi",
edad: 26,
ciudad: "Posadas",
temaFavorito: "Dancing Queen",
};

// Pendiente: construir y mostrar una frase con las propiedades del objeto
console.log("El Nombre del Usuario Es:",usuario.nombre,"\nTiene:",usuario.edad,"Años\nVive En La Ciudad de: ",usuario.ciudad,"\nSu Tema Favorito Es: ",usuario.temaFavorito);

// Pendiente: modificar una propiedad existente
usuario.temaFavorito = "We Cant Be Friends";
console.log("El Nombre del Usuario Es:",usuario.nombre,"\nTiene:",usuario.edad,"Años\nVive En La Ciudad de: ",usuario.ciudad,"\nSu Tema Favorito Es: ",usuario.temaFavorito);

// Pendiente: incorporar una propiedad nueva
usuario["Estado Civil"] = "Soltera";
console.log(usuario);


// ===== PARTE C: array de objetos =====
console.log("--- PARTE C ---");
let catalogo = [
{
    "titulo": "El Padrino",
    "categoria": "Drama / Crimen",
    "puntaje": 9.2,
    "visto": true
  },
  {
    "titulo": "El Viaje de Chihiro",
    "categoria": "Animación / Fantasía",
    "puntaje": 8.6,
    "visto": true
  },
  {
    "titulo": "Interestelar",
    "categoria": "Ciencia Ficción / Aventura",
    "puntaje": 8.7,
    "visto": false
  },
  {
    "titulo": "Parasite",
    "categoria": "Suspenso / Drama",
    "puntaje": 8.5,
    "visto": false
  }
// Completar hasta alcanzar un mínimo de cuatro elementos
];

// Pendiente: acceso por índice
console.log("El Titulo Del Primer Elemnto Es:", catalogo[0].titulo,"\nEl Puntaje del Tercer Elemento Es:", catalogo[2].puntaje);

// Pendiente: línea descriptiva del segundo elemento
let  estado = catalogo[1].visto

if (estado = "true"){
    estado = "visto";
}else {
    estadp = "pendiente";
}

console.log(catalogo[1].titulo," - ",catalogo[1].categoria," - ",catalogo[1].puntaje," - ", estado);

// Pendiente: modificar un Puntaje
catalogo[1].puntaje = 1;
console.log(catalogo[1].titulo," - ",catalogo[1].categoria," - ",catalogo[1].puntaje," - ", estado);


// Pendiente: incorporar un quinto elemento con .push()
catalogo.push({
    "titulo": "Whiplash",
    "categoria": "Drama / Música",
    "puntaje": 8.5,
    "visto": true
});

console.log(catalogo);
console.log(catalogo.length);


// ===== PARTE D: destructuring =====



console.log("--- PARTE D ---");
// Pendiente: destructuring de objeto sobre catalogo[0]
let {titulo, categoria, puntaje, visto} = catalogo[0];

let  estado1 = visto

if (estado1 = "true"){
    estado1 = "visto";
}else {
    estado1 = "pendiente";
}

console.log(titulo," - ",categoria," - ",puntaje," - ", estado);

// Pendiente: destructuring de objeto sobre usuario
let {nombre, ciudad} = usuario
console.log("El nombre del videojuego es:", nombre,"\nLa ciudad es:", ciudad);

// Pendiente: destructuring de array para primero y segundo
let [primero,segundo] = catalogo
console.log("El primer titutlo es:",primero.titulo,"\nEl segundo titulo es:",segundo.titulo);
