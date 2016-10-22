<?php

session_start();

$servername = "localhost";
$username = "paint";
$password = "paint";
$dbname = "paint";

$text = $_POST['text'];

try {
	
	$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
	// set the PDO error mode to exception
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$stmt = $conn->prepare("DELETE FROM users_access WHERE username = :username AND shared_with = :text");
	$stmt->bindParam(':username', $_SESSION['username'], PDO::PARAM_STR);
	$stmt->bindParam(':text', $text, PDO::PARAM_STR);

	$stmt->execute();
	
} catch (PDOException $e) {
	echo $sql . "<br>" . $e->getMessage();
}