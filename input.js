export let inputBuffer = [{ x : 0, y : 0}]
export let direction = { x : 0, y : 0}
const maxInputs = 3

function printArray() {
    console.log("Printing array")
    for (let i = 0; i < inputBuffer.length; i++) {
        console.log(inputBuffer[i])
    }
}

window.addEventListener('keydown', press => {
    if (inputBuffer.length < maxInputs) {
        switch (press.key) {
            case 'ArrowUp':
                if (direction.y !== 0) break
                direction = { x : 0, y : -1}
                inputBuffer.push(direction)
                break 
            
            case 'ArrowDown':
                if (direction.y !== 0) break
                direction = { x : 0, y : 1}
                inputBuffer.push(direction)
                break
            
            case 'ArrowLeft':
                if (direction.x !== 0) break
                direction = { x : -1, y : 0}
                inputBuffer.push(direction)
                break
            
            case 'ArrowRight':
                if (direction.x !== 0) break
                direction = { x : 1, y : 0}
                inputBuffer.push(direction)
                break
        }
    }

})