let canvas = document.getElementById("playground");
canvas.width  = innerWidth;
canvas.height = innerHeight;
const size = new Vector(25, 25);
const pixelSize = 20;
let gameInfo = {
    size: size,
    keys: {
        37: Directions.left,
        38: Directions.up,
        39: Directions.right,
        40: Directions.down
    },
    colorTable: {
        0: "black",
        1: "green",
        2: "red"
    },
    drawer: new Drawer(canvas),
    pixelSize: 20,
    startPoint: new Vector(canvas.width / 2, canvas.height / 2).substract(size.multiply(pixelSize / 2)),
    speed: 100
};
let game = new Game(gameInfo);

function restart() {
    if (game.isRun)
        game.pause();
    game = new Game(gameInfo);
    game.start();
}

window.addEventListener("keydown", function(event) {
    if (event.keyCode === 32)
        restart();
    else if (game.pressedKeys[game.pressedKeys.length - 1] !== event.keyCode)
        game.pressedKeys.push(event.keyCode); 
}, false);