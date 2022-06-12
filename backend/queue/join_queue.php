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

$queryGetUser = "SELECT * FROM users WHERE username=:username && password=:password";
$userDetails = [];
try {
    $result = $con->prepare($queryGetUser);
    $result->execute(['username' => $data['username'], 'password' => $data['password']]);
    $userDetails = $result -> fetch(PDO::FETCH_ASSOC);
}
catch(PDOException $pd) {
    throw new Exception('ss');
}
$query = "INSERT INTO queueusers (user_id, queue_id, position, startTime) VALUES (:user_id, :queue_id, :position, :startTime)";

try {
    $result = $con->prepare($query);
    $result->execute(['user_id' => $userDetails['id'], 'queue_id' => $data['queue_id'], 'position' => 1, 'startTime' => date('h:i:sa')]);
}
catch(PDOException $pd) {
    throw new Exception('ss');
}

echo json_encode(["status","success"]);
?>