import "./input.js"
import { inputBuffer } from "./input.js"


class player {
    constructor(name, nodes, controls) {
        this.name = name
        this.nodes = nodes
        this.currentDirection = {x: 0, y: 0}
        this.lastDirection = {x: 0, y: 0}
        this.inputBuffer = [{ x : 0, y : 0}]
        this.controls = controls
        this.addedNodes = 0;
    }
}



class fruit {
    constructor(colour) {
        this.colour = colour
        this.x = Math.floor(Math.random() * 21) + 1
        this.y = Math.floor(Math.random() * 21) + 1
        console.log("New fruit at " + this.x + ", " + this.y)
    }
}


let arrowControls = {up: 'ArrowUp', down: 'ArrowDown', left: 'ArrowLeft', right: 'ArrowRight'}
let wasdControls = {up: 'w', down: 's', left: 'a', right: 'd'}

export let playerOne = new player("red", [{ x: 11, y: 11 }, { x: 11, y: 12 }, { x: 11, y: 13 }], arrowControls)
export let playerTwo = new player("blue", [{ x: 5, y: 11 }, { x: 5, y: 12 }, { x: 5, y: 13 }], wasdControls)

let fruitOne = new fruit("blue")
let fruitTwo = new fruit("red")
let fruits = [fruitOne, fruitTwo]


export let allPlayers = [playerOne]

const gameBoard = document.getElementById('game-board')
const snakeNodes = [{ x: 11, y: 11 }, { x: 11, y: 12 }, { x: 11, y: 13 }]


const SNAKE_SPEED = 10
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

function killPlayer(allPlayers, removedName) {
    for (let i = 0; i < allPlayers.length; i++) {
        let player = allPlayers[i]
        if (player.name == removedName) {
            allPlayers.splice(i, 1)
            return
        }
    }
}

function deleteFruit(fruits, fruitX, fruitY) {
    fruits.forEach(f => {

    })
}


function checkFruitEat(player, fruits, nextPos) {
    for (let i = 0; i < fruits.length; i++) {
        let f = fruits[i]
        if (f.x == nextPos.x && f.y == nextPos.y) {
            console.log("Eat fruit")
            fruits.splice(i, 1)
            let newFruit = new fruit("aa")
            fruits.push(newFruit)
            player.addedNodes += 3
            return
        } 
    }
}

function checkCollisions(player, allPlayers, nextPos) {
    allPlayers.forEach(p => {
        p.nodes.forEach(n => {
            if (n.x == nextPos.x && n.y == nextPos.y) {
                killPlayer(allPlayers, player.name)
            }
        })
    })
}

function updateDirection(player) {
    if (player.inputBuffer.length > 0) {
        console.log("Execute command")
        console.log(player.inputBuffer[0])
        player.currentDirection = player.inputBuffer[0]
        player.inputBuffer.shift()
    }
}

function grow(player) {
    if (player.currentDirection.x !== 0 || player.currentDirection.y !== 0) {
        if (player.addedNodes == 0) {
            console.log("DDD")
            player.nodes.pop()
        } else {
            player.addedNodes -= 1
        }
    }
}

function getNextPos(player) {
    snakeHead = player.nodes[0]

    if (snakeHead.y == 1 && player.currentDirection.y == -1) {
        return { x : snakeHead.x + player.currentDirection.x, y : 21 }
    } 

    if (snakeHead.y == 21 && player.currentDirection.y == 1) {
        return { x : snakeHead.x + player.currentDirection.x, y : 1 }
    } 

    if (snakeHead.x == 21 && player.currentDirection.x == 1) {
        return { x : 1, y : snakeHead.y + player.currentDirection.y }
    } 
        
    if (snakeHead.x == 1 && player.currentDirection.x == -1) {
        return { x : 21, y : snakeHead.y + player.currentDirection.y }
    } 
        
    return { x : snakeHead.x + player.currentDirection.x, y : snakeHead.y + player.currentDirection.y }
}

function update(snake, fruits, allPlayers) {
    updateDirection(snake)
    if (snake.currentDirection.x !== 0 || snake.currentDirection.y !== 0) {
        let nextPos = getNextPos(snake)
        checkFruitEat(snake, fruits, nextPos)
        checkCollisions(snake, allPlayers, nextPos)
        grow(snake)
        console.log(nextPos)
        snake.nodes.unshift(nextPos)
    }
}


function draw(allPlayers, gameBoard) {
    allPlayers.forEach(p => {
        drawSnake(gameBoard, p)
    })
    drawFruit(gameBoard, fruits)
}

function drawSnake(gameBoard, snake) {
    let node = snake.nodes[0]
    const snakeNode = document.createElement('div')
    snakeNode.style.gridRowStart = node.y
    snakeNode.style.gridColumnStart = node.x
    snakeNode.classList.add('snakeHead')
    gameBoard.appendChild(snakeNode)

    for (let i = 1; i < snake.nodes.length; i++) {
        let node = snake.nodes[i]
        const snakeNode = document.createElement('div')
        snakeNode.style.gridRowStart = node.y
        snakeNode.style.gridColumnStart = node.x
        snakeNode.classList.add('snakeNode')
        gameBoard.appendChild(snakeNode)
    }
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
