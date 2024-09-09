const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set up canvas dimensions
const resizeCanvas = () => {
    canvas.width = Math.min(window.innerWidth * 0.8, 400);
    canvas.height = canvas.width;
};
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Game variables
const unitSize = 20;
let snake = [{ x: unitSize * 5, y: unitSize * 5 }];
let direction = { x: 0, y: 0 };
let food = { x: getRandomCoordinate(), y: getRandomCoordinate() };
let score = 0;
let highScore = localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore')) : 0;
let gameRunning = false;

// DOM elements
const startMenu = document.getElementById("startMenu");
const gameOverMenu = document.getElementById("gameOverMenu");
const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("highestScore");
const finalScoreDisplay = document.getElementById("finalScore");
const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");

// Load the apple image
const foodImage = new Image();
foodImage.src = "image.png";
foodImage.onload = function() {
    console.log("Apple image loaded successfully");
};

// Event listeners
startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", restartGame);
window.addEventListener("keydown", changeDirection);

function startGame() {
    startMenu.style.display = "none";
    canvas.style.display = "block";
    document.querySelector(".game-info").style.display = "block";
    gameRunning = true;
    score = 0;
    snake = [{ x: unitSize * 5, y: unitSize * 5 }];
    direction = { x: 0, y: 0 };
    food = { x: getRandomCoordinate(), y: getRandomCoordinate() };
    scoreDisplay.textContent = `Score: ${score}`;
    highScoreDisplay.textContent = `High Score: ${highScore}`;
    gameLoop();
}

function restartGame() {
    gameOverMenu.style.display = "none";
    startGame();
}

// Main game loop
function gameLoop() {
    if (!gameRunning) return;

    setTimeout(() => {
        if (isGameOver()) {
            endGame();
        } else {
            moveSnake();
            checkFoodCollision();
            render();
            gameLoop();
        }
    }, 100);
}

function render() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the snake
    snake.forEach((segment, index) => {
        if (index === 0) {
            drawSnakeHead(segment);
        } else {
            drawSnakeBody(segment);
        }
    });

    // Draw the food (apple)
    ctx.drawImage(foodImage, food.x, food.y, unitSize, unitSize);
}

// Draw the snake head
function drawSnakeHead(segment) {
    ctx.fillStyle = "#0000ff"; // Blue for head
    ctx.beginPath();
    ctx.arc(segment.x + unitSize / 2, segment.y + unitSize / 2, unitSize / 2, 0, Math.PI * 2);
    ctx.fill();
}

// Draw the snake body segments
function drawSnakeBody(segment) {
    ctx.fillStyle = "#66b2ff"; // Lighter blue for body
    ctx.fillRect(segment.x, segment.y, unitSize, unitSize);
    ctx.strokeStyle = "#0066ff"; // Outline for body
    ctx.strokeRect(segment.x, segment.y, unitSize, unitSize);
}

// Move the snake
function moveSnake() {
    const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(newHead);
    snake.pop();
}

// Change the snake's direction based on arrow key inputs
function changeDirection(event) {
    const keyPressed = event.key;

    if (keyPressed === "ArrowUp" && direction.y === 0) {
        direction = { x: 0, y: -unitSize };
    } else if (keyPressed === "ArrowDown" && direction.y === 0) {
        direction = { x: 0, y: unitSize };
    } else if (keyPressed === "ArrowLeft" && direction.x === 0) {
        direction = { x: -unitSize, y: 0 };
    } else if (keyPressed === "ArrowRight" && direction.x === 0) {
        direction = { x: unitSize, y: 0 };
    }
}

// Check if snake collides with food
function checkFoodCollision() {
    if (snake[0].x === food.x && snake[0].y === food.y) {
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        food = { x: getRandomCoordinate(), y: getRandomCoordinate() };
        snake.push({}); // Extend the snake

        // Update high score if necessary
        if (score > highScore) {
            highScore = score;
            highScoreDisplay.textContent = `High Score: ${highScore}`;
            localStorage.setItem('highScore', highScore); // Store high score in localStorage
        }
    }
}

// Check if the snake collides with the wall or itself
function isGameOver() {
    if (snake[0].x < 0 || snake[0].x >= canvas.width || snake[0].y < 0 || snake[0].y >= canvas.height) {
        return true;
    }

    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }

    return false;
}

// End the game and display the game over menu
function endGame() {
    gameRunning = false;
    gameOverMenu.style.display = "block";
    finalScoreDisplay.textContent = `Your final score is ${score}`;
}

// Generate random coordinates for food (aligned to the grid)
function getRandomCoordinate() {
    return Math.floor(Math.random() * (canvas.width / unitSize)) * unitSize;
}
