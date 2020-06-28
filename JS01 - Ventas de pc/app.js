const tablaBody = document.querySelectorAll(".table--body");
const btnNuevaVenta = document.querySelector(".btn--sale");

const modal = document.querySelector("#modal");
const modalContent = document.querySelector("#modalContent");
const btnModal = document.querySelector("#btnModal");
const close = document.querySelector("#close");


const vendedora = document.querySelector("#vendedora");
const componentes = document.querySelector("#componentes");
const sucursal = document.querySelector("#sucursal");


const btnConfirm = document.querySelector("#btnConfirm");

// const generarOptions = (option) => {
//   option.innerHTML = 
// }


btnModal.addEventListener("click", () =>{
  modal.classList.replace("fade", "show")
  modalContent.classList.add("active")
})

const newSale = (obj) =>{

  local.ventas.push(obj);
  createMainTable()

}

btnConfirm.addEventListener("click", () =>{

  const nuevaVenta = {
    id: 6,
    fecha: new Date(),
    nombreVendedora: vendedora.options[vendedora.selectedIndex].value,
    sucursal: sucursal.options[sucursal.selectedIndex].value,
    componentes:   [...componentes.options].filter(option => option.selected).map(option => option.value),
  };


 console.log(nuevaVenta, "aca!")
  newSale(nuevaVenta);
  modal.classList.replace("show", "fade")
})

const dateFormat = (date) => {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

const createMainTable = () => {
  const {ventas} = local
  
  tablaBody[0].innerHTML = ventas.reduce((html, empleado) => {
      console.log(empleado)
    return (
      html +
      `<tr>
          <td >${dateFormat(empleado.fecha)}</td>
          <td>${empleado.nombreVendedora}</td>
          <td>${empleado.sucursal}</td>
          <td>${empleado.componentes}</td>
          <td>${precioMaquina(empleado.componentes)}</td>
          <td class="bin-icon">
          <i onclick="deleteSale(${empleado.id})" class="fas fa-trash"></i>
          </td>
          </tr>
      </tr>
        `
    ); 
  }, "");
};



const createSecondaryTable = () => {
  const {sucursales} = local

  tablaBody[1].innerHTML = sucursales.reduce((html, sucursal) => {
    return (
      html + `
      <tr>
            <td >${sucursal}</td>
            <td>${ventasSucursal(sucursal)}</td>
      </tr>
      `
    )
  }, "")
};


// funcion para generar el nombre de la vendedora estrella

const bestSellerName = () => {

  const mejorVendedora = document.querySelector(".mejor_vendedora");

  mejorVendedora.textContent = `${vendedoraEstrella()}`;

}

const bestProductName = () => {
  const bestProduct = document.querySelector(".mejor_producto");

  bestProduct.textContent = componenteMasVendido();

}

const deleteSale = (id) => {

  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.value) {
      local.ventas = local.ventas.filter((venta) => {
        return venta.id !== id;
      });
      createMainTable();

      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })


};

const venta = {
  id: 6,
  fecha: new Date(2019, 1, 4),
  nombreVendedora: "Camila",
  sucursal: "Centro",
  componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"],
}



btnNuevaVenta.addEventListener("click", () => {
  newSale(venta)
});









createMainTable()
createSecondaryTable()
bestProductName()
bestSellerName()
