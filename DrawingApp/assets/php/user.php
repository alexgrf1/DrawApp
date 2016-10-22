<?php

$servername = "localhost";
$username = "paint";
$password = "paint";
$dbname = "paint";

$value = $_POST['value'];

$response = [
		'success' => true,
		'response' => '',
];

try {
	$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
	// set the PDO error mode to exception
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	$stmt = $conn->prepare("SELECT username FROM users WHERE username = :value");

	$stmt->bindParam(':value', $value, PDO::PARAM_STR);
	$stmt->execute();

	// set the resulting array to associative
	$result = $stmt->fetch();
	if ($stmt->rowCount() !== 1) {
		$response['success'] = false;
	}

} catch (PDOException $e) {
	echo $sql . "<br>" . $e->getMessage();
}

echo json_encode($response);