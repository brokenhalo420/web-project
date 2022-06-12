<?php
require_once("../utility/DB.php");

try{
    $db = new Database();
}
catch(PDOException $pd) {
    echo json_encode(['status' => 'fail']);
    
}

$con = $db->getConnection();

$data = json_decode(file_get_contents('php://input'), true);//gets a queue_id

$query = "INSERT INTO invites(queue_id) VALUES queue_id=:queue_id";

try {
    $result = $con->prepare($query);
    $result->execute(['queue_id' => $data['queue_id']]);
    $result1 = $result->fetchAll();
    echo json_encode($result1);
    exit();
}
catch(PDOException $pd) {
    
    echo json_encode(['status' => 'fail']);
}

echo json_encode($result);

?>