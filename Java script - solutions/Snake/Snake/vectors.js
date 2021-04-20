function Vector(x, y) {
    this.x = x;
    this.y = y;
}
Vector.prototype.plus = function(other) {
    return new Vector(this.x + other.x, this.y + other.y);
}
Vector.prototype.substract = function(other) {
    return new Vector(this.x - other.x, this.y - other.y);
}
Vector.prototype.multiply = function(coefficient) {
    return new Vector(this.x * coefficient, this.y * coefficient);
}
Vector.prototype.equal = function(other) {
    return this.x == other.x && this.y == other.y;
}
Vector.prototype.invert = function() {
    return new Vector(-this.x, -this.y);
}
Vector.prototype.isInRectangle = function(startPoint, endPoint) {
    return startPoint.x <= this.x && this.x <= endPoint.x 
        && startPoint.y <= this.y && this.y <= endPoint.y
}