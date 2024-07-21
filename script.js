// script.js
const boardSize = 20;
const gameBoard = document.getElementById('gameBoard');
const scoreElement = document.getElementById('score');

let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: 15, y: 15 };
let score = 0;

document.addEventListener('keydown', changeDirection);
setInterval(updateGame, 100);

function updateGame() {
    moveSnake();
    if (isCollision()) {
        alert('Game Over!');
        resetGame();
    }
    if (isFoodEaten()) {
        growSnake();
        spawnFood();
        updateScore();
    }
    renderGame();
}

function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);
    snake.pop();
}

function changeDirection(event) {
    switch (event.keyCode) {
        case 37: // left arrow
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case 38: // up arrow
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case 39: // right arrow
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
        case 40: // down arrow
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
    }
}

function isCollision() {
    const head = snake[0];
    return (
        head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    );
}

function isFoodEaten() {
    const head = snake[0];
    return head.x === food.x && head.y === food.y;
}

function growSnake() {
    const tail = snake[snake.length - 1];
    snake.push(tail);
}

function spawnFood() {
    food = {
        x: Math.floor(Math.random() * boardSize),
        y: Math.floor(Math.random() * boardSize)
    };
}

function updateScore() {
    score += 10;
    scoreElement.textContent = score;
}

function renderGame() {
    gameBoard.innerHTML = '';
    snake.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.style.left = `${segment.x * 20}px`;
        snakeElement.style.top = `${segment.y * 20}px`;
        snakeElement.classList.add('snake');
        gameBoard.appendChild(snakeElement);
    });
    const foodElement = document.createElement('div');
    foodElement.style.left = `${food.x * 20}px`;
    foodElement.style.top = `${food.y * 20}px`;
    foodElement.classList.add('food');
    gameBoard.appendChild(foodElement);
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 };
    food = { x: 15, y: 15 };
    score = 0;
    scoreElement.textContent = score;
}
