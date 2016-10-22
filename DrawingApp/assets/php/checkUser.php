<?php

session_start();

$uname = false;

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
			
			$stmt = $conn->prepare("SELECT username FROM users WHERE id = :id");
			$stmt->bindParam(':id', $_SESSION['user_id'], PDO::PARAM_INT);
			$stmt->execute();
			
			$result = $stmt->fetchAll();
				
			$uname = $result[0][0];

			// echo a message to say the UPDATE succeeded
		} catch (PDOException $e) {
			echo $sql . "<br>" . $e->getMessage();
		}

	}
}

echo json_encode($uname);