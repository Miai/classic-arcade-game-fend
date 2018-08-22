/*jshint esversion: 6 */
var numRows = 6,
    numCols = 5;
    cWidth = 505;
    cHeight = 606;

var speed = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Enemies our player must avoid
var Enemy = function(sprite, x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = sprite;
    this.x = x;
    this.y = y;
    this.speed = speed (50,500);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 505) {
        this.x = -100;
        this.speed = speed (50,500);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


class Player {
    constructor(sprite, x, y) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
    }

    update(dt) {
        console.log (this.x, this.y);
        this.winCondition(this.x, this.y);
        this.constrainPlayerToMap(this.x, this.y);
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(keyPress) {
        switch(keyPress) {
            case "left":
                this.x -= 100;
                break;
            case "up":
                this.y -= 83;
                break;
            case "right":
                this.x += 100;
                break;
            case "down":
                    this.y += 83;
                break;
        }
    }

    winCondition(x, y) {
        if (y < 0 ) {
            console.log("you won!");
            this.x = 202;
            this.y = 400;
        }
    }

    constrainPlayerToMap(x, y) {
        if (x > 402) {
            this.x = 402;
        }

        if (x < 2) {
            this.x = 2;
        }

        if (y > 400) {
            this.y = 400;
        }
    }
}

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [
    new Enemy('images/enemy-bug.png', -100, 63),
    new Enemy('images/enemy-bug.png', -50, 143),
    new Enemy('images/enemy-bug.png', -20, 223)
];
var player = new Player('images/char-boy.png', 202, 400);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
// Modified it to listen for "keydown" - like any gamer would want :))
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
