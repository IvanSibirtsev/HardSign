"use strict"

// Needs Vector
class Drawer
{
    constructor(canvas) {
        this.context = canvas.getContext("2d");
        this.width   = canvas.width;
        this.height  = canvas.height;
        this.lineWidth = 1;
    }
    
    setColor(color) {
        this.context.fillStyle = color;
    }
    
    setLineWidth(width) {
        this.context.lineWidth = width || this.lineWidth;
    }

    drawRect(startVector, sizeVector, color) {
        let oldColor = this.context.fillStyle;
        this.setColor(color || oldColor);
        this.context.fillRect(startVector.x, startVector.y, sizeVector.x, sizeVector.y);
        this.setColor(oldColor);
    }
    
    drawCircle(centerVector, radius, color) {
        let oldColor = this.context.fillStyle;
        this.setColor(color || oldColor)
        this.context.arc(centerVector.x, centerVector.y, radius, 0, Math.PI * 2);
        this.context.fill();
        this.setColor(oldColor);
    }
    
    drawLine(startVector, endVector, color, width) {
        let oldColor = this.context.fillStyle;
        this.setColor(color || oldColor);
        width && this.setLineWidth(width);

        this.context.beginPath();
        this.context.moveTo(startVector.x, startVector.y);
        this.context.lineTo(endVector.x, endVector.y);
        this.context.stroke();
        this.context.closePath();

        this.setColor(oldColor);
        width && this.setLineWidth();
    }
    
    clean(cleanColor = "white") {
        let oldColor = this.context.fillStyle;
        this.setColor(cleanColor);
        this.context.fillRect(0, 0, this.width, this.height);
        this.setColor(oldColor);
    }

    drawGrid(startVector, endVector, color, pixelSize) {
        for (let x = startVector.x; x < endVector.x; x += pixelSize)
            this.drawLine(new Vector(x, startVector.y), new Vector(x, endVector.y), color);
        for (let y = startVector.y; y < endVector.y; y += pixelSize)
            this.drawLine(new Vector(startVector.x, y), new Vector(endVector.x, y), color);
    }
}
