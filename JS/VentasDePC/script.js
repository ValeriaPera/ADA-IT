// TABLA VENTAS POR SUCURSAL

const tablaVentasPorSucursal = document.getElementById("tablaVentasPorSucursal");

const tableTitle = (value) => {
  return `<h2>${value}.</h2>`

}
const cell = (value, typeOfCell) => {
  let scope = "";
  if (typeOfCell === "th") {
    scope = `scope = "col"`
  } else {
    scope = "";
  }
  return ` <${typeOfCell} ${scope}>${value}.</${typeOfCell}>`

}

const table = () => {

}

const headers = ["Sucursal", "Total ventas"]
const headerTable = (arrHeader) => {
  return (
    ` <tr>
  ${arrHeader.map(item => cell(item, "th"))}
    </tr>
  `)
}

tablaVentasPorSucursal.innerHTML =
  `${tableTitle("Ventas por sucursal")}
  
  <table class="table table-striped table-dark">
    ${headerTable(headers)}  
      
    <tr>
      ${cell("Centro", "td")}
      ${cell("900", "td")}
    </tr>
    <tr>
        ${cell("Caballito", "td")}
      ${cell("580", "td")}
    </tr>
  </table>`



// INICIALIZACION