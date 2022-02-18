import "./input.js"
import { inputBuffer } from "./input.js"


class player {
    constructor(colour, nodes, controls) {
        this.colour = colour
        this.nodes = nodes
        this.currentDirection = {x: 0, y: 0}
        this.inputBuffer = [{ x : 0, y : 0}]
        this.controls = controls
    }
}


let arrowControls = {up: 'ArrowUp', down: 'ArrowDown', left: 'ArrowLeft', right: 'ArrowRight'}
let wasdControls = {up: 'w', down: 's', left: 'a', right: 'd'}

export let playerOne = new player("red", [{ x: 11, y: 11 }, { x: 11, y: 12 }, { x: 11, y: 13 }], arrowControls)
export let playerTwo = new player("blue", [{ x: 5, y: 11 }, { x: 5, y: 12 }, { x: 5, y: 13 }], wasdControls)



export let allPlayers = [playerOne, playerTwo]

const gameBoard = document.getElementById('game-board')
const snakeNodes = [{ x: 11, y: 11 }, { x: 11, y: 12 }, { x: 11, y: 13 }]


const SNAKE_SPEED = 20
let snakeHead = { x: 11, y: 11}
let currentDirection = { x: 0, y: 0}
let lastRenderTime = 0

function game(currentTime) {

    window.requestAnimationFrame(game)
    const secondsSinceRender = (currentTime - lastRenderTime) / 1000
    if (secondsSinceRender < (1 / SNAKE_SPEED)) return

    lastRenderTime = currentTime
    gameBoard.innerHTML = ''
    
    draw(allPlayers, gameBoard)
    updateAll(allPlayers)
}


function updateAll(allPlayers) {
    allPlayers.forEach(p => {
        update(p)
    })
}

function update(snake) {
    
    if (snake.inputBuffer.length > 0) {
        console.log("Execute command")
        console.log(snake.inputBuffer[0])
        currentDirection = snake.inputBuffer[0]
        snake.inputBuffer.shift()
    }

    if (snake.currentDirection.x !== 0 || snake.currentDirection.y !== 0) {
        snakeHead = snake.nodes[0]
        snake.nodes.unshift({ x : snakeHead.x + snake.currentDirection.x, y : snakeHead.y + snake.currentDirection.y })
        snake.nodes.pop()
    }

    
    console.log("Printing snake")
    console.log(snake.nodes.length)
    for (let i = 0; i < snake.nodes.length; i++) {
        console.log(snake.nodes[i])
    }
    
}


function draw(allPlayers, gameBoard) {
    allPlayers.forEach(p => {
        drawSnake(gameBoard, p)
    })
}

function drawSnake(gameBoard, snake) {
    snake.nodes.forEach(node => {
      const snakeNode = document.createElement('div')
      snakeNode.style.gridRowStart = node.y
      snakeNode.style.gridColumnStart = node.x
      snakeNode.classList.add('snakeNode')
      gameBoard.appendChild(snakeNode)
    })
  }

window.requestAnimationFrame(game)
