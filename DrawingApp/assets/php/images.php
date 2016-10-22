<?php 
if(isset($_SESSION['login'])){
if ($_SESSION['login'] == 'logged') {
    $servername = "localhost";
    $username = "paint";
    $password = "paint";
    $dbname = "paint";
    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        // set the PDO error mode to exception
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare("SELECT * FROM images WHERE user_id = :user_id");
        $stmt->bindParam(':user_id', $_SESSION['user_id'], PDO::PARAM_INT);
        $stmt->execute();


        $result = $stmt->fetchAll();  
        // echo a message to say the UPDATE succeeded
    } catch (PDOException $e) {
        echo $sql . "<br>" . $e->getMessage();
    }

    $conn = null;
}
}