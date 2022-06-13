<?php
require_once("../utility/DB.php");

try{
    $db = new Database();
}
catch(PDOException $pd) {
    echo json_encode(['status' => 'fail']);
    
}

$con = $db->getConnection();
$data = json_decode(file_get_contents('php://input'), true); //getting email and queue id

$queryGetId = "SELECT users.id FROM users WHERE users.email=:email";

//$query = "INSERT INTO userinvites('user_id', 'invite_id') VALUES user_id=:user_id, invite_id=:invite_id";

try {
    $result = $con->prepare($queryGetId);
    $result->execute(['email' => $data['email']]);
    $userId = $result->fetch(PDO::FETCH_ASSOC);
    //should be an id now
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
    //var_dump($inviteId); //imame si inv id
    if ($inviteId == false) {
        try {
            //echo 'the invite is false on 38 row';//try to create invite now
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
    // if ($inviteId == false) {
    //     echo 'second time create invite failed creation maybe check more';
    // }
}
catch(PDOException $pd) {
    echo json_encode(['status' => 'fail']);
}

$queryInsertUserInvite = "INSERT INTO userinvites (user_id, invite_id) VALUES (:user_id, :invite_id)"; //tr da mu dawam inv id

try {
    $result = $con->prepare($queryInsertUserInvite);
    // echo 'line 65';
    // echo 'this is user id' . $userId['id'];
    // echo 'this is invite id' . $inviteId['id'];
    $result->execute(['user_id' => $userId['id'], 'invite_id' => $inviteId['id']]);
    // echo json_encode($result);
    // $didWeCreateIt = $result->fetch(PDO::FETCH_ASSOC);
    // if ($didWeCreateIt == false) {
    //     echo 'fatal error, did not create userinvite';
    // }
}
catch (PDOException $pd) {
    echo json_encode(['status' => 'fail']);
}

echo json_encode(['status' => 'success']);
?>