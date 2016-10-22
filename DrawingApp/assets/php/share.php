<?php

session_start();

if(isset($_SESSION['login'])){
if ($_SESSION['login'] == 'logged') {
	$servername = "localhost";
	$username = "paint";
	$password = "paint";
	$dbname = "paint";

	$text = $_POST['text'];

	
	try {
		$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
		// set the PDO error mode to exception
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		
		$stmt = $conn->prepare("SELECT * FROM users_access WHERE username = :username AND shared_with = :text");
		$stmt->bindParam(':username', $text, PDO::PARAM_STR);
		$stmt->bindParam(':text', $_SESSION['username'], PDO::PARAM_STR);
		
		$stmt->execute();
		
		if ($stmt->rowCount() > 0 || $text == $_SESSION['username']) {
			$stmt1 = $conn->prepare("SELECT id FROM users WHERE username = :text");
			$stmt1->bindParam(':text', $text, PDO::PARAM_INT);
			$stmt1->execute();
			
			$resultText = $stmt1->fetchAll();
			
			$foreignID = $resultText[0][0];
			
			$_SESSION['user_id'] = $foreignID;
			
			$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			$stmt2 = $conn->prepare("SELECT * FROM images WHERE user_id = :user_id");
			$stmt2->bindParam(':user_id', $_SESSION['user_id'], PDO::PARAM_INT);
			$stmt2->execute();
			
			
			$result = $stmt2->fetchAll();
		}

		// echo a message to say the UPDATE succeeded
	} catch (PDOException $e) {
		echo $sql . "<br>" . $e->getMessage();
	}

}
}

echo json_encode($foreignID);