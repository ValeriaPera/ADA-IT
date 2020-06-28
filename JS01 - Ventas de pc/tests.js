describe ( "Lista de ventas", () => {
  it("precioMaquina(componentes): recibe un array de componentes y devuelve el precio de la máquina que se puede armar con esos componentes, que es la suma de los precios de cada componente incluido. -Ej01", () => {
    const componentes = ["Monitor GPRS 3000", "Motherboard ASUS 1500"]

    expect(precioMaquina(componentes)).to.be.eql(320);
  });

  it("cantidadVentasComponente(componente): recibe un componente y devuelve la cantidad de veces que fue vendido, o sea que formó parte de una máquina que se vendió. La lista de ventas no se pasa por parámetro, se asume que está identificada por la variable `ventas`. -Ej02", () => {

    const componente = "Monitor GPRS 3000"

 expect(cantidadVentasComponente(componente)).to.be.eql(3);
  });

  it("**vendedoraDelMes(mes, anio)** devuelve el nombre de la vendedora que más vendió en plata en el mes. O sea no cantidad de ventas, sino importe total de las ventas. El importe de una venta es el que indica la función `precioMaquina`. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).", () => {
    const mes = 1;
    const anio = 2019;

    expect(vendedoraDelMes(mes, anio)).to.be.eql("Ada");
  });

  it("ventasMes(mes, anio)**: Obtener las ventas de un mes. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre). -Ej04", () => {

    const mes = 1;
    const anio = 2019;

    expect(ventasMes(mes, anio)).to.be.eql(1250);
  });

  it("ventasVendedora(nombre): Obtener las ventas totales realizadas por una vendedora sin límite de fecha. Ej 05", () => {

    expect(ventasVendedora("Grace")).to.be.eql(900);
  });
  it("componenteMasVendido(): Devuelve el nombre del componente que más ventas tuvo historicamente. El dato de la cantidad de ventas es el que indica la función `cantidadVentasComponente -Ej06", () => {

    expect(componenteMasVendido()).to.be.eql("Monitor GPRS 3000");
    });

    it("huboVentas(mes, anio): que indica si hubo ventas en un mes determinado.El mes es un número entero que va desde el 1(enero) hasta el 12(diciembre) -Ej07", () => {
      const mes = 3;
      const anio = 2019;

      expect(huboVentas(mes, anio)).to.be.eql(false);
  });
  it("ventasSucursal(sucursal): obtiene las ventas totales realizadas por una sucursal sin límite de fecha -Ej08 (PARTE 2)", () => {
    const sucursal = "Centro";

    expect(ventasSucursal(sucursal)).to.be.eql(990);
});

it("sucursalDelMes(mes, anio), que se le pasa dos parámetros numéricos, (mes, anio) y devuelve el nombre de la sucursal que más vendió en plata en el mes. -Ej09 (PARTE 2)", () => {
  const mes = 1;
  const anio = 2019;

  expect(sucursalDelMes(mes, anio)).to.be.eql("Centro");
})


})