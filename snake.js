import "./input.js"
import { inputBuffer } from "./input.js"



const SNAKE_SPEED = 2
let lastRenderTime = 0

function game(currentTime) {

    window.requestAnimationFrame(game)
    const secondsSinceRender = (currentTime - lastRenderTime) / 1000
    if (secondsSinceRender < (1 / SNAKE_SPEED)) return

    lastRenderTime = currentTime

    update()
}


function update() {
    if (inputBuffer.length > 0) {
        console.log("Execute command")
        console.log(inputBuffer[0])

        inputBuffer.shift()
    }
}

window.requestAnimationFrame(game)
