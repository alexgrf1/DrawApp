<?php

session_start();
unset($_SESSION['login']);
unset($_SESSION['username']);
$flag = 1;
echo json_encode([$flag]);
