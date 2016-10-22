function Shape(centerX, centerY, radius, color, context) {
  this.centerX = centerX;
  this.centerY = centerY;
  this.radius = radius;
  this.color = color;
  this.context = context;
  if (this.constructor === Shape) {
      throw new Error('this class is abstract');
  }
}

Shape.prototype.draw = function() {
  throw new Error('this method is abstract');
};