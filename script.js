let puntosUsuario = 0;
let puntosPC = 0;

let instrucciones = document.querySelector("#instrucciones");
let contenedorPuntosUsuario = document.querySelector("#puntos-usuario");
let contenedorPuntosPC = document.querySelector("#puntos-computadora");
let mensaje = document.querySelector("#mensaje");
let contenedorGanaPunto = document.querySelector("#gana-punto");
let elegiTuArma = document.querySelector("#elegi-tu-arma");

let contenedorEleccionUsuario = document.querySelector("#eleccion-usuario");
let contenedorEleccionPC = document.querySelector("#eleccion-computadora");
let botonesArmas = document.querySelectorAll(".arma"); //Llamamos a todas las armas(piedra papel y tijera)
let reiniciar = document.querySelector("#reiniciar");

botonesArmas.forEach(boton=>{ //Foreach para recorrer ese array
    boton.addEventListener("click",iniciarTurno);
});

function iniciarTurno (e) {
    let eleccionPC = Math.floor(Math.random()*3); //Numero aleatorio entre 0 y 2 pero lo estamos redondeando con el math.floor-->Siempre hacia abajo redondea
    // console.log(eleccionPC);
    let eleccionUsuario = e.currentTarget.id; 
    // console.log(eleccionUsuario); //Devuelve el ID del boton que apretamos -->Es lo que elegimos nosotros

    //Ahora: piedra va a ser 0, papel va a ser 1 y tijera va a ser 2... Por eso hicimos el math random

    if(eleccionPC === 0) {
        eleccionPC = "piedra💎";
    }
    else if(eleccionPC === 1){
        eleccionPC = "papel📋";
    }
    else if(eleccionPC === 2) {
        eleccionPC = "tijera✂";
    }
    // console.log("Usuario: " + eleccionUsuario);
    // console.log("PC: " + eleccionPC);

    //Sabemos que:

    //Piedra vence a tijera
    //Tijera vence a papel
    //Papel vence a piedra
    //Iguales es empate

    if(
        (eleccionUsuario==="piedra💎" && eleccionPC === "tijera✂") || 
        (eleccionUsuario === "tijera✂" && eleccionPC === "papel📋") ||
        (eleccionUsuario === "papel📋" && eleccionPC === "piedra💎")

    ) {
        ganaUsuario(); //Si se cumple alguna de las 3 condiciones, llamamos a esta funcion
    }
    else if(
        (eleccionPC==="piedra💎" && eleccionUsuario === "tijera✂") || 
        (eleccionPC === "tijera✂" && eleccionUsuario === "papel📋") ||
        (eleccionPC === "papel📋" && eleccionUsuario === "piedra💎")

    ) {
        ganaPC(); //Si se cumple esto llamamos a la funcion de gana la pc
    }
    else{
        empate(); //Sino hay empate
    }
    mensaje.classList.remove("disabled"); //Al hacer click en cualquier arma, aparecera el div de mensaje
    contenedorEleccionUsuario.innerText = eleccionUsuario; //Le guardamos el id que apretemos

    contenedorEleccionPC.innerText = eleccionPC; //que sera aleatorio

    if(puntosUsuario === 5 || puntosPC === 5) { //Para que el juego sea hasta 5 puntos
        if(puntosUsuario === 5) {
            instrucciones.innerText = "🔥¡Ganaste el juego!🔥"
        }
        if(puntosPC === 5) {
            instrucciones.innerText = "😢¡La computadora gano el juego!😢";
        }
        elegiTuArma.classList.add("disabled"); //Para que al llegar a 5 se oculten las armas, para no seguir jugando
        reiniciar.classList.remove("disabled"); //Que aparezca el boton de reiniciar juego
        reiniciar.addEventListener("click",reiniciarJuego);

    }

}

function ganaUsuario () {

    puntosUsuario++; //Incrementamos nuestro contador de puntos para el usuario en caso de que gane
    contenedorPuntosUsuario.innerText = puntosUsuario; //Reemplazamos para que aparezca en el numerito y se vaya incrementando
    contenedorGanaPunto.innerText = "¡Ganaste un punto!🔥"; //En caso de que gane el usuario

}
function ganaPC () {
    puntosPC++;
    contenedorPuntosPC.innerText = puntosPC; //Para que se vaya mostrando en el contador
    contenedorGanaPunto.innerText = "¡La computadora gano un punto!😢"; //Si gana la pc
}
function empate () {
    contenedorGanaPunto.innerText = "¡Empate! 😯";
}

function reiniciarJuego () {
    reiniciar.classList.add("disabled"); //Que al darle click a reiniciar vuelva a desaparecer el boton
    elegiTuArma.classList.remove("disabled"); //Que aparezcan las armas
    mensaje.classList.add("disabled"); 
    puntosUsuario = 0; //Para reiniciar los puntos
    puntosPC = 0;

    contenedorPuntosUsuario.innerText = puntosUsuario; //Para que aparezca el resultado
    contenedorPuntosPC.innerText = puntosPC;

    instrucciones.innerText="El primero en llegar a 5 puntos gana.";

}