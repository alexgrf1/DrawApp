<?php
session_start(); 
$path = getcwd(); 
 
$sql = "SELECT * FROM images WHERE img = :src and user_id =:user_id";
//$_POST["src"] = "ddd/1474829085.jpeg";
$src = explode("/", $_POST["src"]);
$src = $src[count($src) - 1];

// INSERT with named parameters
$conn = new PDO('mysql:host=localhost;dbname=paint', "paint", "paint");

$stmt = $conn->prepare($sql);
$stmt->bindValue(":src", $src);
$stmt->bindValue(":user_id", $_SESSION['user_id']);
$stmt->execute();

$result = $stmt->fetchAll();

echo $result[0]["bgcolor"];