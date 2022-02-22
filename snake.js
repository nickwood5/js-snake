import "./input.js"
import { inputBuffer } from "./input.js"


class player {
    constructor(colour, nodes, controls) {
        this.colour = colour
        this.nodes = nodes
        this.currentDirection = {x: 0, y: 0}
        this.inputBuffer = [{ x : 0, y : 0}]
        this.controls = controls
        this.addedNodes = 0;
    }
}

class fruit {
    constructor(colour) {
        this.colour = colour
        this.x = Math.floor(Math.random() * 20)
        this.y = Math.floor(Math.random() * 20)
    }
}


let arrowControls = {up: 'ArrowUp', down: 'ArrowDown', left: 'ArrowLeft', right: 'ArrowRight'}
let wasdControls = {up: 'w', down: 's', left: 'a', right: 'd'}

export let playerOne = new player("red", [{ x: 11, y: 11 }, { x: 11, y: 12 }, { x: 11, y: 13 }], arrowControls)
export let playerTwo = new player("blue", [{ x: 5, y: 11 }, { x: 5, y: 12 }, { x: 5, y: 13 }], wasdControls)

let fruitOne = new fruit("blue")
let fruitTwo = new fruit("blue")
let fruits = [fruitOne]


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
    
    updateAll(allPlayers)
    draw(allPlayers, gameBoard)
}


function updateAll(allPlayers) {
    allPlayers.forEach(p => {
        update(p, fruits, allPlayers)
    })
}

function update(snake, fruits, allPlayers) {
    fruits.forEach(f => {
        if (f.x == snake.nodes[0].x + snake.currentDirection.x && f.y == snake.nodes[0].y + snake.currentDirection.y) {
            fruits.pop()
            let newFruit = new fruit("aa")
            fruits.push(newFruit)
            snake.addedNodes += 3
        }
    })

    allPlayers.forEach(player => {
        player.nodes.forEach(n => {
            if (n.x == snake.nodes[0].x + snake.currentDirection.x && n.y == snake.nodes[0].y + snake.currentDirection.y && (snake.currentDirection.x !== 0 || snake.currentDirection.y !== 0)) {
                allPlayers.pop()
            }
        })
    })

    if (snake.inputBuffer.length > 0) {
        console.log("Execute command")
        console.log(snake.inputBuffer[0])
        snake.currentDirection = snake.inputBuffer[0]
        snake.inputBuffer.shift()
    }

    if (snake.currentDirection.x !== 0 || snake.currentDirection.y !== 0) {
        snakeHead = snake.nodes[0]

        snake.nodes.unshift({ x : snakeHead.x + snake.currentDirection.x, y : snakeHead.y + snake.currentDirection.y })
        

        if (snake.addedNodes == 0) {
            snake.nodes.pop()
        } else {
            snake.addedNodes -= 1
        }
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
    drawFruit(gameBoard, fruits)
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

function drawFruit(gameBoard, fruits) {
    fruits.forEach(fruit => {
        const fruitNode = document.createElement('div')
        fruitNode.style.gridRowStart = fruit.y
        fruitNode.style.gridColumnStart = fruit.x
        fruitNode.classList.add('fruitPiece')
        gameBoard.appendChild(fruitNode)
    })
}

window.requestAnimationFrame(game)
