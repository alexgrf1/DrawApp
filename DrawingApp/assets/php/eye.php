<?php

session_start();

if(isset($_SESSION['login'])){
	if ($_SESSION['login'] == 'logged') {
		$servername = "localhost";
		$username = "paint";
		$password = "paint";
		$dbname = "paint";
		
		$flag = 0;


		try {
			$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
			// set the PDO error mode to exception
			$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			
			$stmt1 = $conn->prepare("SELECT * FROM users WHERE username = :username AND id = :id");
			$stmt1->bindParam(':username', $_SESSION['username'], PDO::PARAM_INT);
			$stmt1->bindParam(':id', $_SESSION['user_id'], PDO::PARAM_INT);
			$stmt1->execute();

			if ($stmt1->rowCount() == 0) {
				$stmt2 = $conn->prepare("SELECT username FROM users WHERE id = :id");
				$stmt2->bindParam(':id', $_SESSION['user_id'], PDO::PARAM_INT);
				$stmt2->execute();
				$results = $stmt2->fetchAll();
				$flag = $results[0][0];
			}
			
			// echo a message to say the UPDATE succeeded
		} catch (PDOException $e) {
			echo $sql . "<br>" . $e->getMessage();
		}

	}
}

echo json_encode($flag);