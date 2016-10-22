function DrawingApp(canvas_id) {
    this.canvas = document.getElementById(canvas_id);
    this.canvas.width = $("#canvas-section").width();
    this.canvas.height = $("#canvas-section").height();
    this.$canvas = $(this.canvas);
    this.inputVal = "Hello World!";
    this.textInput = false;
    var self = this;

    this.drawingArea = new DrawingArea(this.canvas);

    this.leftMouseButtonClicked = false;

    this.$canvas.bind('mousedown', this.toggleMouseDown.bind(this));
  //  this.$canvas.bind('touchstart', this.sketchpadTouchStart.bind(this));
    this.$canvas.bind('mousedown', this.putWidget.bind(this));

    this.$canvas.bind('mouseup', this.toggleMouseUp.bind(this));
    this.$canvas.bind('touchmove', this.sketchpadTouchMove.bind(this));
    this.$canvas.bind('mousemove', this.putWidget.bind(this));

    this.buttons = new Buttons(this.$canvas, this.drawingArea.context);
    this.theme = new Theme();

    this.$canvas.css("background", this.buttons.backgroundColor);
    //buttons events
    $('#btn-clear').on('click', this.clear.bind(this));
    $('#save').on('click', this.saveCanvas.bind(this));
    $('.fa-close').on('click', this.clickDelete.bind(this));

    $("#btn-format-png").on("click", this.clearPng.bind(this));

    $('#btn-text').on('click', this.clickText.bind(this));

    var canvas = this.canvas;
    var ctx = this.drawingArea.context;
    var width = this.canvas.width;
    var height = this.canvas.height;

    this.history = {
        redo_list: [],
        undo_list: [],
        saveState: function (canvas, list, keep_redo) {
            keep_redo = keep_redo || false;
            if (!keep_redo) {
                this.redo_list = [];
            }

            (list || this.undo_list).push(canvas.toDataURL());
        },
        undo: function (canvas, ctx) {
            this.restoreState(canvas, ctx, this.undo_list, this.redo_list);
        },
        redo: function (canvas, ctx) {
            this.restoreState(canvas, ctx, this.redo_list, this.undo_list);
        },
        restoreState: function (canvas, ctx, pop, push) {
            if (pop.length) {
                this.saveState(canvas, push, true);
                var restore_state = pop.pop();
                var img = new Image();
                img.src = restore_state;
                img.onload = function () {
                    ctx.clearRect(0, 0, width, height);
                    ctx.drawImage(img, 0, 0, width, height, 0, 0, width, height);
                };
            }
        }
    };
    $("#undo").on("click", function () {
        self.history.undo(canvas, ctx);
    });
    $("#redo").on("click", function () {
        self.history.redo(canvas, ctx);
        console.log('redo');
    });
    ///makin this shit responsive
    $(function() {
        
        function setHtml() {
            var buttonsDiv = $("#buttons-menu");
            $("#header").css({
                height : "5em"
            });
            $("#buttons-menu").remove();
            $("#canvas-section").width("85%").css({
                borderLeft : "0.6em solid" + " " + self.theme.backgroundToolBars,
                backgroundColor : self.buttons.backgroundColor
            });
            $("#canvas").width("90%");
            $("#canvas-footer").width("85%");
            buttonsDiv.insertAfter($('#section')).css({
                zIndex: "9999"
            });
            $("#buttons-list li a").css({
                display : "inline-block",
                float : "left"
            });
            
            ///binding touch events
            $('#btn-clear').on('touchstart', self.clear.bind(self));
            $("#btn-format-png").on("touchstart", function() {
                self.clearPng.bind(self)();
                $("#canvas-section").css({
                    backgroundColor : self.buttons.backgroundColor
                });
            });
            $('#btn-text').on('touchstart', function(e) {
                self.clickText(e);
                self.$canvas.off('touchmove', self.sketchpadTouchMove.bind(self));
            }); 
            
            $('#triangle').on('touchstart', function(e) {
                self.buttons.clickTriangle.bind(self.buttons, e)();
                self.toggleMouseDown(e);
            });
            $('#square').on('touchstart', function(e) {
                self.buttons.clickSquare.bind(self.buttons, e)();
                self.toggleMouseDown(e);
            });
            $('#circle').on('touchstart', function(e) {
                self.buttons.clickCircle.bind(self.buttons, e)();
                self.toggleMouseDown(e);
            });
        }
        
        if (screen.width <= 1280 && screen.width > 768) {
            
            setHtml();
            $(".push_button:not(.user)").css({
               width : "5.814em" 
            });
        } else if (screen.width <= 768){
            setHtml();
            $(".push_button:not(.user)").css({
               width : "5.565em" 
            });
        }       
    });
};

DrawingApp.prototype.putWidget = function (e) {
    if (this.leftMouseButtonClicked) {
        var circle = new Circle(e.offsetX, e.offsetY, this.buttons.radius, this.buttons.color, this.drawingArea.context);
        this.drawingArea.addWidget(circle);
    }
};

DrawingApp.prototype.putTriangle = function (e) {
    var triangle = new Triangle(e.offsetX, e.offsetY, this.buttons.radius, this.buttons.color, this.drawingArea.context);
    this.drawingArea.addWidget(triangle);
};

DrawingApp.prototype.putSquare = function (e) {
    var square = new Square(e.offsetX, e.offsetY, this.buttons.radius, this.buttons.color, this.drawingArea.context);
    this.drawingArea.addWidget(square);
};

DrawingApp.prototype.putCircle = function (e) {
    var circle = new Circle(e.offsetX, e.offsetY, this.buttons.radius, this.buttons.color, this.drawingArea.context);
    this.drawingArea.addWidgetEmpty(circle);
    console.log('circle');
};

DrawingApp.prototype.clickText = function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    var self = this;

    this.textInput = true;
    this.buttons.triangle = false;
    this.buttons.square = false;
    this.buttons.circle = false;
    this.buttons.text = true;

    this.$canvas.awesomeCursor('pencil', {
        color: 'limegreen',
        size: 24,
        hotspot: 'bottom left',
        outline: 'brown'
    });
};

DrawingApp.prototype.doneTyping = function () {
    var span = $('#inputSpan');
    var timp = $('#input-4');
    var prm = timp.val();
    var self = this;
    span.remove();

    var select = $('#fontFamily select').val();
    self.buttons.color = $('#draw input').val();
    var ctx = self.drawingArea.context;
    var size = self.buttons.radius;
    ctx.fillStyle = self.buttons.color;
    ctx.font = size + "px " + select;
    console.log(prm);
    if (prm) {
        ctx.fillText(prm, span.css("left").slice(0, -2), span.css("top").slice(0, -2));
    }
};

DrawingApp.prototype.addText = function (e) {
    e.preventDefault();
    var self = this;
    var select = $('#fontFamily select').val();
    self.buttons.color = $('#draw input').val();

    if ($("#canvas-section input").length === 0) {
        var spanInput = $('<span class="input input--hoshi" id="inputSpan"></span>').css({
            left: e.offsetX,
            top: e.offsetY
        });
        var textInput = $('<input class="input__field input__field--hoshi" type="text" id="input-4" />').css({
            fontSize: self.buttons.radius,
            fontFamily: select,
            color: self.buttons.color       
        });
        var labelInput = $('<label class="input__label input__label--hoshi input__label--hoshi-color-1" for="input-4"></label');
        var spanLabel = $('<span class="input__label-content input__label-content--hoshi">AaBb</span>').css({       
            fontSize: self.buttons.radius
        });
        
        var labelOverall = labelInput.append(spanLabel);
        var overallText = spanInput.append(textInput);
        var masterOverall = spanInput.append(labelOverall);
        
        
        masterOverall.appendTo($("#canvas-section"));
        
        textInput.focus();

        this.textInput = false;
//        if (textInput.val()) {
//            this.textInput = true;
//        }
        //on keyup, start the countdown
        var doneTypingInterval = 2500;
        var typingTimer;
        //on keyup, start the countdown
        textInput.keyup(function (ev) {
            clearTimeout(typingTimer);
            if (textInput.val()) {
                self.textInput = true;
                typingTimer = setTimeout(self.doneTyping.bind(self), doneTypingInterval);
            }
            if (ev.keyCode === 13) {
                self.doneTyping();
                clearTimeout(typingTimer);
            }
        });
    }
};

DrawingApp.prototype.clear = function () {
    this.drawingArea.clear();
    //this.$canvas.css("background", "#ccbdbd"); //optional
    this.buttons.draw();
    console.log(this.buttons.p);
    if (this.buttons.p === 2) {
        this.drawingArea.context.beginPath();
        this.drawingArea.context.rect(0, 0, $("#canvas-section").width(), $("#canvas-section").height());
        this.drawingArea.context.fillStyle = this.buttons.backgroundColor;
        this.drawingArea.context.fill();
        this.drawingArea.context.strokeStyle = this.buttons.backgroundColor;
        this.drawingArea.context.stroke();
    }
};

DrawingApp.prototype.clearPng = function () {
    this.buttons.p = 1;
    this.drawingArea.clear();
    this.buttons.changeBackground();
};

DrawingApp.prototype.toggleMouseDown = function (e) {
    if (this.buttons.text) {
        if (this.textInput) {
            this.history.saveState(this.canvas);
        }
        this.addText(e);
    } else if (this.buttons.triangle) {
        this.history.saveState(this.canvas);
        this.putTriangle(e);
    } else if (this.buttons.square) {
        this.history.saveState(this.canvas);
        this.putSquare(e);
    } else if (this.buttons.circle) {
        this.history.saveState(this.canvas);
        this.putCircle(e);
    } else {
        this.leftMouseButtonClicked = true;
        this.history.saveState(this.canvas);
    }
};

DrawingApp.prototype.toggleMouseUp = function () {
    this.leftMouseButtonClicked = false;
};

DrawingApp.prototype.saveCanvas = function () {
    var self = this;
    var dataUrl = this.canvas.toDataURL("image/png");
    var p = this.buttons.p;
    var bgColor = this.buttons.backgroundColor;
    $.ajax({
        type: "POST",
        url: "assets/php/save.php",
        data: {image: dataUrl, p: p, bgColor: bgColor}
    })
            .done(function (data) {
                window.location.reload();
            })
            .fail(function () {
                console.log("fail");
            })
            .always(function () {
                console.log("always");
            });
};

DrawingApp.prototype.clickDelete = function (e) {
    var $e = $(e.target);
    var id = $e.closest('div').attr('id');
    $e.closest('div').remove();
    $.ajax({
        type: 'POST',
        url: 'assets/php/delete.php',
        data: {id: id},
        success: function () {
            alert("successfull delete");
        },
        dataType: 'json'
    });
};

DrawingApp.prototype.sketchpadTouchStart = function (e) {

    this.getTouchPos(e);
    this.leftMouseButtonClicked = true;
    this.putWidget(e);

    // Prevents an additional mousedown event being triggered
    event.preventDefault(e);
};
DrawingApp.prototype.sketchpadTouchMove = function (e) {

    // Update the touch co-ordinates
    this.getTouchPos(e);
    this.leftMouseButtonClicked = true;
    // During a touchmove event, unlike a mousemove event, we don't need to check if the touch is engaged, since there will always be contact with the screen by definition.
    this.putWidget(e);

    // Prevent a scrolling action as a result of this touchmove triggering.
    event.preventDefault(e);
};
DrawingApp.prototype.getTouchPos = function (e) {

    var rect = this.canvas.getBoundingClientRect();
    e.offsetX = e.originalEvent.touches[0].pageX - rect.left;
    e.offsetY = e.originalEvent.touches[0].pageY  - rect.top;
   

};



  