<?php 
require_once("../utility/DB.php");

try{
    $db = new Database();
}
catch(PDOException $pd) {
    echo json_encode(['pls kill me' => 'i am serious']);
}

$con = $db->getConnection();

$data = json_decode(file_get_contents('php://input'));
echo json_encode($data);
//prowerka za null



echo json_encode(['status' => 'oisdjfos']);

?>