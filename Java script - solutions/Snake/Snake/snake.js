let mod = (a, b) => (Math.max(a, a % b) + b) % b;
let randomNumber = (from, to) => Math.floor(Math.random() * (to - from) + from);
let divide = (x, y) => Math.floor(x / y);
function randomColor() {
    let result = "#";
    for (let i = 0; i < 6; i++)
        result += randomNumber(0, 15).toString(16);
    return result;
}

class Directions {
    static up    = new Vector(0, -1);
    static right = new Vector(1,  0);
    static down  = new Vector(0,  1);
    static left  = new Vector(-1, 0);
}

class Grid  {
    constructor(width, height) {
        this.width  = width;
        this.height = height;
        this.plane  = [...Array(width)].map(() => [...Array(height)]);
    }

    init(value) { 
        for (var x = 0; x < this.width; x++)
            for (let y = 0; y < this.height; y++)
                this.plane[x][y] = value;
    }
}

class Snake {
    constructor(x, y, snakeSymbol = 1) {
        this.length = 2;
        this.body = [new Vector(x, y)];
        this.nextDirection = Directions.up;
        this.snakeSymbol = snakeSymbol;
    }

    growTail() { 
        let last = this.length - 1;
        let preTailPosition = this.length > 1 
            ? this.body[last - 1] 
            : this.nextDirection.substract(this.body[0]);
        let tailDirection = preTailPosition.substract(this.body[last]);
        
        this.body.push(this.body[last].plus(tailDirection.invert()));
        this.length++;
    }

    moveTo(vector) {
        if(vector instanceof Vector)
            this.nextDirection = vector;
    }

    action(grid) {
        for (let i = this.length - 1; i > 0; i--)
            this.body[i] = this.body[i - 1];

        let head = this.body[0];
        this.body[0] = new Vector(
            mod(head.x + this.nextDirection.x, grid.width), 
            mod(head.y + this.nextDirection.y, grid.height)
        );
    }

    isSelfEat() {
        return this.body.slice(2).some(part => part.equal(this.body[0]));
    }

    isInGrid(grid) {
        const minPoint = new Vector(0, 0);
        const gridSize = new Vector(grid.width - 1, grid.height - 1);
        return this.body[0].isInRectangle(minPoint, gridSize);
    }

    draw(grid) {
        this.body.forEach( (part) => grid.plane[part.x][part.y] = this.snakeSymbol ); 
    }

    isInBody(position) {
        return this.body.some(part => part.equal(position));
    }
}

class Apple {
    constructor(x, y, appleSymbol = 2) {
        this.position    = new Vector(x, y);
        this.appleSymbol = appleSymbol;
    }
    
    draw(grid) {
        grid.plane[this.position.x][this.position.y] = this.appleSymbol;
    }
}

class GameInfo {
    constructor(size, keys, colorTable, drawer, startPoint, pixelSize, speed) {
        this.size = size;
        this.keys = keys;
        this.colorTable = colorTable;
        this.drawer = drawer;
        this.pixelSize = pixelSize;
        this.startPoint = startPoint;
        this.speed = speed;
    }
}

class Game {
    constructor(info) {
        // info { size, keys, colorTable, drawer, startPoint, speed, pixelSize }
        this.grid  = new Grid(info.size.x, info.size.y);
        this.snake = new Snake(divide(info.size.x, 2), divide(info.size.y, 2), 1);
        this.apple = new Apple(randomNumber(0, info.size.x), randomNumber(0, info.size.y), 2);
        this.keys  = info.keys;
        this.drawer = info.drawer;
        this.colorTable = info.colorTable;
        this.startPoint = info.startPoint;
        this.speed = info.speed;
        this.pixelSize = info.pixelSize;
        this.timer;
        this.pressedKeys = [];
        this.isRun = false;
    }

    start() {
        this.isRun = true;
        this.timer = setInterval(this.play.bind(this), this.speed);
    }

    play() {
        this.grid.init(0);
        this.moveSnake();
        this.eatApple();
        this.snake.action(this.grid); 
        this.snake.isSelfEat() ? this.pause() : this.draw();
    }

    pause() {
        clearInterval(this.timer);
        this.isRun = false;
    }

    moveSnake() {
        let nextDirection = this.snake.nextDirection;
        if (this.pressedKeys.length !== 0)
        {
            let nd = this.keys[this.pressedKeys.shift()];
            if (!nd.equal(nextDirection.invert()))
                nextDirection = nd;
        }
        this.snake.moveTo(nextDirection);
    }

    eatApple() {
        if (this.snake.isInBody(this.apple.position)) {
            this.snake.growTail();
            this.colorTable[2] = randomColor();
            while(this.snake.isInBody(this.apple.position))
                this.apple = new Apple(randomNumber(0, this.grid.width), randomNumber(0, this.grid.height), 2);
        }
    }

    draw() {
        this.apple.draw(this.grid);
        this.snake.draw(this.grid);
        this.fillGrid();
        this.drawBorders();
    }

    drawBorders() {
        let startVector = this.startPoint;
        let endVector = startVector.plus(new Vector(this.grid.width, this.grid.height).multiply(this.pixelSize));
        this.drawLine(startVector, new Vector(endVector.x, startVector.y));
        this.drawLine(startVector, new Vector(startVector.x, endVector.y));
        this.drawLine(endVector, new Vector(endVector.x, startVector.y));
        this.drawLine(endVector, new Vector(startVector.x, endVector.y));
    }
    
    fillGrid() {
        let sizeVector = new Vector(this.pixelSize, this.pixelSize);
        for (let y = 0; y < this.grid.height; y++)
            for (let x = 0; x < this.grid.width; x++) 
                    this.drawer.drawRect(
                    this.startPoint.plus(new Vector(x, y).multiply(this.pixelSize)),
                    sizeVector,
                    this.colorTable[this.grid.plane[x][y]]
                );
    }
}