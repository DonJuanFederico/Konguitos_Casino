var empieza = document.getElementById("empieza");
function cambioTamanno(){
    var estiloCSS = document.createElement("style");
    estiloCSS.innerHTML = `
    #logoMovimiento {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        animation-name: fondoMueve;
        animation-duration: 2s;
        animation-direction: unset;
        animation-timing-function: ease;
        animation-iteration-count: 1;
        animation-fill-mode: forwards;
    }
    
     @keyframes fondoMueve {
         0%{left: 0; top:0}
        100% {width: 20%;height: 20%;
            left: 0; top:0;
            border: 5px solid black;
        }
     }
    `;
    document.head.appendChild(estiloCSS);
    empieza.remove()
}
empieza.addEventListener("click",cambioTamanno,true)