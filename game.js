import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection, snakeSize } from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'
import { outsideGrid } from './grid.js'

let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById('game-board')

function main(currentTime) {
    if(gameOver) {
        if(confirm(`Your score was ${snakeSize()}. Press ok to restart.`)) {
            window.location = '/'
        }
        return
    }

    window.requestAnimationFrame(main)
    const seconsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if(seconsSinceLastRender < 1/SNAKE_SPEED) return

    
    lastRenderTime = currentTime
    // console.log(currentTime);

    update()
    draw()
}

function update() {
    updateSnake()
    updateFood()
    checkDeath()
}

function draw() {
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}

window.requestAnimationFrame(main)