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
$query = "INSERT INTO queueusers (user_id, queue_id, position, startTime) VALUES (:uname, :qId, 1, date('l0'))";

try {
    $result = $con->prepare($query);
    $result->execute($data);
}
catch(PDOException $pd) {
    throw new Exception('ss');
}

echo json_encode(["status","success"]);
?>