<?php
    require_once("../utility/db.php");

    function getUserId($username){
        $SQL = "SELECT id from users WHERE username=:username";
        try{
            $db = new Database();
            $result = $db->getConnection()->prepare($SQL);
            $result->execute(['username'=> $username['username']]);
            //echo '10 ROW LOOK HERE HERE';
            //var_dump($result->fetchAll());
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
        $SQL = "UPDATE queueusers SET ready_to_join=1 WHERE user_id=:user_id";
        try{
            $db = new Database();
            $result = $db->getConnection()->prepare($SQL);
            //var_dump(getUserId($username)['id']);
            //echo 'THIS WAS THE ID';//towa ni dawa id=2
            $ran = getUserId($username)['id'];
            $result->execute(['user_id' => $ran]);
            if (1 == 1) {

                $invites = $result->fetch(PDO::FETCH_ASSOC);
                return true;

            } else {
                echo 'WE ARE IN FALSE PLS ';
                var_dump($result);
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