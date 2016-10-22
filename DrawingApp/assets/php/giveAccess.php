<?php

session_start();

$servername = "localhost";
$username = "paint";
$password = "paint";
$dbname = "paint";

$text = $_POST['text'];
$flag = 2;
$can_edit = 'no';
$edit_yes = 'yes';

try {
	$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
	// set the PDO error mode to exception
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$stmt = $conn->prepare("SELECT * FROM users_access WHERE username = :username AND shared_with = :shared_with AND can_edit = :can_edit");
	$stmt->bindParam(':username', $_SESSION['username'], PDO::PARAM_STR);
	$stmt->bindParam(':shared_with', $text, PDO::PARAM_STR);
	$stmt->bindParam(':can_edit', $can_edit, PDO::PARAM_STR);
	$stmt->execute();

	if ($stmt->rowCount() > 0) {
		$flag = 3;
	}
	
	$stmt2 = $conn->prepare("SELECT * FROM users_access WHERE username = :username AND shared_with = :shared_with AND can_edit = :can_edit");
	$stmt2->bindParam(':username', $_SESSION['username'], PDO::PARAM_STR);
	$stmt2->bindParam(':shared_with', $text, PDO::PARAM_STR);
	$stmt2->bindParam(':can_edit', $edit_yes, PDO::PARAM_STR);
	$stmt2->execute();
	
	if ($stmt2->rowCount() > 0) {
		$sql = "UPDATE `users_access` SET `can_edit` = 'no' WHERE `username` = :username AND `shared_with` = :shared_with";
		$stmt3 = $conn->prepare($sql);
		$stmt3->bindParam(':username', $_SESSION['username'], PDO::PARAM_STR);
		$stmt3->bindParam(':shared_with', $text, PDO::PARAM_STR);
		$stmt3->execute();
	}

	// set the resulting array to associative

	if ($stmt->rowCount() == 0 && $stmt2->rowCount() == 0) {
		$sql = "INSERT INTO users_access(username,shared_with,can_edit) VALUES (:username,:shared_with,:can_edit)";

		$stmt1 = $conn->prepare($sql);

		$stmt1->bindParam(':username', $_SESSION['username'], PDO::PARAM_STR);
		$stmt1->bindParam(':shared_with', $text, PDO::PARAM_STR);
		$stmt1->bindParam(':can_edit', $can_edit, PDO::PARAM_STR);

		$stmt1->execute();

	}
	// echo a message to say the UPDATE succeeded
} catch (PDOException $e) {
	echo $sql . "<br>" . $e->getMessage();
}

