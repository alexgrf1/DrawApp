<?php

session_start();
unset($_SESSION['login']);
unset($_SESSION['username']);
unset($_SESSION['user_id']);
$servername = "localhost";
$username = "paint";
$password = "paint";
$dbname = "paint";
$flag = 2;
try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = :email");
    $stmt->bindParam(':email', $_POST['email'], PDO::PARAM_STR);
    $stmt->execute();  
    
    $stmt2 = $conn->prepare("SELECT * FROM users WHERE username = :username");
    $stmt2->bindParam(':username', $_POST['user'], PDO::PARAM_STR);
    $stmt2->execute();
    if ($stmt2->rowCount() > 0) {
    	$flag = 3;
    }

    // set the resulting array to associative 

    if ($stmt->rowCount() == 0 && $stmt2->rowCount() == 0) {
        $sql = "INSERT INTO users(username,password,email) VALUES (:username,:password,:email)";

        $stmt1 = $conn->prepare($sql);

        $stmt1->bindParam(':username', $_POST['user'], PDO::PARAM_STR);
        $stmt1->bindParam(':email', $_POST['email'], PDO::PARAM_STR);
        $stmt1->bindParam(':password', md5($_POST['pass']), PDO::PARAM_STR);


        $stmt1->execute();
        $stmt->execute();
        
        $result = $stmt->fetch();
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
