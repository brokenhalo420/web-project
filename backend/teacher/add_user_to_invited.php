<?php
    require_once("../utility/db.php");

    function getUserId($username){
        $SQL = "SELECT id from users WHERE username=:username";
        try{
            $db = new Database();
            $result = $db->getConnection()->prepare($SQL);
            $result->execute(['username'=> $username['username']]);
            echo '10 ROW LOOK HERE HERE';
            var_dump($result->fetchAll());
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

    function getLink($username){
        $SQL = "UPDATE queryusers SET can-join=true WHERE user_id=:user_id";
        try{
            $db = new Database();
            $result = $db->getConnection()->prepare($SQL);
            $result->execute(getUserId($username));
            var_dump(getUserId($username));
            var_dump($username);
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
    if($queueName && isset($queueName['username'])){
        try {
            $invites = getLink($queueName);
            if($invites){
                http_response_code(200);
                echo json_encode(['status' => 'SUCCESS']);

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