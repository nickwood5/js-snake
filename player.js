

class player {
    constructor(colour, nodes) {
        this.colour = colour
        this.nodes = nodes
        this.currentDirection = {x: 0, y: 0}
    }
}

let nick = new player(2, 1)

console.log(nick.currentDirection)