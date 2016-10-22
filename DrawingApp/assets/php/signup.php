<?php

session_start();
unset($_SESSION['login']);
unset($_SESSION['username']);
unset($_SESSION['user_id']);
$servername = "localhost";
$username = "paint";
$password = "paint";
$dbname = "paint";

$email = $_POST['email'];
$pass = $_POST['pass'];
$flag = 2;
try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $conn->prepare("SELECT * FROM users WHERE email = :email AND password = :pass");

    $stmt->bindParam(':email', $email, PDO::PARAM_STR);
    $stmt->bindParam(':pass', md5($pass), PDO::PARAM_STR);
    $stmt->execute();

    // set the resulting array to associative 
    $result = $stmt->fetch();
    if ($stmt->rowCount() === 1) {
        $_SESSION['login'] = "logged";
        $_SESSION['username'] = $result['username'];
        $_SESSION['user_id'] = $result['id'];
    }
    if (isset($_SESSION['login'])) {
        $flag = 1;
    }
    // echo a message to say the UPDATE succeeded
} catch (PDOException $e) {
    echo $sql . "<br>" . $e->getMessage();
}

$conn = null;


echo json_encode([$flag]);
