<?php
require_once("../utility/DB.php");

try{
    $db = new Database();
}
catch(PDOException $pd) {
    echo json_encode(['status' => 'fail']);
    
}

$con = $db->getConnection();

$data = json_decode(file_get_contents('php://input'), true);//gets a name and link
//check if link exists
$query = "SELECT id FROM queues WHERE url=:url";
//$query = "INSERT INTO invites(name, url) VALUES name=:name, url=:url";

try {
    $result = $con->prepare($query);
    $result->execute(['url' => $data['url']]);
    $result1 = $result->fetch(PDO::FETCH_ASSOC);
}
catch(PDOException $pd) {
    echo json_encode(['status' => 'fail']);
}

if ($result1 == false) {
    //echo 'I AM NOW IN RESULT = FALSE /n \n';
    //echo $data;
    $createQuery = "INSERT INTO queues(name, url) VALUES (:name, :url)";
    try{
        $result = $con->prepare($createQuery);
        $result->execute(['name' => $data['name'], 'url' => $data['url']]);
    }
    catch(PDOException $pd) {
        echo json_encode(['status' => 'fail']);
    }
        
    try {
        $result = $con->prepare($query);
        $result->execute(['url' => $data['url']]);
        $result1 = $result->fetch(PDO::FETCH_ASSOC);
        //echo json_encode($result1);
        //echo 'I AM HERE AFTER THE NEXT TRY OF CREATE I HATE THIS';
        //echo 'plswork';
    }
    catch(PDOException $pd) {
        echo json_encode(['status' => 'fail']);
    }

}

echo json_encode($result1);
//echo 'THIS IS THE FINAL ECHO';
?>