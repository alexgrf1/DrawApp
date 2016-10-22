function showHint(str) {
  var xhttp;
  if (str.length == 0) {
    document.getElementById("queryResult").innerHTML = "";
    return;
  }
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    	document.getElementById("queryResult").innerHTML=this.responseText;
        document.getElementById("queryResult").style.border="1px solid #A5ACB2";
    }
  };
  xhttp.open("GET", "assets/php/search.php?q="+str, true);
  xhttp.send();
}

$(function() {

	var array = [];
	for (var i = 0; i < 30; i++) {
		array.push($(".user p:eq("+i+")").text());
	}
	
	$('#queryResult').on( 'click', '#1', function() {
		var txt = $("#1").html();
		$("#query").val(txt);
	});
	$('#queryResult').on( 'click', '#2', function() {
		var txt = $("#2").html();
		$("#query").val(txt);
	});
	$('#queryResult').on( 'click', '#3', function() {
		var txt = $("#3").html();
		$("#query").val(txt);
	});
	$('#queryResult').on( 'click', '#4', function() {
		var txt = $("#4").html();
		$("#query").val(txt);
	});
	$('#queryResult').on( 'click', '#5', function() {
		var txt = $("#5").html();
		$("#query").val(txt);
	});
	
	$('#query').keypress(function(e) {
		$("#search").submit(function(e){
            e.preventDefault();
        });
		var key = e.which;
		if(key == 13 && $("#query").val() != '')  {
			var value = $("#query").val();
			$('#query').val('');
			queryResult
			$.ajax({
	               type: 'POST',
	               url: 'assets/php/user.php',
	               data: {value: value},
	               dataType: 'json',
	               success: function (data) {
	            	   if (data.success) {		
	            		   $("#queryResult").empty();
	            		   $("#retrievedUser").empty();
	            		   $("<p style='height:50px; padding-top:20px;'>" + 
	                				"<i class='fa fa-user-secret'></i><span id='retrievedUser1'>" + value + 
		                				"</span><i class='fa fa-close' id='removeUser'></i></p>" + 
	                				"<i class='fa fa-eye'></i>&nbsp;&nbsp;&nbsp;<i class='fa fa-pencil-square'></i>&nbsp;&nbsp;&nbsp;<i class='fa fa-plus-circle'></i>&nbsp;&nbsp;&nbsp;<i class='fa fa-minus-circle'></i>")
	                				.appendTo("#retrievedUser");
	                	   $("#retrievedUser").css("display", "block");
	                	   $("#retrievedUser").attr("class", "push_button user hvr-rectangle-out");		                	   
	                	} else {
	                		swal("This user does not exist!", "", "error");
	                	}
	                }
	               
	            }); 
		 }
	});
	
	$('#retrievedUser').on( 'click', '#removeUser', function() {
		$("#retrievedUser").empty();
		$("#retrievedUser").css("display", "none");
	});
	
	$('#query').click(function(e) {
		$("#search").submit(function(e){
            e.preventDefault();
        });
		
		if($('#query').val() != '')  {
			var value = $("#query").val();
			$('#query').val('');
			queryResult
			$.ajax({
	               type: 'POST',
	               url: 'assets/php/user.php',
	               data: {value: value},
	               dataType: 'json',
	               success: function (data) {
	            	   if (data.success) {		            		   
	            		   $("#queryResult").empty();	            		   
	            		   $("#retrievedUser").empty();
	                	   $("<p style='height:50px; padding-top:20px;'>" + 
	                				"<i class='fa fa-user-secret'></i><span id='retrievedUser1'>" + value + 
		                				"</span><i class='fa fa-close' id='removeUser'></i></p>" + 
	                				"<i class='fa fa-eye'></i>&nbsp;&nbsp;&nbsp;<i class='fa fa-pencil-square'></i>&nbsp;&nbsp;&nbsp;<i class='fa fa-plus-circle'></i>&nbsp;&nbsp;&nbsp;<i class='fa fa-minus-circle'></i>")
	                				.appendTo("#retrievedUser");
	                	   $("#retrievedUser").css("display", "block");
	                	   $("#retrievedUser").attr("class", "push_button user hvr-rectangle-out");	                	   
	                	   var indexOfButton = 0;
	                	   for (var i = 0; i < 30; i++) {
	                		   if ($("#retrievedUser p").text() == array[i]) {
	                			   x = i;
	                			   $("#users a:eq("+x+")").css("display", "none");
	                			   break;
	                		   }
	                	   }
	            	   } else {
	            		   swal("This user does not exist!", "", "error");
	                	}
	                }
	               
	            }); 
		 }
	});

	$('#retrievedUser').on( 'click', '#removeUser', function() {
		$("#retrievedUser").empty();
		$("#users a:eq("+x+")").css("display", "block");
		$("#retrievedUser").css("display", "none");
	});
	
	$('.user').click(function(e) {

	    var target = $(e.target);
	    var txt = $(this).find("p").text();
	    
	    var indexOfButton = 0;
	    for (var i = 0; i < 30; i++) {
	    	if (txt == array[i]) {
	    		indexOfButton = i;
	    		break;
	    	}
	    }
	    
	    var text = txt;

	    if(target.is('.fa-eye')) {
	    	$.ajax({
	            type: 'POST',
	            url: 'assets/php/share.php',
	            data: $.param({text: text}),
	            dataType: 'json'	            
	         });
	    	$(document).ajaxStop(function(){
	    	    window.location.reload();
	    	});
	    } else if (target.is('.fa-plus-circle')) {
	    	$.ajax({
	            type: 'POST',
	            url: 'assets/php/giveAccess.php',
	            data: $.param({text: text}),
	            dataType: 'json'	            
	        });
	    	$(".user .fa-pencil-square:eq("+indexOfButton+")").css("color", "white");
	    	$(".user .fa-plus-circle:eq("+indexOfButton+")").css("color", "rgb(92, 199, 53)");
	    } else if (target.is('.fa-pencil-square')) {
	    	$.ajax({
	            type: 'POST',
	            url: 'assets/php/editAccess.php',
	            data: $.param({text: text}),
	            dataType: 'json'	            
	        });
	    	$(".user .fa-plus-circle:eq("+indexOfButton+")").css("color", "white");
	    	$(".user .fa-pencil-square:eq("+indexOfButton+")").css("color", "rgb(92, 199, 53)");
	    }  else if (target.is('.fa-minus-circle')) {
	    	$.ajax({
	            type: 'POST',
	            url: 'assets/php/denyAccess.php',
	            data: $.param({text: text}),
	            dataType: 'json'	            
	        });
	    	$(".user .fa-plus-circle:eq("+indexOfButton+")").css("color", "white");
	    	$(".user .fa-pencil-square:eq("+indexOfButton+")").css("color", "white");
	    }
	});
	
	
	$('#retrievedUser').on('click', function(e) {

		var txt = document.getElementById('retrievedUser1').innerHTML;
	    
	    var text = txt;
	    
	    var target = $(e.target);

	    if(target.is('.fa-eye')) {
	    	$.ajax({
	            type: 'POST',
	            url: 'assets/php/share.php',
	            data: $.param({text: text}),
	            dataType: 'json'	            
	         });
	    	$(document).ajaxStop(function(){
	    	    window.location.reload();
	    	});
	    } else if (target.is('.fa-plus-circle')) {
	    	$.ajax({
	            type: 'POST',
	            url: 'assets/php/giveAccess.php',
	            data: $.param({text: text}),
	            dataType: 'json'	            
	        });
	    	$("#retrievedUser .fa-pencil-square").css("color", "white");
	    	$("#retrievedUser .fa-plus-circle").css("color", "rgb(92, 199, 53)");	    	
	    } else if (target.is('.fa-pencil-square')) {
	    	$.ajax({
	            type: 'POST',
	            url: 'assets/php/editAccess.php',
	            data: $.param({text: text}),
	            dataType: 'json'	            
	        });
	    	$("#retrievedUser .fa-plus-circle").css("color", "white");
	    	$("#retrievedUser .fa-pencil-square").css("color", "rgb(92, 199, 53)");
	    } else if (target.is('.fa-minus-circle')) {
	    	$.ajax({
	            type: 'POST',
	            url: 'assets/php/denyAccess.php',
	            data: $.param({text: text}),
	            dataType: 'json'	            
	        });
	    	$("#retrievedUser .fa-plus-circle").css("color", "white");
	    	$("#retrievedUser .fa-pencil-square").css("color", "white");
	    }
	});
	

})

$(document).ready(function() {
	
	$.get('assets/php/eye.php', function(data) {
		if (data != 0) {
			for (var i = 0; i < 30; i++) {
				var textUsername = $(".user p:eq("+i+")").text();
				textUsername = '\"'+textUsername+'\"';
				if (textUsername == data) {
					$(".user .fa-eye:eq("+i+")").css("color", "orange");
				}
			}
		}
	});
	
	$.get('assets/php/checkAccess.php', function(data) {
		if (data == 'false') {
			$("#edit, #delete").hide();
		} else {
			$("#edit, #delete").show();
		}
	});
	
	$.get('assets/php/checkUser.php', function(data) {
		if (data != 'false') {
			var printName = data;
			printName = printName.replace(/['"]+/g, '');
			if ($("#loggedUser").html() != printName) {
				$("<p id='userPics'>"  + printName + "'s pictures</p>").appendTo("#canvas-footer");
			} else {
				$("<p id='userPics'>My pictures</p>").appendTo("#canvas-footer");
			}
		}	
	});
	
	var counter = 0;
	var index = 0;
	for (var i = 0; i < 30; i++) {
		var textUsername = $(".user p:eq("+i+")").text();
		
		ajax(textUsername, counter);
		counter++;
	}
	
	var secondCounter = 0;
	var indexTwo = 0;
	for (var i = 0; i < 30; i++) {
		var nameUser = $(".user p:eq("+i+")").text();
		
		iconColor(nameUser, secondCounter);
		secondCounter++;
	}
	
});

function ajax(textUsername, counter) {
	$.ajax({
        type: 'POST',
        url: 'assets/php/status.php',
        data: $.param({textUsername: textUsername}),
        dataType: 'json',
        success: function(data) {
        	if (data == 1) {
        		index = counter;
        		$(".user p:eq("+index+")").css("color", "rgb(245, 214, 17)");
        		index = 0;
        	}        	
        }
    });
}

function iconColor(nameUser, secondCounter) {
	$.ajax({
        type: 'POST',
        url: 'assets/php/color.php',
        data: $.param({nameUser: nameUser}),
        dataType: 'json',
        success: function(data) {
        	if (data == '1') {
        		indexTwo = secondCounter;
        		$(".user .fa-pencil-square:eq("+indexTwo+")").css("color", "rgb(92, 199, 53)");
        		indexTwo = 0;
        	} else if (data == '2') {
        		indexTwo = secondCounter;
        		$(".user .fa-plus-circle:eq("+indexTwo+")").css("color", "rgb(92, 199, 53)");
        		indexTwo = 0;
        	}    	
        }
    });
}

