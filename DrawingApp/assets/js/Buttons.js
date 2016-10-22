function Buttons(canvas, context) {

    this.context = context;
    this.canvas = canvas;
    this.$canvas = $(this.canvas);
    this.color = "red";
    this.backgroundColor = "#ccbdbd";
    this.radius = 15;
    this.minRad = 1;
    this.maxRad = 100;
    this.defaultRad = 20;
    this.radSpan = $("#radval");
    this.decRad = $("#decrad");
    this.incRad = $("#incrad");
    var self = this;
    this.interval = 1;
    this.timeout;

    this.pColor = 1;

    this.p = 1;

    this.text = false;
    this.triangle = false;
    this.square = false;
    this.circle = false;

    $("#background").on("input", this.changeBackground.bind(this));
    $("#background").on("mousedown", this.changeBackground.bind(this));
    
    $("#files").on("change", this.changeBackgroundImg.bind(this));

    $("#btn-format-jpeg").on("click", this.loadFormat.bind(this));

    $("#btn-delete").on("click", this.deleteCanvas.bind(this));
    $("#draw").on("input", this.draw.bind(this));
    $("#draw").on("mousedown", this.draw.bind(this));

    $(window).on("load", this.draw.bind(this));

    $('.fa-edit').on('click', this.clickEdit.bind(this));
//increase and decraes + mouse down continuously
    this.decRad.on("click", this.setRadiusDec.bind(this));
    this.incRad.on("click", this.setRadiusInc.bind(this));
    
    this.decRad.mousedown(function () {
    //do something here
    self.timeout = setInterval(self.setRadiusDec.bind(self), 100);
    return false;
    });
    this.decRad.mouseup(function () {
        clearInterval(self.timeout);
        return false;
    });
    this.decRad.mouseout(function () {
        clearInterval(self.timeout);
        return false;
    });
    
    this.incRad.mousedown(function () {
    //do something here
    self.timeout = setInterval(self.setRadiusInc.bind(self), 100);
    return false;
    });
    this.incRad.mouseup(function () {
        clearInterval(self.timeout);
        return false;
    });
    this.incRad.mouseout(function () {
        clearInterval(self.timeout);
        return false;
    });
    
    //shapes
    $('#triangle').on('click', this.clickTriangle.bind(this));
    $('#square').on('click', this.clickSquare.bind(this));
    $('#circle').on('click', this.clickCircle.bind(this));
}

Buttons.prototype.deleteCanvas = function (e) {
    
    this.text = false;
    this.triangle = false;
    this.square = false;
    this.circle = false;
    
    if (this.pColor === 1) {
        this.color = this.backgroundColor;
    } else {
        this.color = e;
    }
    this.canvas.awesomeCursor('eraser', {
        color: 'skyblue',
        size: 32,
        hotspot: 'center',
        outline: 'black'
    });
}

Buttons.prototype.draw = function () {
    
    this.text = false;
    this.triangle = false;
    this.square = false;
    this.circle = false;
    
    this.color = $('#draw input').val();
    this.canvas.awesomeCursor('paint-brush', {
        color: "grey",
        size: 30,
        hotspot: 'bottom left',
        outline: 'black'
    });
}

Buttons.prototype.changeBackground = function () {
    var color = $('#background input').val();
    this.backgroundColor = color;
    this.canvas.css("background", color);
    this.draw(); //to prevent using the eraser if being used just before this

}

Buttons.prototype.changeBackgroundWindow = function () {
    var color = $('#background input').val();
    this.backgroundColor = color;
    this.canvas.css("background", color);

    if (this.p == 2) {
        this.context.beginPath();
        this.context.rect(0, 0, $("#canvas-section").width(), $("#canvas-section").height());
        this.context.fillStyle = color;
        this.context.fill();
        this.context.strokeStyle = color;
        this.context.stroke();
    }
}

Buttons.prototype.changeBackgroundImg = function () {

      var self = this;

      var file = document.getElementById('files').files[0];
      var reader = new FileReader();
      reader.onload = function (e) {
          
          var image = new Image();
          image.src = e.target.result;

          self.context.drawImage(image, 0, 0, $("#canvas-section").width(), $("#canvas-section").height());
      }


      if (file) {
          reader.readAsDataURL(file);
       //
       
    }
}

Buttons.prototype.setRadiusInc = function () {

    this.radius += this.interval;
    if (this.radius > this.maxRad) {
        this.radius = this.maxRad;
    }
    this.radSpan.html(this.radius);
}

Buttons.prototype.setRadiusDec = function () {

    this.radius -= this.interval;
    if (this.radius < this.minRad) {
        this.radius = this.minRad;
    }
    this.radSpan.html(this.radius);
}

Buttons.prototype.loadFormat = function () {
    this.p = 2;
    this.changeBackgroundWindow();
    this.draw();
    $("#background").off("input", this.changeBackground.bind(this));
    $("#background").on("input", this.changeBackgroundWindow.bind(this));
}


Buttons.prototype.clear = function () {
    this.context.clearRect(0, 0, this.canvas.width(), this.canvas.height());
}

Buttons.prototype.clickEdit = function (e) {
    //this.p = 2;
    var $e = $(e.target);
    var src = $e.prev().attr('src');
    var bgColor = this.backgroundColor;
    var self = this;
    this.pColor = 2;
    this.clear();
    $.ajax({
        type: 'POST',
        url: 'assets/php/edit.php',
        data: {src: src},
//        dataType : "json",
        success: function (response) {
            self.backgroundColor = response;
            //self.deleteCanvas(response);
            self.draw();
            self.pColor = 1;

        }
    });
    var context = this.context;
    drawing = new Image();
    drawing.src = src; // can also be a remote URL e.g. http://
    drawing.onload = function () {
        context.drawImage(drawing, 0, 0);
    };
};

$('#origUser').click(function(e) {

	var text = $(this).find("span").text();
	
    $.ajax({
    	type: 'POST',
        url: 'assets/php/share.php',
        data: $.param({text: text}),
        dataType: 'json'	            
    });
    $(document).ajaxStop(function(){
    	window.location.reload();
    });
   
});

Buttons.prototype.clickTriangle = function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    var self = this;
    
    this.text = false;
    this.square = false;
    this.circle = false;
    this.triangle = true;
    this.color = $('#draw input').val();
    this.$canvas.awesomeCursor('pencil', {
        color: 'limegreen',
        size: 24,
        hotspot: 'bottom left',
        outline: 'brown'
    });
};

Buttons.prototype.clickSquare = function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    var self = this;
    this.color = $('#draw input').val();
    this.text = false;
    this.triangle = false;
    this.circle = false;
    this.square = true;
            
    this.$canvas.awesomeCursor('pencil', {
        color: 'limegreen',
        size: 24,
        hotspot: 'bottom left',
        outline: 'brown'
    });
};

Buttons.prototype.clickCircle = function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    var self = this;
    this.color = $('#draw input').val();
    this.text = false;
    this.triangle = false;
    this.square = false;
    this.circle = true;
        
    this.$canvas.awesomeCursor('pencil', {
        color: 'limegreen',
        size: 24,
        hotspot: 'bottom left',
        outline: 'brown'
    });
};

//Buttons.prototype.drawLogo = function () {
//
//    var image = new Image();
//    image.src = "http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg";
//
//    this.context.drawImage(image, 0, 0, $("#canvas-section").width(), $("#canvas-section").height());
//    console.log("draw logo");
//};




