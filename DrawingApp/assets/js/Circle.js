function Circle(centerX, centerY, radius, color, context) {
  Shape.call(this, centerX, centerY, radius, color, context);
}

Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.draw = function() {
  this.context.beginPath();
  this.context.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI);
  this.context.fillStyle = this.color;
  this.context.fill();
  this.context.strokeStyle = this.color;
  this.context.stroke();
};

Circle.prototype.drawEmpty = function() {
  this.context.beginPath();
  var ctx = this.context;
  ctx.lineWidth = 2;
  this.context.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI);
  this.context.strokeStyle = this.color;
  this.context.stroke();
};

