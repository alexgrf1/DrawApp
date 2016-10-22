jQuery(document).ready(function ($) {
	
    var formModal = $('.cd-user-modal'),
            formLogin = formModal.find('#cd-login'),
            formSignup = formModal.find('#cd-signup'),
            formForgotPassword = formModal.find('#cd-reset-password'),
            formModalTab = $('.cd-switcher'),
            tabLogin = formModalTab.children('li').eq(0).children('a'),
            tabSignup = formModalTab.children('li').eq(1).children('a'),
            forgotPasswordLink = formLogin.find('.cd-form-bottom-message a'),
            backToLoginLink = formForgotPassword.find('.cd-form-bottom-message a'),
            mainNav = $('.main-nav');

    //open modal
    mainNav.on('click', function (event) {
        $(event.target).is(mainNav) && mainNav.children('ul').toggleClass('is-visible');
    });

    //open sign-up form
    mainNav.on('click', '.cd-signup', signup_selected);
    //open login-form form
    mainNav.on('click', '.cd-signin', login_selected);

    //close modal
    formModal.on('click', function (event) {
        if ($(event.target).is(formModal) || $(event.target).is('.cd-close-form')) {
            formModal.removeClass('is-visible');
        }
    });
    //close modal when clicking the esc keyboard button
    $(document).keyup(function (event) {
        if (event.which == '27') {
            formModal.removeClass('is-visible');
        }
    });

    //switch from a tab to another
    formModalTab.on('click', function (event) {
        event.preventDefault();
        ($(event.target).is(tabLogin)) ? login_selected() : signup_selected();
    });

    //hide or show password
    $('.hide-password').on('click', function () {
        var togglePass = $(this),
                passwordField = togglePass.prev().prev('input');

        ('password' == passwordField.attr('type')) ? passwordField.attr('type', 'text') : passwordField.attr('type', 'password');
        ('Hide' == togglePass.text()) ? togglePass.text('Show') : togglePass.text('Hide');
        //focus and move cursor to the end of input field
        passwordField.putCursorAtEnd();
    });

    //show forgot-password form 
    forgotPasswordLink.on('click', function (event) {
        event.preventDefault();
        forgot_password_selected();
    });

    //back to login from the forgot-password form
    backToLoginLink.on('click', function (event) {
        event.preventDefault();
        login_selected();
    });

    function login_selected() {
        mainNav.children('ul').removeClass('is-visible');
        formModal.addClass('is-visible');
        formLogin.addClass('is-selected');
        formSignup.removeClass('is-selected');
        formForgotPassword.removeClass('is-selected');
        tabLogin.addClass('selected');
        tabSignup.removeClass('selected');
    }

    function signup_selected() {
        mainNav.children('ul').removeClass('is-visible');
        formModal.addClass('is-visible');
        formLogin.removeClass('is-selected');
        formSignup.addClass('is-selected');
        formForgotPassword.removeClass('is-selected');
        tabLogin.removeClass('selected');
        tabSignup.addClass('selected');
    }

    function forgot_password_selected() {
        formLogin.removeClass('is-selected');
        formSignup.removeClass('is-selected');
        formForgotPassword.addClass('is-selected');
    }
    
    var counter = 0;
    var counter2 = 0;

    //REMOVE THIS - it's just to show error messages 
    formLogin.find('input[type="submit"]').on('click', function (event) {
        event.preventDefault();
        var email = $('#signin-email').val();
        var pass = $('#signin-password').val();
        var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        ;

        if (!pattern.test(email) && counter == 0) {
            formLogin.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass('is-visible');
            counter++;
        } if (pattern.test(email) && counter == 1) {
            formLogin.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass('is-visible');
            counter++;
        } if (pass == "" && counter2 == 0) {
            formLogin.find('input[type="password"]').toggleClass('has-error').next('span').toggleClass('is-visible');
            counter2++;
        } if (pass != "" && counter2 == 1) {
            formLogin.find('input[type="password"]').toggleClass('has-error').next('span').toggleClass('is-visible');
            counter2++;
        } if (pass != "" && email != "" && pattern.test(email)) {
            $.ajax({
                type: 'POST',
                url: 'assets/php/signup.php',
                data: {email: email, pass: pass}, // or JSON.stringify ({name: 'jonas'}),
                success: function (data) {
                    if (data == 1) {
                        window.location.reload();
                    } else {
                        $("#errorMessage").css("display", "block");
                    }
                },
                dataType: 'json'
            });
        }


    });
    
    var counter3 = 0;
    var counter4 = 0;
    var counter5 = 0;
    
    var counter6 = 0;
    var counter7 = 0;
    
    formSignup.find('input[type="submit"]').on('click', function (event) {
        event.preventDefault();
        var email = $('#signup-email').val();
        var user = $('#signup-username').val();
        var pass = $('#signup-password').val();
        var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        ;

        if (!pattern.test(email) && counter3 == 0) {
            formSignup.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass('is-visible');
            counter3++;
        } if (pattern.test(email) && counter3 == 1) {
            formSignup.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass('is-visible');
            counter3++;
        } if (pass == "" && counter4 == 0) {
            formSignup.find('input[type="password"]').toggleClass('has-error').next('span').toggleClass('is-visible');
            counter4++;
        } if (pass != "" && counter4 == 1) {
            formSignup.find('input[type="password"]').toggleClass('has-error').next('span').toggleClass('is-visible');
            counter4++;
        } if (user == "" && counter5 == 0) {
            formSignup.find('input[type="text"]').toggleClass('has-error').next('span').toggleClass('is-visible');
            counter5++;
        } if (user != "" && counter5 == 1) {
            formSignup.find('input[type="text"]').toggleClass('has-error').next('span').toggleClass('is-visible');
            counter5++;
        } if (pass != "" && user != "" && pattern.test(email)) {
            $.ajax({
                type: 'POST',
                url: 'assets/php/registration.php',
                data: {email: email, pass: pass, user: user}, // or JSON.stringify ({name: 'jonas'}),
                success: function (data) {
                	$("#errorEmail").css("display", "none");
                	$("#errorUsername").css("display", "none");
                    if (data == 1) {
                        window.location.reload();
                    } else {
                    	if (data == 2 && counter6 == 0) {
                        	formSignup.find('input[type="email"]').toggleClass('has-error').next('span').next().toggleClass('is-visible');
                        	counter6++;
                        } if (data != 2 && counter6 == 1) {
                        	formSignup.find('input[type="email"]').toggleClass('has-error').next('span').next().toggleClass('is-visible');
                        	counter6++;
                        } if (data == 3 && counter7 == 0) {
                        	formSignup.find('input[type="text"]').toggleClass('has-error').next('span').next().toggleClass('is-visible');
                        	counter7++;
                        } if (data != 3 && counter7 == 1) {
                        	formSignup.find('input[type="text"]').toggleClass('has-error').next('span').next().toggleClass('is-visible');
                        	counter7++;
                        }
                    }
                },
                dataType: 'json'
            });
        }
    });


//IE9 placeholder fallback
//credits http://www.hagenburger.net/BLOG/HTML5-Input-Placeholder-Fix-With-jQuery.html
/*    if (!Modernizr.input.placeholder) {
        $('[placeholder]').focus(function () {
            var input = $(this);
            if (input.val() == input.attr('placeholder')) {
                input.val('');
            }
        }).blur(function () {
            var input = $(this);
            if (input.val() == '' || input.val() == input.attr('placeholder')) {
                input.val(input.attr('placeholder'));
            }
        }).blur();
        $('[placeholder]').parents('form').submit(function () {
            $(this).find('[placeholder]').each(function () {
                var input = $(this);
                if (input.val() == input.attr('placeholder')) {
                    input.val('');
                }
            })
        });
    }

}
);*/
//credits http://css-tricks.com/snippets/jquery/move-cursor-to-end-of-textarea-or-input/
jQuery.fn.putCursorAtEnd = function () {
    return this.each(function () {
        // If this function exists...
        if (this.setSelectionRange) {
            // ... then use it (Doesn't work in IE)
            // Double the length because Opera is inconsistent about whether a carriage return is one character or two. Sigh.
            var len = $(this).val().length * 2;
            this.focus();
            this.setSelectionRange(len, len);
        } else {
            // ... otherwise replace the contents with itself
            // (Doesn't work in Google Chrome)
            $(this).val($(this).val());
        }
    });
};

//logout
$('#logout').on('click', function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    var r = swal({   
    	title: "Do you want to leave?",   
    	text: "",   
    	type: "warning",   
    	showCancelButton: true,   
    	confirmButtonColor: "#DD6B55",   
    	confirmButtonText: "Yes, leave!",   
    	cancelButtonText: "No, stay!",   
    	closeOnConfirm: false,   
    	closeOnCancel: false 
    	}, function(isConfirm){   
    		if (isConfirm) {     
    			$.ajax({
    		        type: 'POST',
    		        url: 'assets/php/logout.php', // or JSON.stringify ({name: 'jonas'}),
    		        dataType: 'json',
    		        success: function (data) {
    		            if (data == 1) {
    		                window.location.reload();
    		            } else {
    		                alert("check your fields");
    		            }
    		        }
    		    })   
    			} else {     
    				swal("You stay at this page!", "", "success");   
    			} 
    		});
    ;
});

});



