function Square(centerX, centerY, radius, color, context) {
  Shape.call(this, centerX, centerY, radius, color, context);
}

Square.prototype = Object.create(Shape.prototype);
Square.prototype.constructor = Square;

Square.prototype.draw = function() {
    var ctx = this.context;
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(this.centerX, this.centerY);
    ctx.lineTo(this.centerX + this.radius, this.centerY);
    ctx.lineTo(this.centerX + this.radius, this.centerY - this.radius);
    ctx.lineTo(this.centerX, this.centerY - this.radius);
    ctx.lineTo(this.centerX, this.centerY);
    this.context.strokeStyle = this.color;
    ctx.stroke();
};