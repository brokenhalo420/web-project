<?php 
require_once("../utility/DB.php");

try{
    $db = new Database();
}
catch(PDOException $pd) {
    echo json_encode(['pls kill me' => 'i am serious']);
    
}

$con = $db->getConnection();

$data = json_decode(file_get_contents('php://input'),true);
$query = "INSERT INTO messages (text, private) VALUES (:text, :private)";

try {
    $result = $con->prepare($query);
    $result->execute($data);
}
catch(PDOException $pd) {
    throw new Exception('ss');
}

echo json_encode(["status","success"]);
?>