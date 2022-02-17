const inputBuffer = [{ x : 0, y : 0}, { x : 0, y : 0}, { x : 0, y : 0}]
const maxInputs = 3

function printArray() {
    console.log("Printing array")
    for (let i = 0; i < inputBuffer.length; i++) {
        console.log(inputBuffer[i])
    }
}


function bufferControl() {
    if (inputBuffer.length > maxInputs) {
        inputBuffer.shift()
    }
}

window.addEventListener('keydown', press => {
    switch (press.key) {
        case 'ArrowUp':
            if (inputBuffer[inputBuffer.length - 1].y !== 0) break
            inputBuffer.push({ x : 0, y : -1})
            bufferControl()
            printArray()
            break 
        
        case 'ArrowDown':
            if (inputBuffer[inputBuffer.length - 1].y !== 0) break
            inputBuffer.push({ x : 0, y : 1})
            bufferControl()
            printArray()
            break
        
        case 'ArrowLeft':
            if (inputBuffer[inputBuffer.length - 1].x !== 0) break
            inputBuffer.push({ x : -1, y : 0})
            bufferControl()
            printArray()
            break
        
        case 'ArrowRight':
            if (inputBuffer[inputBuffer.length - 1].x !== 0) break
            inputBuffer.push({ x : 1, y : 0})
            bufferControl()
            printArray()
            break
    }

})