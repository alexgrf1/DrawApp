<?php session_start(); ?>
<?php require_once 'assets/php/images.php'; ?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Online Paint</title>
        <link href="assets/css/hover/Hover-master/css/hover.css" rel="stylesheet" media="all">
        <link rel="stylesheet" type="text/css" href="assets/css/login.css"/>
        <link rel="stylesheet" type="text/css" href="assets/css/reset.css">
        <link rel="stylesheet" type="text/css" href="assets/css/header.css">
        <link rel="stylesheet" type="text/css" href="assets/css/section.css">
        <link rel="stylesheet" type="text/css" href="assets/css/buttons.css">
        <link rel="stylesheet" type="text/css" href="assets/css/images.css">
        <link rel="stylesheet" type="text/css" href="assets/css/font-awesome/css/font-awesome.css"/>
        <link rel="stylesheet" type="text/css" href="node_modules/jquery-awesome-cursor/node_modules/font-awesome/css/font-awesome.min.css">
        <link rel="stylesheet" type="text/css" href="assets/sweetalert-master/dist/sweetalert.css">
        <link rel="stylesheet" type="text/css" href="assets/css/style.css">
    </head>
    <body>

        <div id="container"> 
            <div id="header">
                <nav style="max-height: 5em;">
                    <div id="nav-menu">
                        <?php if (isset($_SESSION['login'])): ?>
                            <?php if ($_SESSION['login'] == "logged"): ?>
                                <span id="origUser" title="View my pcitures"><i class="fa fa-user-secret"></i><span id="loggedUser"><?php echo $_SESSION['username'] ?></span></span>
                                <span id="save">Save <i class="fa fa-save"></i></span>
                            <?php endif; ?> 
                        <?php endif; ?> 
                    </div>

                </nav>

                <div id="undoRedo">
                    <span id="undo" title="undo"><i class="fa fa-undo" aria-hidden="true"></i></span>&nbsp;&nbsp;
                    <span id="redo" title="redo"><i class="fa fa-repeat" aria-hidden="true"></i></span>
                </div>

                <div id="radToolbar">
                    <div id="rad">
                        Size <span id="radval">15</span>
                        <div id="incrad" class="radcontrol">+</div>
                        <div id="decrad" class="radcontrol">-</div>
                    </div>
                </div>
                
                <div id="fontToolbar">
                    <div id="fontFamily">
                        Font &nbsp;
                        <select>
                            <option value="agency fb">Agency FB</option>
                            <option value="antiqua">Antiqua</option>
                            <option value="architect">Architect</option>
                            <option value="arial">Arial</option>
                        </select>
                    </div>
                </div>
                
                <div id="colors">
                    <div class="colorSet" id="lightgrey" data-myval="#272727,#5c5c5c,#434242,#ffffff,#5c5c5c,lightgrey,#4b4b4b,#e1e1e0"></div>
                    <div class="colorSet" id="orange" data-myval="#a86b13,#de8e03,#9e5b12,#000000,#de8e03,#ffffff,#bd7a3f,#f7ebda"></div>
                    <div class="colorSet" id="red" data-myval="#751d0e,#c92206,#de573d,#000000,#c92206,#ffffff,#9e0000,#f2e1e1"></div>
                    <div class="colorSet" id="yellow" data-myval="#a9a004,#dbcf0d,#837c3d,#000000,#dbcf0ds,#ffffff,#bcb048,#f8f4ce"></div>
                    <div class="colorSet" id="green" data-myval="#1a6e06,#21af00,#438f1e,#000000,#21af00,#ffffff,#2c7807,#e5f9db"></div>
                    <div class="colorSet" id="blue" data-myval="#066eaa,#2ca3e7,#6980bc,#000000,#2ca3e7,#abf2fa,#4587ad,#dbfafe"></div>
                </div>
                
                <?php if (!isset($_SESSION['login'])): ?> 
                    <div id="login" class="col-3">
                        <nav class="main-nav">
                            <ul>							
                                <li><a class="cd-signin" href="#0">Sign in</a></li>
                            </ul>
                        </nav>
                        <div class="cd-user-modal">
                            <div class="cd-user-modal-container">
                                <ul class="cd-switcher">
                                    <li><a href="#0">Sign in</a></li>
                                    <li><a href="#0">Registration</a></li>
                                </ul>

                                <div id="cd-login">
                                    <form class="cd-form" action="" method="post">
                                        <p class="fieldset">
                                            <label class="image-replace cd-email" for="signin-email">E-mail</label>
                                            <input class="full-width has-padding has-border" id="signin-email" type="email" placeholder="E-mail">
                                            <span class="cd-error-message" id="error1">Error!</span>
                                        </p>

                                        <p class="fieldset">
                                            <label class="image-replace cd-password" for="signin-password">Password</label>
                                            <input class="full-width has-padding has-border" id="signin-password" type="password"  placeholder="Password">

                                            <span class="cd-error-message" id="error2">Error!</span>
                                            <a href="#0" class="hide-password">Show</a>
                                        </p> 

                                        <p class="fieldset">
                                            <label id="errorMessage" class="full-width has-padding has-border" style="display: none; color:#d76666">Login failed! Wrong username or password!</label>
                                        </p>

                                        <p class="fieldset">
                                            <input class="full-width" type="submit" value="Sign in">
                                        </p>
                                    </form>


                                </div>

                                <div id="cd-signup">
                                    <form class="cd-form" action="" method="post">
                                        <p class="fieldset">
                                            <label class="image-replace cd-username" for="signup-username">Username</label>
                                            <input class="full-width has-padding has-border" id="signup-username" type="text" placeholder="Username">
                                            <span class="cd-error-message">Error!</span>
                                            <span class="cd-error-message">Username already exists!</span>
                                        </p>

                                        <p class="fieldset">
                                            <label class="image-replace cd-email" for="signup-email">E-mail</label>
                                            <input class="full-width has-padding has-border" id="signup-email" type="email" placeholder="E-mail">
                                            <span class="cd-error-message">Error!</span>
                                            <span class="cd-error-message">E-mail already exists!</span>
                                        </p>

                                        <p class="fieldset">
                                            <label class="image-replace cd-password" for="signup-password">Password</label>
                                            <input class="full-width has-padding has-border" id="signup-password" type="password"  placeholder="Password">
                                            <span class="cd-error-message">Error!</span>
                                            <a href="#0" class="hide-password">Show</a> 

                                        </p>

                                        <p class="fieldset">
                                            <input class="full-width has-padding" type="submit" value="Registration">
                                        </p>
                                    </form>
                                </div>

                            </div>
                        </div>	
                    </div>
                <?php else : ?>
                    <div id="logout">
                        <nav class="main-navs">
                            <ul>							
                                <li><span class="logout" >Logout</span></li>
                            </ul>
                        </nav>
                    </div>
                <?php endif; ?> 
            </div>


            <div id="section">

                <aside id="buttons-menu">

                    <ul id="buttons-list">
                        <li><a href="#" class="push_button red"><button type="button" class="buttons hvr-pop" id="btn-clear">Clear
                                </button></a>
                        </li>
                        <li>
                            <a href="#" class="push_button orange">
                                <button type="button" class="buttons hvr-pop" id="btn-format-jpeg">Jpeg
                                </button>
                            </a>
                        </li>

                        <li>
                            <a href="#" class="push_button yellow">
                                <button type="button" class="buttons hvr-pop" id="btn-format-png">Png
                                </button>
                            </a>
                        </li>

                        <li><a href="#" class="push_button green-dark"><button type="button" class="buttons hvr-pop" id="btn-delete">
                                    <i class="fa fa-eraser" aria-hidden="true"></i></button></a>
                        </li>
                        <li>
                            <a href="#" class="push_button blue">
                                <button type="button" class="buttons hvr-pop" id="draw"><i class="fa fa-paint-brush" aria-hidden="true"></i>
                                    <input type="color" name="favcolor"  value="#e958d3">
                                </button>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="push_button blue-dark">
                                <button type="button" class="buttons hvr-pop" id="background"><i class="fa fa-desktop" aria-hidden="true"></i>
                                    <input type="color" name="favcolor"  value="#63ef4c">
                                </button>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="push_button purple-dark">
                                <button type="button" class="buttons hvr-pop" id="img-background">
                                    <span>
                                        <label for="files">Image</label>
                                        <input id="files" style="" type="file">
                                    </span>
                                    <img src="" style="display: none;"/>
                                </button>
                            </a>
                        </li>

                        <li>
                            <a href="#" class="push_button purple-light">
                                <button type="button" class="buttons hvr-pop" id="btn-text">
                                    Text
                                </button>
                            </a>
                        </li>

                        <li>
                            <a href="#" class="push_button red-light">
                                <button type="button" class="buttons hvr-pop" id="triangle">
                                    <span>△</span>
                                </button>
                            </a>
                        </li>

                        <li>
                            <a href="#" class="push_button red-dark">
                                <button type="button" class="buttons hvr-pop" id="square">
                                    <i class="fa fa-square-o fa-2x" aria-hidden="true"></i>
                                </button>
                            </a>
                        </li>

                        <li>
                            <a href="#" class="push_button purple-middle">
                                <button type="button" class="buttons hvr-pop" id="circle">
                                    <i class="fa fa-circle-thin fa-2x" aria-hidden="true"></i>
                                </button>
                            </a>
                        </li>

                    </ul>

                </aside>
                
            <?php if (isset($_SESSION['login']) && $_SESSION['login'] == 'logged'): ?>    
                <aside id="shapes-menu">

                    <?php if (isset($_SESSION['login']) && $_SESSION['login'] == 'logged'): ?>
                        <form id="search">
                            <input type="text" name="search" placeholder="Search" onkeyup="showHint(this.value)" id="query"/>
                            <p id="queryResult"></p>
                        </form>
                        <div id="users">
                        	<div id="retrievedUser"></div>
                            <?php
                            if ($_SESSION['login'] == 'logged') {
                                $servername = "localhost";
                                $username = "paint";
                                $password = "paint";
                                $dbname = "paint";
                                try {
                                    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
                                    // set the PDO error mode to exception
                                    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                                    $stmt = $conn->prepare("SELECT username FROM users ORDER BY username ASC");
                                    $stmt->execute();
                                    $result_user = $stmt->fetchAll();

                                    // echo a message to say the UPDATE succeeded
                                } catch (PDOException $e) {
                                    echo $sql . "<br>" . $e->getMessage();
                                }

                                $conn = null;
                            }
                            ?> 
                            <?php foreach ($result_user as $k => $row): ?>
                                <?php if (!($_SESSION['username'] == $row['username'])): ?>

                                    <a href="#" class="push_button user hvr-rectangle-out" id="user-link">
                                        <p style="height:50px; padding-top:20px;" id="uname"><i class="fa fa-user-secret"></i><?php echo $row['username'] ?></p>
                                        <i class="fa fa-eye" title="See pictures"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-pencil-square" title="Grant edit permission"></i>&nbsp;&nbsp;&nbsp;<i title="Grant watch permission" class="fa fa-plus-circle"></i>&nbsp;&nbsp;&nbsp;<i title="Deny permission" class="fa fa-minus-circle"></i>
                                    </a>

                                <?php endif; ?>
                            <?php endforeach; ?>

                        </div>
                    <?php endif; ?>

                </aside>
                
            <?php else: ?>
                    <aside id="shapes-menu" style="overflow-y:hidden">

                    </aside>
            <?php endif; ?>
                
                <div id="canvas-section" class="col-7 col-m-7">
                    <canvas id="canvas"></canvas>
                </div>

                <div id="canvas-footer"></div>

            </div>
            <?php if (isset($_SESSION['login'])): ?>
                <?php if ($_SESSION['login'] == 'logged'): ?> 
                    <div id="imgs">
                        <?php foreach ($result as $key => $val): ?>
                            <div class="all-img hvr-curl-top-left" id="<?php echo $val['id'] ?>">
                                <img src="assets/php/upload/<?php echo $_SESSION['user_id'] . "/" . $val['img'] ?>"/>
                                <i class="fa fa-edit hvr-icon-pulse-grow" id="edit"></i>&nbsp;&nbsp; <i class="fa fa-close hvr-icon-pulse-grow" id="delete"></i>
                            </div>
                        <?php endforeach; ?>
                    </div>
                <?php endif; ?>
            <?php endif; ?>
        </div>

        <script src="node_modules/jquery/dist/jquery.min.js"></script>
        <script src="node_modules/jquery-awesome-cursor/dist/jquery.awesome-cursor.min.js"></script>
        <script src="assets/sweetalert-master/dist/sweetalert.min.js"></script> 
        <script type="text/javascript" src="assets/js/Shape.js"></script>
        <script type="text/javascript" src="assets/js/Circle.js"></script>
        <script type="text/javascript" src="assets/js/Triangle.js"></script>
        <script type="text/javascript" src="assets/js/Square.js"></script>
        <script type="text/javascript" src="assets/js/DrawingArea.js"></script>
        <script type="text/javascript" src="assets/js/Buttons.js"></script>
        <script type="text/javascript" src="assets/js/Theme.js"></script>
        <script type="text/javascript" src="assets/js/DrawingApp.js"></script>
        <script type="text/javascript" src="assets/js/main.js"></script>
        <script type="text/javascript" src="assets/js/search.js"></script>
        <script src="assets/js/login.js" type="text/javascript"></script>

    </body>
    
</html>