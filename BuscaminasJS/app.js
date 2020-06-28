// **Buscaminas**

// - Crear un programa que dado un array 2d permita ingresar una coordenada (representando los índices del array), y mostrar si era una casilla vacía o tenía una mina. En caso de que tenga una casilla vacía, debe poder seguir jugando e ingresando casillas. Si descubre todas las casillas vacías o elige una con una mina, el juego debe terminar, e indicar si perdió o ganó. Las minas y casillas vacías (ocultas y descubiertas) pueden representarse con emojis con con números o letras.

const tablero =
  [
    ['1', '💣', '💣'],
    ['1', '2', '2'],
    ['💣', '1', '0']
  ]

const casilla = document.querySelectorAll(".casilla");
const texto = document.getElementById("texto");
const resultado = document.getElementById("resultado");
const btn = document.getElementById("btn");
const cantidad = document.getElementById("cantidad");
const vidas = document.getElementById("vidas");

let jugable = true;
let contador = 0;
let vidaActual = 2;

const restaVida = () => {
  if (vidaActual > 0) {
    vidaActual--;
    vidas.textContent = vidaActual;
  }
  if (vidaActual <= 0) {
    jugable = false;
  }

};

const buscaminas = (coor1, coor2) => {
  if (jugable) {
    let coordenadaIngresada = tablero[coor1][coor2];

    if (coordenadaIngresada == "💣") {

      event.target.textContent = "💥";
      texto.textContent = "¡Oh no!¡Has encontrado una bomba!";
      resultado.textContent = "Perdiste!😣";
      restaVida();

    } else {
      event.target.textContent = "💨";
      texto.textContent = "La caja está vacía!"
      cantidad.style.color = "black";
      cantidad.style.backgroundColor = "lightyellow";
      cantidad.textContent = `** CUIDADO! ${tablero[coor1][coor2]} 💣 cerca! **`;
      event.target.disabled = true;
      contador++;
      console.log(contador);
      if (contador >= 6) {
        jugable = false;
        resultado.textContent = "Ganaste!!😃";
      }
    }
  }
};

btn.addEventListener("click", () => {
  window.location.reload();
});

// 📦 📦 📦
// 📦 📦 📦
// 📦 📦 📦

// Ingrese una coordenada: 0,0
// La caja está vacía!

// 💨 📦 📦
// 📦 📦 📦
// 📦 📦 📦

// Ingrese una coordenada: 0,1
// ¡Oh no!¡Has encontrado una bomba!

// 💨 💥 📦
// 📦 📦 📦
// 📦 📦 📦