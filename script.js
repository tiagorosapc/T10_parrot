
let qtdeCartas;

const cartas = [
    'bobrossparrot',
    'explodyparrot',
    'fiestaparrot',
    'metalparrot',
    'revertitparrot',
    'tripletsparrot',
    'unicornparrot'
];

const baralho = [];

let primeiraCarta, segundaCarta;

let jogadas = 0;

let acertos = 0;

let tempo = 0;

let idInterval;

function verificarFinalJogo(){
    if ( acertos === baralho.length ){
        setTimeout(finalizarJogo, 500);
    }
}

function finalizarJogo(){
    
    clearInterval(idInterval);

    alert(`Você ganhou em ${jogadas} jogadas! A duração do jogo foi de ${tempo} segundos!`);

    //const fim = prompt('Gostaria de jogar novamente');
    const fim = confirm('Gostaria de jogar novamente');

    if ( fim === true){
        window.location.reload(true);
    }
}

function virarCartas(){
    primeiraCarta.classList.remove('virada');
    segundaCarta.classList.remove('virada');
    
    resetarCartas();
}

function resetarCartas(){
    primeiraCarta = undefined;
    segundaCarta = undefined;
}

function desvirarCarta(carta){
    
    if ( carta.classList.contains('virada') ){
        return;
    }

    if( primeiraCarta !== undefined  && segundaCarta !== undefined){
        return;
    }

    carta.classList.add('virada');

    jogadas++;

    if ( primeiraCarta === undefined ){
        primeiraCarta = carta;
    }else{
        if ( segundaCarta === undefined){
            segundaCarta = carta;

            // logica da comparação
            if ( primeiraCarta.innerHTML === segundaCarta.innerHTML){
                // CARTAS SÃO IGUAIS  
                acertos+=2;                             
                resetarCartas();
                verificarFinalJogo();
            }else{
                //CARTAS SÃO DIFERENTES
                setTimeout(virarCartas, 1000);                
            }
        }
    }
    console.log(primeiraCarta);
    
    console.log(segundaCarta);

}

function renderizarBaralho(){

    const tabuleiro = document.querySelector('.tabuleiro');

    for( let i = 0; i < baralho.length; i++){

        let template = `
            <li class="carta" onclick="desvirarCarta(this)">
                <div class='front-face face'>
                    <img src='imagens/front.png'>
                </div>
                <div class='back-face face'>
                    <img src='imagens/${baralho[i]}.gif'>
                </div>
            </li>          
        `;

        tabuleiro.innerHTML = tabuleiro.innerHTML + template;

    }

}


function comparador() { 
	return Math.random() - 0.5;
}

function gerarBaralho(){

    // qtdeCartas = 6 / 2 -> 3

    for( let i = 0; i < qtdeCartas / 2; i++ ){
        let carta = cartas[i];

        baralho.push(carta);
        baralho.push(carta);
    }
   
    baralho.sort(comparador);

    renderizarBaralho();
} 

function jogoInvalido(){
    
    if ( qtdeCartas % 2 === 1 || qtdeCartas < 4 || qtdeCartas > 14 || isNaN(qtdeCartas) ){
        return true;
    }
    return false;
}

function timer(){
    const relogio = document.querySelector('.relogio');
    
    tempo++;
    
    relogio.innerHTML = tempo;
    
}

function iniciarJogo(){
    
    qtdeCartas = Number(prompt('qtde de cartas?'));

    // verificar se qtdeCartas é par
    // qtdeCartas >= 4
    // qtdeCartas <= 14
    // tem que ser numero

    while( jogoInvalido() ){
        qtdeCartas = Number(prompt('Com quantas cartas você quer jogar?'));
    }

    idInterval = setInterval(timer, 1000);

    gerarBaralho();

}

iniciarJogo();