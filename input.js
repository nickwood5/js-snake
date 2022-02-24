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
                if (player.lastDirection.y !== 0) break
                console.log("Player move up")
                player.lastDirection = { x : 0, y : -1}
                player.inputBuffer.push({ x : 0, y : -1})
                break 
            
            case player.controls.down:
                if (player.lastDirection.y !== 0) break
                console.log("Player move down")
                player.lastDirection = { x : 0, y : 1}
                player.inputBuffer.push({ x : 0, y : 1})
                break
            
            case player.controls.left:
                if (player.lastDirection.x !== 0) break
                console.log("Player move left")
                player.lastDirection = { x : -1, y : 0}
                player.inputBuffer.push({ x : -1, y : 0})
                break
            
            case player.controls.right:
                if (player.lastDirection.x !== 0) break
                console.log("Player move right")
                player.lastDirection = { x : 1, y : 0}
                player.inputBuffer.push({ x : 1, y : 0})
                break
        }
    }
}