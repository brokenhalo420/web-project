<?php
    require_once("../utility/db.php");

    function login($userData){
        $SQL = "SELECT * FROM users WHERE username=:username && password=:password";
        try{
            $db = new Database();
            $result = $db->getConnection()->prepare($SQL);
            $result->execute($userData);

            if ($result->rowCount() == 1) {

                $user = $result->fetch(PDO::FETCH_ASSOC);

                return $user;

            } else {
                return false;
            }

        } catch (PDOException $e){
            throw new Exception($e->getMessage());
        }

    }

    $userData = json_decode(file_get_contents("php://input"),true);
    $userData['password'] = hash("sha256",$userData['password']);

    if($userData && isset($userData['username']) && isset($userData['password'])){
        try {
            $user = login($userData);

            if($user){
                session_start();
                $_SESSION['user']=$user;

                setcookie('username', $userData['username'], time() + 600, '/');
                setcookie('password', $userData['password'], time() + 600, '/');
                if($user['type'] == 'TEACHER'){
                    setcookie('type', 'TEACHER',time() + 600, '/');
                }
                else {
                    setcookie('type', 'STUDENT',time() + 600, '/');
                }
                
                http_response_code(200);
                echo json_encode(['status' => 'SUCCESS', 'message' => "User has been logged in."]);
            }
            else {
                http_response_code(400);
                echo json_encode(['status' => 'FAILURE', 'message' => 'Could not login. User is not registered']);
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