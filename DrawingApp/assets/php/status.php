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
			
			$stmt1 = $conn->prepare("SELECT * FROM users_access WHERE username = :username AND shared_with = :shared_with");
			$stmt1->bindParam(':username', $_POST['textUsername'], PDO::PARAM_INT);
			$stmt1->bindParam(':shared_with', $_SESSION['username'], PDO::PARAM_INT);
			$stmt1->execute();

			if ($stmt1->rowCount() > 0) {
				$flag = 1;
			}
			
			// echo a message to say the UPDATE succeeded
		} catch (PDOException $e) {
			echo $sql . "<br>" . $e->getMessage();
		}

	}
}

echo json_encode($flag);