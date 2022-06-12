<?php
require_once("../utility/DB.php");

try{
    $db = new Database();
}
catch(PDOException $pd) {
    echo json_encode(['status' => 'fail']);
    
}

$con = $db->getConnection();

$query = "SELECT * FROM messages";

try {
    $result = $con->prepare($query);
    $result->execute();
    $result1 = $result->fetchAll();
    echo json_encode($result1);
    exit();
}
catch(PDOException $pd) {
    
    echo json_encode(['status' => 'fail']);
}

echo json_encode($result);

?>