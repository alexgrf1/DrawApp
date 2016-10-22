<?php

session_start();
$id = $_POST['id'];

$path = getcwd();

$upload_dir = $path."/upload/".$_SESSION['user_id']."/";
$sql = "DELETE FROM images WHERE id=:id";
$sql1 = "SELECT img FROM images WHERE id=:id";
// INSERT with named parameters
$conn = new PDO('mysql:host=localhost;dbname=paint', "paint", "paint");



$stmt = $conn->prepare($sql);
$stmt1 = $conn->prepare($sql1);
$stmt->bindValue(":id", $id);
$stmt1->bindValue(":id", $id);
$stmt1->execute();
$result = $stmt1->fetch();
unlink($upload_dir.$result['img']);
$stmt->execute();


