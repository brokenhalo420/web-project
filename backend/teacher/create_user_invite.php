<?php
require_once("../utility/DB.php");

try{
    $db = new Database();
}
catch(PDOException $pd) {
    echo json_encode(['status' => 'fail']);
    
}

$con = $db->getConnection();
$data = json_decode(file_get_contents('php://input'), true); 

$queryGetId = "SELECT users.id FROM users WHERE users.email=:email";


try {
    $result = $con->prepare($queryGetId);
    $result->execute(['email' => $data['email']]);
    $userId = $result->fetch(PDO::FETCH_ASSOC);
}
catch(PDOException $pd) {
    echo json_encode(['status' => 'fail']);
}

$queryCheckIfInviteExists = "SELECT id FROM invites WHERE queue_id=:queue_id";
$queryCreateInvite = "INSERT INTO invites (queue_id) VALUES (:queue_id)";

try {
    $result = $con->prepare($queryCheckIfInviteExists);
    $result->execute(['queue_id' => $data['queue_id']]);
    $inviteId = $result->fetch(PDO::FETCH_ASSOC);
    if ($inviteId == false) {
        try {
            $result = $con->prepare($queryCreateInvite);
            $result->execute(['queue_id' => $data['queue_id']]);
            $inviteId = $result->fetch(PDO::FETCH_ASSOC);
        }
        catch(PDOException $pd) {
            echo json_encode(['status' => 'fail']);
        }
    }
}
catch(PDOException $pd) {
    echo json_encode(['status' => 'fail']);
}
try {
    $result = $con->prepare($queryCheckIfInviteExists);
    $result->execute(['queue_id' => $data['queue_id']]);
    $inviteId = $result->fetch(PDO::FETCH_ASSOC);
}
catch(PDOException $pd) {
    echo json_encode(['status' => 'fail']);
}

$queryInsertUserInvite = "INSERT INTO userinvites (user_id, invite_id) VALUES (:user_id, :invite_id)"; //tr da mu dawam inv id

try {
    $result = $con->prepare($queryInsertUserInvite);
    $result->execute(['user_id' => $userId['id'], 'invite_id' => $inviteId['id']]);
}
catch (PDOException $pd) {
    echo json_encode(['status' => 'fail']);
}

echo json_encode(['status' => 'success']);
?>