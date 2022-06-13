<?php
    require_once("../utility/db.php");


    function getInviteData($data){
        $SQL = "SELECT queues.name, queues.id from queues where queues.name=:name";
        try{
            $db = new Database();
            $result = $db->getConnection()->prepare($SQL);
            $result->execute(['name' => $data['name']]);
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

    $data = json_decode(file_get_contents("php://input"),true);
    if($data && isset($data['name']) && isset($data['id'])){
        try {
            $invites = getInviteData($data);
            if($invites){
                http_response_code(200);
                setcookie('queue_name',$data['name'],null, '/');
                setcookie('queue_id',$data['id'],null, '/');
                echo json_encode(['status' => 'SUCCESS']);
                exit();
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