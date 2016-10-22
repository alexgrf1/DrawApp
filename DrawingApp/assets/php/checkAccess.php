<?php

session_start();

if(isset($_SESSION['login'])){
	if ($_SESSION['login'] == 'logged') {
		$servername = "localhost";
		$username = "paint";
		$password = "paint";
		$dbname = "paint";
		
		$flag = false;
		$canedit = 'yes';


		try {
			$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
			// set the PDO error mode to exception
			$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			
			$stmt = $conn->prepare("SELECT username FROM users WHERE id = :id");
			$stmt->bindParam(':id', $_SESSION['user_id'], PDO::PARAM_INT);
			$stmt->execute();
			
			$result = $stmt->fetchAll();
				
			$uname = $result[0][0];
			
			$stmt1 = $conn->prepare("SELECT * FROM users_access WHERE username = :username AND shared_with = :shared_with AND can_edit = :can_edit");
			$stmt1->bindParam(':username', $uname, PDO::PARAM_INT);
			$stmt1->bindParam(':shared_with', $_SESSION['username'], PDO::PARAM_INT);
			$stmt1->bindParam(':can_edit', $canedit, PDO::PARAM_INT);
			$stmt1->execute();

			if ($stmt1->rowCount() > 0) {
				$flag = true;
			}
			
			if ($uname == $_SESSION['username']) {
				$flag = true;
			}
			// echo a message to say the UPDATE succeeded
		} catch (PDOException $e) {
			echo $sql . "<br>" . $e->getMessage();
		}

	}
}

echo json_encode($flag);