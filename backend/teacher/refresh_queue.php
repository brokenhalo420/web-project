<?php
require_once("../utility/DB.php");

try{
    $db = new Database();
}
catch(PDOException $pd) {
    echo json_encode(['status' => 'fail']);
    
}

$con = $db->getConnection();

$data = json_decode(file_get_contents('php://input'),true);
$queryUserIds = "SELECT user_id FROM queueusers WHERE queue_id=:queue_id";

try {
    $result = $con->prepare($queryUserIds);
    $result->execute(['queue_id' => $data['queue_id']]);
    $result1 = $result->fetchAll();
    $result1Json = json_encode($result1);
}
catch(PDOException $pd) {
    
    echo json_encode(['status' => 'fail']);
}
$queryUsernames = "SELECT users.username FROM users INNER JOIN queueusers ON queueusers.user_id=users.id WHERE queueusers.queue_id=:queue_id";
    
try {
    $result = $con->prepare($queryUsernames);
    $result->execute(['queue_id' => $data['queue_id']]);
    $result1 = $result->fetchAll();
}
catch(PDOException $pd) {
    echo json_encode(['status' => 'fail']);
}
echo json_encode($result1);
?>