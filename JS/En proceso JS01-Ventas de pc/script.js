
const precioMaquina = (componentes) => {
  return local.precios.reduce((totalPrecio, precioComponente) => {
    return totalPrecio = (componentes.includes(precioComponente.componente))
      ? totalPrecio + precioComponente.precio
      : totalPrecio
  }, 0);

}
const cantidadVentasComponente = (componente) => {
  const {ventas} = local  
  return ventas.reduce((vecesVendida, venta) => {
    return vecesVendida = (venta.componentes.includes(componente) ? vecesVendida + 1 : vecesVendida)
  }, 0);

}

const getSalesByDate = (month,year) => {
  const {ventas} = local  

  return ventas.filter(venta => 
    venta.fecha.getMonth() === (month -1) && venta.fecha.getFullYear() === year);
}

const vendedoraDelMes = (mes, anio) => {
  const vendedoresPrecio = getSalesByDate(mes,anio).reduce((accum, venta) => {
    accum[venta.nombreVendedora]? 
    accum[venta.nombreVendedora] += precioMaquina(venta.componentes) 
    : accum[venta.nombreVendedora] = precioMaquina(venta.componentes) 
    return accum }, {})
  return mayorDeUnObjeto(vendedoresPrecio)
}

const mayorDeUnObjeto = (objeto) => {
  const valores = Object.values(objeto);
  const indice = valores.indexOf(Math.max(...valores)); 
  return Object.keys(objeto)[indice]; 
};


const ventasMes = (mes, anio) => {  

  return getSalesByDate(mes, anio).reduce( (acc, venta) => {
    acc += precioMaquina(venta.componentes) 
    return acc
}, 0)
};



const ventasVendedora = (nombre) => {
  const { ventas } = local;

  const ventasVendedora = ventas.filter((vendedora => vendedora.nombreVendedora === nombre))

  return ventasVendedora.reduce((acc, venta) =>
   (acc += precioMaquina(venta.componentes)), 0)
}

const componenteMasVendido = () => {
  const {precios} = local

  const arrComponentes = precios.map( componente => {
      return componente.componente
  })
  

  const ventasEquipos = arrComponentes.reduce( (acc, componente, indice) => {
     
      return{...acc, [arrComponentes[indice]] : cantidadVentasComponente(componente)}

  },{})

  console.log(ventasEquipos)

  return mayorDeUnObjeto(ventasEquipos)
  
}



const huboVentas = (mes, anio) => {
  console.log(getSalesByDate(mes, anio))
 return getSalesByDate(mes, anio) == "" ? false : true
 
}

const obtenerVentasPorSucursal = (sucursal) => {

  const { ventas } = local

  return ventas.filter(venta => venta.sucursal === sucursal);

}




const ventasSucursal = (sucursal) => {
  const { ventas } = local

  const ventasPorSucursal = obtenerVentasPorSucursal(sucursal);


  return ventasPorSucursal.reduce((totalVentas, venta) => {
      return totalVentas += precioMaquina(venta.componentes);
  }, 0)
}


const sucursalDelMes = (mes, anio) => {

  const ventasPorFecha = getSalesByDate(mes, anio);

  const ventasSucursal = ventasPorFecha.reduce((accum, venta) => {
      accum[venta.sucursal]
          ? accum[venta.sucursal] += precioMaquina(venta.componentes)
          : accum[venta.sucursal] = precioMaquina(venta.componentes)
      return accum
  }, {})

  // console.log(mayorDeUnObjeto(ventasSucursal));

  return mayorDeUnObjeto(ventasSucursal);

}

const vendedoraEstrella = () => {

  const { ventas } = local;

  const vendedora = ventas.reduce((accum, venta) => {
      accum[venta.nombreVendedora]
          ? accum[venta.nombreVendedora] += precioMaquina(venta.componentes)
          : accum[venta.nombreVendedora] = precioMaquina(venta.componentes)
      return accum
  }, {})

  return mayorDeUnObjeto(vendedora)

};

/* 
yo lo pensé asi:primero me hice un array con los nombres de todos los componentes... use map para eso... es la constante que se llama arrCOmponentes
De belu para Todos: (12:42 p. m.)
-después le hice un reduce a ese arrCOmponentes, pedi me devuvel un objeto..l donde la llave de cada ítem del objeto sea el nombre del componente. el valor de esa llave sea la cantidad de ventas que tuvo
De belu para Todos: (12:42 p. m.)
-para saber cuantas ventas tuvo.. use la función cantidadVentasComponente(componente)---- la constabnte ventasEquipo me devulve el siguiente objeto:
De belu para Todos: (12:43 p. m.)
"HDD Toyiva": 0
"HDD Wezter Dishital": 0
"Monitor ASC 543": 2
"Monitor GPRS 3000": 3
"Motherboard ASUS 1200": 2
"Motherboard ASUS 1500": 2
"Motherboard MZI": 1
"RAM Quinston": 0
"RAM Quinston Fury": 0
De belu para Todos: (12:43 p. m.)
entocnes yo se q Monitor GPRS 3000
fue el q mas se vendiosolo me faltaba recorrer el objeto y que me devulva el Key del ítem de mi objeto ("Monitor GPRS 3000
")key = Monitor GPRS 3000
valor de esa key = 3


*/