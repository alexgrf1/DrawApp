<?php
session_start(); 
$path = getcwd(); 
 
$upload_dir = $path."/upload/".$_SESSION['user_id']."/";
$sql = "insert into images(img, user_id, username, bgcolor) values(:image,:user_id,:username,:bgcolor)";

// INSERT with named parameters
$conn = new PDO('mysql:host=localhost;dbname=paint', "paint", "paint");
if (!file_exists($upload_dir)) {
	mkdir($upload_dir, 0700);
}
$p = $_POST["p"];
$bgColor = $_POST["bgColor"];

$img = str_replace('data:image/png;base64,', '', $_POST["image"]);
$img = str_replace(' ', '+', $img);
$data = base64_decode($img);

if ($p == 1) {
$file_sql = mktime() . ".png";
$file = $upload_dir.mktime() . ".png";
} else if ($p == 2) {
    $file_sql = mktime() . ".jpeg";
    $file = $upload_dir.mktime() . ".jpeg";   
}
$success = file_put_contents($file, $data);

echo $success ? $file : 'Unable to save the file.';

$stmt = $conn->prepare($sql);
$stmt->bindValue(":image", $file_sql);
$stmt->bindValue(":user_id", $_SESSION['user_id']);
$stmt->bindValue(":username", $_SESSION['username']);
$stmt->bindValue(":bgcolor", $bgColor);
$stmt->execute();

