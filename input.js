export let inputBuffer = [{ x : 0, y : 0}]
export let direction = { x : 0, y : 0}
const maxInputs = 4


import { playerOne, playerTwo, allPlayers} from "./snake.js"


window.addEventListener('keydown', press => {

    allPlayers.forEach(p => {
        getInput(p, press)
    })

})


function getInput(player, press) {
    if (player.inputBuffer.length < maxInputs) {
        switch (press.key) {
            case player.controls.up:
                if (player.currentDirection.y !== 0) break
                player.currentDirection = { x : 0, y : -1}
                player.inputBuffer.push({ x : 0, y : -1})
                break 
            
            case player.controls.down:
                if (player.currentDirection.y !== 0) break
                player.currentDirection = { x : 0, y : 1}
                player.inputBuffer.push({ x : 0, y : 1})
                break
            
            case player.controls.left:
                if (player.currentDirection.x !== 0) break
                player.currentDirection = { x : -1, y : 0}
                player.inputBuffer.push({ x : -1, y : 0})
                break
            
            case player.controls.right:
                if (player.currentDirection.x !== 0) break
                player.currentDirection = { x : 1, y : 0}
                player.inputBuffer.push({ x : 1, y : 0})
                break
        }
    }
}