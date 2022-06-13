<?php
    require_once("../utility/db.php");


    function getInvites($username){
        $SQL = "SELECT * FROM invites";
        try{
            $db = new Database();
            $result = $db->getConnection()->prepare($SQL);
            $result->execute(['username' => $username['username']]);
            if ($result->rowCount() != 0) {

                $invites = $result->fetchAll();

                return $invites;

            } else {
                return false;
            }

        } catch (PDOException $e){
            throw new Exception($e->getMessage());
        }

    }

    $username = json_decode(file_get_contents("php://input"),true);
    if($username && isset($username['username'])){
        try {
            $invites = getInvites($username);
            if($invites){
                http_response_code(200);
                echo json_encode(['status' => 'SUCCESS', 'invites' => $invites]);
            }
            else {
                http_response_code(202);
                echo json_encode(['status' => 'SUCCESS', 'message' => 'No invites for this user']);
            }
            
        } catch (PDOException $e){
            http_response_code(500);
            echo json_encode(['status' => 'FAILURE']);
        }
    }
    else {
        http_response_code(400);
        echo json_encode(['status' => 'FAILURE']);
    }

?>