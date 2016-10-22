function Theme() {
    this.frameColor = "#686565";
    this.headerBackgroundColor = "#272727";
    this.backgroundToolBars = "#5c5c5c";
    this.hoverButtons = "#434242";
    this.colorHover = "#ffffff";
    this.outButtons = "#4f4f4f";
    this.outHover = "lightgrey";
    this.radOut = "#40403e";
    this.imagesDivColor = "#e1e1e0";

    this.buttonsMenu = $("#buttons-menu");
    this.shapesMenu = $("#shapes-menu");
    this.canvasSection = $("#canvas-section");
    this.sectionBorders = [this.buttonsMenu, this.shapesMenu, this.canvasSection];
    this.header = $("#header");
    this.footer = $('#canvas-footer');
    this.shapesMenuBackgound = $("#shapes-menu");
    this.userButtons = $(".user");
    var self = this;

    this.undo = $("#undo");
    this.redo = $("#redo");
    this.save = $("#save");
    this.origUser = $("#origUser");
    this.incrad = $("#incrad");
    this.decrad = $("#decrad");
    this.rad = $("#rad");
    this.fontFamily = $("#fontFamily");
    this.images = $("#imgs");
    this.select = $("#fontFamily select");

    $('#colors').on('click', this.putBorder.bind(this));
    //  $("#header").on('click', this.putBorderReload.bind(self));
    $(function () {
        if (screen.width <= 1280) {

            var colors = $('#colors');
            $('#colors').remove();
            colors.find("div").css({
                width: "1em",
                height: "1em"
            });
            colors.appendTo($('#canvas-footer')).css({
                marginLeft: "1em",
                marginTop: "0.2em",
                zIndex: "9999"
            });
            $('#canvas-footer').on('touchstart', colors, function (e) {              
                self.putBorder(e);
            });
        }

        if (self.getCokie("theme")) {
            $("#" + self.getCokie("theme")).trigger("click");
        }
        
        if ($("#imgs").find("div").length !== 0) {
            $("#imgs").css("display", "inline-block");
        } else {
            $("#imgs").css("display", "none");
        }
    });
}
Theme.prototype.putBorder = function (e) {
    console.log(e);
    var clicked = e.target.getAttribute('id');
///////////////// COOKIES
    if (clicked != this.getCokie("theme")) {
        this.createCookie("theme", clicked, 20);
    }

    e.stopPropagation();
    var $buttons = $('#colors');
    $('#colors div').css({
        border: "none"
    });
    $buttons.css({
        border: "none"
    });

    var $e = $(e.target);
    if ($e.attr("class") === "colorSet") {
        this.frameColor = $e.css("background-color");
        $e.css("border", "2px solid white");
        //console.log($e.attr("data-myval"));
        var array = this.split($e.attr("data-myval"));
        this.headerBackgroundColor = array[0];
        this.backgroundToolBars = array[1];
        this.hoverButtons = array[2];
        this.colorHover = array[3];
        this.outButtons = array[4];
        this.outHover = array[5];
        this.radOut = array[6];
        this.imagesDivColor = array[7];
    }

    this.changeTheme();
};

Theme.prototype.createCookie = function (name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else
        var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
};

Theme.prototype.getCokie = function (name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
            return c.substring(nameEQ.length, c.length);
    }
    return null;
};

Theme.prototype.eraseCookie = function (name) {
    this.createCookie(name, "", -1);
};

Theme.prototype.changeTheme = function () {
    var self = this;
    for (var i in this.sectionBorders) {
        this.sectionBorders[i].css({
            borderColor: this.frameColor
        });
    }

    this.header.css({
        backgroundColor: self.headerBackgroundColor
    });
    this.footer.css({
        backgroundColor: self.headerBackgroundColor
    });
    this.rad.css({
        backgroundColor: self.backgroundToolBars,
        color: self.outHover
    });
    this.fontFamily.css({
        backgroundColor: self.backgroundToolBars,
        color: self.outHover
    });
    this.select.css({
        color: self.outHover
    });
    this.undo.css({
        backgroundColor: self.backgroundToolBars,
        color: self.outHover
    });
    this.redo.css({
        backgroundColor: self.backgroundToolBars,
        color: self.outHover
    });
    this.save.css({
        backgroundColor: self.backgroundToolBars,
        color: self.outHover
    });
    this.origUser.css({
        backgroundColor: self.backgroundToolBars,
        color: self.outHover
    });
    this.incrad.css({
        backgroundColor: self.radOut,
        color: self.outHover
    });
    this.decrad.css({
        backgroundColor: self.radOut,
        color: self.outHover
    });
    this.images.css({
        backgroundColor: self.imagesDivColor
    });
    this.shapesMenuBackgound.css({
        backgroundColor: self.headerBackgroundColor
    });
    this.userButtons.css({
        backgroundImage: "-webkit-linear-gradient(top," + self.backgroundToolBars + "," + self.backgroundToolBars + ")",
        border : self.backgroundToolBars,
        backgroundColor: self.backgroundToolBars
    });

    this.undo.hover(function () {
        self.undo.css({
            backgroundColor: self.hoverButtons,
            color: self.colorHover
        });
    }, function () {
        self.undo.css({
            backgroundColor: self.backgroundToolBars,
            color: self.outHover
        });
    });
    this.redo.hover(function () {
        self.redo.css({
            backgroundColor: self.hoverButtons,
            color: self.colorHover
        });
    }, function () {
        self.redo.css({
            backgroundColor: self.backgroundToolBars,
            color: self.outHover
        });
    });

    this.save.hover(function () {
        self.save.css({
            backgroundColor: self.hoverButtons,
            color: self.colorHover
        });
    }, function () {
        self.save.css({
            backgroundColor: self.backgroundToolBars,
            color: self.outHover
        });
    });

    this.origUser.hover(function () {
        self.origUser.css({
            backgroundColor: self.hoverButtons,
            color: self.colorHover
        });
    }, function () {
        self.origUser.css({
            backgroundColor: self.backgroundToolBars,
            color: self.outHover
        });
    });

    this.incrad.hover(function () {
        self.incrad.css({
            backgroundColor: self.hoverButtons,
            color: self.colorHover
        });
    }, function () {
        self.incrad.css({
            backgroundColor: self.radOut,
            color: self.outHover
        });
    });
    this.decrad.hover(function () {
        self.decrad.css({
            backgroundColor: self.hoverButtons,
            color: self.colorHover
        });
    }, function () {
        self.decrad.css({
            backgroundColor: self.radOut,
            color: self.outHover
        });
    });
};

Theme.prototype.split = function (value) {
    var array = value.split(",");
    return array;
};
