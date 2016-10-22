function DrawingArea(canvas){
  this.canvas = canvas;
  this.context = canvas.getContext("2d");
  this.widgets = [];  
};

DrawingArea.prototype.addWidget = function(widget) {
  widget.draw();
  this.widgets.push(widget);
};

DrawingArea.prototype.addWidgetEmpty = function(widget) {
  widget.drawEmpty();
  this.widgets.push(widget);
};

DrawingArea.prototype.clear = function() {
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
};



