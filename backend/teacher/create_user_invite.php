<?php
require_once("../utility/DB.php");

try{
    $db = new Database();
}
catch(PDOException $pd) {
    echo json_encode(['status' => 'fail']);
    
}

$con = $db->getConnection();
$data = json_decode(file_get_contents('php://input'), true); //getting email

$queryGetId = "SELECT users.id FROM users WHERE users.email=:email";

//$query = "INSERT INTO userinvites('user_id', 'invite_id') VALUES user_id=:user_id, invite_id=:invite_id";

try {
    $result = $con->prepare($queryGetIds);
    $result->execute();
    $result1 = $result->fetch(PDO::FETCH_ASSOC);
    //should be an id now
}
catch(PDOException $pd) {
    
    echo json_encode(['status' => 'fail']);
}

$query = "INSERT INTO userinvites('user_id', 'invite_id') VALUES user=:user_id, invite_id=:invite_id";//tr da mu dawam inv id

echo json_encode($result);

?>