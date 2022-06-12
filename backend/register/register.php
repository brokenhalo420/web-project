<?php
    require_once('../utility/db.php');

    function userExists($userData){
        $SQL = "SELECT * FROM users WHERE username=:username && email=:email";
        try{
            $db = new Database();
            $result = $db->getConnection()->prepare($SQL);
            $result->execute(['username' => $userData['username'], 'email' => $userData['email']]);
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

    function addUser($userData){
        $SQL = "INSERT INTO users (firstname, lastname, email, username, password, type) 
        VALUES (:firstname, :lastname, :email, :username, :password, :type)";
        try{
            $db = new Database();
            $result = $db->getConnection()->prepare($SQL);
            $result->execute(['firstname' => $userData['firstname'], 'lastname' => $userData['lastname'],
             'email' => $userData['email'], 'username' => $userData['username'],
              'password' => $userData['password'], 'type' => $userData['type']]);

            return $result;

        } catch (PDOException $e){
            throw new Exception($e->getMessage());
        }
    }


    $userData = json_decode(file_get_contents("php://input"),true);
    $userData['password'] = hash("sha256",$userData['password']);
    $userData['type'] = 'STUDENT';

    if($userData && isset($userData['email']) && isset($userData['password'])){
        try {
            $user = userExists($userData);
            if($user){

                http_response_code(200);
                echo json_encode(['status' => 'FAILURE', 'message' => 'User already exists.']);

                
            }
            else {
                $userData += ['role' => 'STUDENT'];
                if(addUser($userData)){
                    http_response_code(200);
                    echo json_encode(['status' => 'SUCCESS','message' => "User successfully registered."]);
                }
                else {
                    http_response_code(400);
                    echo json_encode(['status' => 'FAILURE', 'message' => "Could not register user."]);
                }
            }
            
        } catch (PDOException $e){
            http_response_code(500);
            echo json_encode(['status' => 'FAILURE','message' => "Could not register user due to server error."]);
        }
    }
    else {
        http_response_code(400);
        echo json_encode(['status' => 'FAILURE', 'message' => "Could not register user. Incorrect input."]);
    }


?>