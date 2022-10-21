const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

// paddle class
class Paddle {
    constructor({position}) {
        this.position = position
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 20
        this.height = 100
    }

    draw() {
        c.fillStyle = 'black'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()

        if (
            this.position.y + this.velocity.y > 0 &&
            this.position.y + this.height + this.velocity.y < canvas.height
        )
            this.position.y += this.velocity.y
    }
}

// Ball Class
class Ball {
    constructor({position}) {
        this.position = position

        const speed = 4

        const direction = {
            x: Math.random() - 0.5 >= 0 ? -speed: speed, // Math returns a random float between 0 and 1 - use this with the true/false condition to determine x direction
            y: Math.random() - 0.5 >= 0 ? -speed: speed,
        }
        this.velocity = {
            x: direction.x,
            y: direction.y,
        }
        this.width = 10
        this.height = 10
    }
    
    draw() {
        c.fillStyle = 'black'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()

        // "ball" sides for collision determination
        const rightSide = this.position.x + this.width + this.velocity.x
        const leftSide = this.position.x + this.velocity.x
        const topSide = this.position.y
        const bottomSide = this.position.y + this.height

        // paddle 1 collision
        // paddle 1 collision
        if (
            leftSide <= paddle1.position.x + paddle1.width &&
            bottomSide >= paddle1.position.y &&
            topSide <= paddle1.position.y + paddle1.height
        ) {
            this.velocity.x = -this.velocity.x
        }

        
        // paddle 2 collision
        if (
            rightSide >= paddle2.position.x &&
            bottomSide >= paddle2.position.y &&
            topSide <= paddle2.position.y + paddle2.height
        ) {
            this.velocity.x = -this.velocity.x
        }

        // reverse y directions
        if (
            this.position.y + this.height + this.velocity.y >= canvas.height ||
            this.position.y + this.velocity.y <= 0
        ) {
            this.velocity.y = -this.velocity.y
        }

        // reset to middle if out of bounds
        if (
            this.position.x < 0 ||
            this.position.x > canvas.width
        ) {
            this.position.x = canvas.width / 2
            this.position.y = canvas.height / 2
        }

            this.position.x += this.velocity.x
            this.position.y += this.velocity.y
        }
} 


// define paddles using class
const paddle1 = new Paddle({
    position: {
        x: 20,
        y: 100,
    },
})

const paddle2 = new Paddle({
    position: {
        x: canvas.width - 20 * 2,
        y: canvas.height / 2,
    },
})


const ball = new Ball({
    position: {
        x: canvas.width / 2,
        y: canvas.height / 2
    },
})

// update display with paddle positions
function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0,0,canvas.width,canvas.height)
    paddle1.update()
    paddle2.update()

    ball.update()
}

animate()

// listen for key inputs to control paddles
addEventListener('keydown', (event) => {
    const speed = 8
    switch (event.key) {
        case 'w':
            //go up
            paddle1.velocity.y = -speed
            break
        case 's':
            //go down
            paddle1.velocity.y = speed
            break
        case 'ArrowUp':
            //go up
            paddle2.velocity.y = -speed
            break
        case 'ArrowDown':
            //go down
            paddle2.velocity.y = speed
            break
    }
})