<?php
    require_once("../utility/db.php");


    function getInviteData($name){
        $SQL = "SELECT queues.name, queues.id from queues where queues.name=:name";
        try{
            $db = new Database();
            $result = $db->getConnection()->prepare($SQL);
            $result->execute($name);
            if ($result->rowCount() != 0) {

                $invites = $result->fetch(PDO::FETCH_ASSOC);

                return $invites;

            } else {
                return false;
            }

        } catch (PDOException $e){
            throw new Exception($e->getMessage());
        }

    }

    $queueName = json_decode(file_get_contents("php://input"),true);
    if($queueName && isset($queueName['name'])){
        try {
            $invites = getInviteData($queueName);
            if($invites){
                http_response_code(200);
                echo json_encode(['status' => 'SUCCESS']);
                setcookie('queue_name',$invites['name'],null, '/');
                setcookie('queue_id',$invites['id'],null, '/');
            }
            else {
                http_response_code(202);
                echo json_encode(['status' => 'SUCCESS', 'message' => 'No such queue exists']);
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