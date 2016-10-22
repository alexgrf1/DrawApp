<?php

session_start();
$servername = "localhost";
$username = "paint";
$password = "paint";
$dbname = "paint";
try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $conn->prepare("SELECT username FROM users ORDER BY username ASC");
    $stmt->execute();
    $result = $stmt->fetchAll();

    // echo a message to say the UPDATE succeeded
} catch (PDOException $e) {
    echo $sql . "<br>" . $e->getMessage();
}

$conn = null;

foreach ($result as $key => $val) {
    if (!($_SESSION['username'] == $val['username'])) {
        $array[] = $val['username'];
    }
} 


// get the q parameter from URL
$q = $_REQUEST["q"];

$hint = "";

$counter = 0;
// lookup all hints from array if $q is different from ""
if ($q !== "") {
    $q = strtolower($q);
    $len = strlen($q);
    foreach ($array as $name) {
        if (stristr($q, substr($name, 0, $len))) {
        if ($hint === "") {
				$counter++;
				$hint = "<p id='$counter' class='non-existing'>$name</p>";
			} else {
				$counter++;
				$hint .= "<p id='$counter' class='non-existing'>$name</p>";
			}
        }
    }
}

echo $hint === "" ? "no suggestion" : $hint;
