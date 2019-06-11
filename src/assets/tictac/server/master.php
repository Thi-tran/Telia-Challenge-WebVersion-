<?php

    ini_set('display_errors',1); 
    error_reporting(E_ALL);
    session_start();

    $res = new stdClass;
    include('functions.php');
    
    SetHeaders();
    
    //Read post data, only if no POST data is present. This could happen if FormData is sent rather than an object in angular TS.
    if(empty($_POST))
        $_POST = json_decode(file_get_contents("php://input"), true, 512, JSON_OBJECT_AS_ARRAY);
    
    RequireVariables(['action']);

    HandleAction();

    echo json_encode($res);

?>