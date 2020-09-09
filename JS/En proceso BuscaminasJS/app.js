// **Buscaminas**

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
      texto.textContent = "Una bomba!";
      resultado.textContent = "Perdiste!😣";
      restaVida();


    }
    
    else {
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