const gameArea = document.getElementById('game-area');
const snakeSize = 1;
const snakeLength = 50;
let snakes = [];

// Função para criar uma cobra
function createSnake(colorClass) {
    let segments = [];
    let direction = { x: 1, y: 0 }; // Direção inicial
    let lastTimestamp = 0;

    // Cria os segmentos da cobra
    for (let i = 0; i < snakeLength; i++) {
        const segment = document.createElement('div');
        segment.classList.add('snake-segment');
        if (colorClass) segment.classList.add(colorClass); // Aplica classe de cor diferente se fornecida
        segment.style.left = `${i * snakeSize}px`;
        segment.style.top = `0px`;
        gameArea.appendChild(segment);
        segments.push(segment);
    }

    // Função para mover a cobra
    function moveSnake(timestamp) {
        if (timestamp - lastTimestamp > 700) {
            direction = getRandomDirection(); // Muda a direção a cada 3 segundos
            lastTimestamp = timestamp;
        }

        // Calcula as novas posições para cada segmento
        for (let i = segments.length - 1; i > 0; i--) {
            const prevSegment = segments[i - 1];
            segments[i].style.left = prevSegment.style.left;
            segments[i].style.top = prevSegment.style.top;
        }

        // Movimenta o primeiro segmento (cabeça da cobra)
        const head = segments[0];
        let newX = parseInt(head.style.left) + direction.x * 2;
        let newY = parseInt(head.style.top) + direction.y * 2;

        // Verifica os limites da área e faz a cobra "reaparecer" do outro lado
        if (newX >= gameArea.clientWidth) newX = 0;
        if (newX < 0) newX = gameArea.clientWidth - snakeSize;
        if (newY >= gameArea.clientHeight) newY = 0;
        if (newY < 0) newY = gameArea.clientHeight - snakeSize;

        head.style.left = `${newX}px`;
        head.style.top = `${newY}px`;

        // Solicita o próximo quadro de animação
        requestAnimationFrame(moveSnake);
    }

    // Inicia o movimento da cobra
    requestAnimationFrame(moveSnake);

    return segments;
}

// Função para gerar uma direção aleatória
function getRandomDirection() {
    const directions = [
        { x: 1, y: 0 },    // Direita
        { x: -1, y: 0 },   // Esquerda
        { x: 0, y: 1 },    // Baixo
        { x: 0, y: -1 },   // Cima
        { x: 1, y: 1 },    // Diagonal inferior direita
        { x: -1, y: -1 },  // Diagonal superior esquerda
        { x: 1, y: -1 },   // Diagonal superior direita
        { x: -1, y: 1 }    // Diagonal inferior esquerda
    ];
    return directions[Math.floor(Math.random() * directions.length)];
}

// Cria as duas cobras
snakes.push(createSnake());           
snakes.push(createSnake());

const gameArea2 = document.getElementById('game-area-2');
const pacman = document.getElementById('pacman');

pacman.style.left = '100px';
pacman.style.top = '150px'

const pacmanSize = 50;
let direction = { x: 1, y: 0 }; // Direção inicial (para direita)
let lastTimestamp = 0;

// Função para gerar uma direção aleatória
function getRandomDirectionPAC() {
    const directions = [
        { x: 1, y: 0 },    // Direita
        { x: -1, y: 0 },   // Esquerda
        { x: 0, y: 1 },    // Baixo
        { x: 0, y: -1 },   // Cima
    ];
    return directions[Math.floor(Math.random() * directions.length)];
}

// Função para mover o Pac-Man
function movePacman(timestamp) {
    if (timestamp - lastTimestamp > 1500) {
        // Muda a direção do Pac-Man a cada 3 segundos
        direction = getRandomDirectionPAC();
        lastTimestamp = timestamp;
    }

    // Movimenta o Pac-Man
    let newX = parseInt(pacman.style.left) || 0;
    let newY = parseInt(pacman.style.top) || 0;

    newX += direction.x * 2;
    newY += direction.y * 2;

    // Verifica os limites da área e faz o Pac-Man "reaparecer" do outro lado
    if (newX >= gameArea2.clientWidth) newX = 0;
    if (newX < 0) newX = gameArea2.clientWidth - pacmanSize;
    if (newY >= gameArea2.clientHeight) newY = 0;
    if (newY < 0) newY = gameArea2.clientHeight - pacmanSize;

    pacman.style.left = `${newX}px`;
    pacman.style.top = `${newY}px`;

    // Rotaciona o Pac-Man na direção do movimento
    if (direction.x === 1) {
        pacman.style.transform = 'rotate(0deg)';   // Direita
    } else if (direction.x === -1) {
        pacman.style.transform = 'rotate(180deg)'; // Esquerda
    } else if (direction.y === 1) {
        pacman.style.transform = 'rotate(90deg)';  // Baixo
    } else if (direction.y === -1) {
        pacman.style.transform = 'rotate(-90deg)'; // Cima
    }

    // Solicita o próximo quadro de animação
    requestAnimationFrame(movePacman);
}

// Inicia o movimento do Pac-Man
requestAnimationFrame(movePacman);


const gameArea3 = document.getElementById('game-area-3'); // A área que o Mario pode se mover
const mario = document.querySelector('.mario');

const gameAreaWidth = gameArea3.clientWidth; // Largura da área de jogo
let movingRight = true; // Direção inicial
let minTime = 2000; // Tempo mínimo de transição
let maxTime = 5000; // Tempo máximo de transição

// Função para mover o Mario
function moveMario() {
  const randomTime = Math.random() * (maxTime - minTime) + minTime; // Tempo aleatório de movimento
  const randomPosition = Math.random() * (gameAreaWidth - mario.offsetWidth); // Posição aleatória no eixo X, dentro da área de jogo

  // Define a direção em que o Mario está indo (virar a imagem)
  if (randomPosition > mario.offsetLeft) {
    mario.style.transform = 'scaleX(1)'; // Mario virado para a direita
  } else {
    mario.style.transform = 'scaleX(-1)'; // Mario virado para a esquerda
  }

  // Move o Mario para a nova posição, dentro da área de jogo
  mario.style.left = `${randomPosition}px`;

  // Ajusta o tempo da animação
  mario.style.transition = `left ${randomTime}ms ease-in-out`;

  // Após o movimento, chamar o próximo
  setTimeout(moveMario, randomTime);
}

// Função para fazer o Mario pular
function jumpMario() {
  const shouldJump = Math.random() > 0.5; // 50% de chance de pular
  const randomTime = Math.random() * 3000 + 2000; // Intervalo aleatório entre os pulos

  if (shouldJump) {
    mario.style.animation = 'jump 1s ease-in-out';
    setTimeout(() => {
      mario.style.animation = '';
    }, 1000);
  }

  setTimeout(jumpMario, randomTime);
}


moveMario();
jumpMario();