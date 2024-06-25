//let titulo = document.querySelector('h1');
// titulo.innerHTML = 'Jogo do número secreto';

//let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha um número entre 1 e 10';

/* 1. `let titulo = document.querySelector('h1');` - Essa linha seleciona o elemento HTML com a tag `<h1>`
 e armazena uma referência a ele na variável `titulo`. 
 2. `titulo.innerHTML = 'jogo do numero secreto';` Essa linha altera o conteúdo interno 
 (innerHTML) do elemento `>` selecionado, substituindo o texto original  pelo novo texto 
 provavelmente não encontrará funções como innerHTML e querySelector 
 em outras linguagens de programação. é específico do JavaScript.  
 https://github.com/alura-cursos/js-curso-2/blob/aula_2/app.js */

let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

exibirMensagemInicial();

function exibirMensagemInicial() {
exibirTextoNaTela('h1', 'Jogo do número secreto');
exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
exibirTextoNaTela('h2', 'Desenvolvimento Cursos - Alura');
}

function exibirTextoNaTela(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function verificarChute() {
  let chute = document.querySelector('input').value;
  if (chute == numeroSecreto) {
    exibirTextoNaTela('h1', 'Acertou!');
    let palavraTentativa = tentativas > 1 ? 'tentativas': 'tentativa'; // se maior que 1 escolhe a palavra certa
    let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`; 
    exibirTextoNaTela('p', mensagemTentativas);
    document.getElementById('reiniciar').removeAttribute('disabled'); // obs 3 habilitar o botão 
  } else {
      if (chute > numeroSecreto) {
        exibirTextoNaTela('p', 'O número secreto é menor');
      } else {
        exibirTextoNaTela('p', 'O número secreto é maior');
      }
      tentativas++;
      limparCampo();
  }
}

function gerarNumeroAleatorio() {
  let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);  
  let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
        }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {  
        return gerarNumeroAleatorio();  // obs 1
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);  // obs 2
        return numeroEscolhido;
    }
}

// includes especifico javascript
/*  Uma array no JavaScript é uma estrutura de dados que permite armazenar 
e organizar vários valores em uma única variável. Os valores em uma array 
podem ser de qualquer tipo de dado,  como números, strings, objetos, 
outras arrays e assim por diante.
obs1 : Se o número já foi sorteado, fazemos algo chamado recursão, ou seja, 
chamaremos a própria função gerarNumeroAleatorio() novamente, gerando um novo número aleatório.
Com isso, ele verificará novamente se aquele número já foi escolhido ou não.
obs2: Para adicionar um elemento ao final da array, você pode usar o método push. 
Para remover o último elemento, você pode usar o método pop.
Os elementos de uma array são acessados usando índices numéricos, que começam em 0.*/

function limparCampo() {
  chute = document.querySelector('input');
  chute.value = '';
}

function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  limparCampo();
  tentativas = 1;
  exibirMensagemInicial();
}

/*obs2: document.getElementById('reiniciar').removeAttribute('disabled'); 
Existem dois botões, então se definirmos document.querySelector("button"), 
como estávamos fazendo antes,o código provavelmente selecionará o 
primeiro botão ao buscar entre todos os elementos.
Repare que o segundo botão possui uma característica diferente, o id="reiniciar".*/

// Listas - Arrays sempre [ ]