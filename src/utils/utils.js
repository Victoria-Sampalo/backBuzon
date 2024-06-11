const calcularPrecio=(listajuegos)=>{
    let total=0;
    for (const juego of listajuegos) {
        total+=(juego.quantity*juego.price)   
    }
    return total
}
const obtenerNombreMes = () => {
    const meses = [
      "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO",
      "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"
    ];
    const fechaActual = new Date();
    const mes = fechaActual.getMonth();
    return meses[mes];
  };

module.exports = {
    calcularPrecio, obtenerNombreMes
  };