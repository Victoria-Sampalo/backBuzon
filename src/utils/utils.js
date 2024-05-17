const calcularPrecio=(listajuegos)=>{
    let total=0;
    for (const juego of listajuegos) {
        total+=(juego.quantity*juego.price)   
    }
    return total
}


module.exports = {
    calcularPrecio
  };