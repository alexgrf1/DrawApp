<?php

session_start();

if(isset($_SESSION['login'])){
	if ($_SESSION['login'] == 'logged') {
		$servername = "localhost";
		$username = "paint";
		$password = "paint";
		$dbname = "paint";
		
		$flag = 0;
		$canedit = 'yes';
		$cannotedit = 'no';


		try {
			$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
			// set the PDO error mode to exception
			$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			
			$stmt1 = $conn->prepare("SELECT * FROM users_access WHERE username = :username AND shared_with = :shared_with AND can_edit = :can_edit");
			$stmt1->bindParam(':username', $_SESSION['username'], PDO::PARAM_INT);
			$stmt1->bindParam(':shared_with', $_POST['nameUser'], PDO::PARAM_INT);
			$stmt1->bindParam(':can_edit', $canedit, PDO::PARAM_INT);
			$stmt1->execute();

			if ($stmt1->rowCount() > 0) {
				$flag = 1;
			}
			
			$stmt = $conn->prepare("SELECT * FROM users_access WHERE username = :username AND shared_with = :shared_with AND can_edit = :can_edit");
			$stmt->bindParam(':username', $_SESSION['username'], PDO::PARAM_INT);
			$stmt->bindParam(':shared_with', $_POST['nameUser'], PDO::PARAM_INT);
			$stmt->bindParam(':can_edit', $cannotedit, PDO::PARAM_INT);
			$stmt->execute();
			
			if ($stmt->rowCount() > 0) {
				$flag = 2;
			}
			
			// echo a message to say the UPDATE succeeded
		} catch (PDOException $e) {
			echo $sql . "<br>" . $e->getMessage();
		}

	}
}

echo json_encode($flag);