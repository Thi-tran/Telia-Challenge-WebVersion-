<?php
    ini_set('display_errors',1); 
    error_reporting(E_ALL);
    session_start();
    echo "<script>console.warn('NOTICE, THIS FILE IS A DEBUG FILE AND NEEDS TO EXPLICITLY BE DISABLED ON RELEASE!');</script>";

    $res = new stdClass;

    //Whoa, this is definitley only a file for debuging!
    $_POST = $_GET;

    include('functions.php');
    RequireVariables(['action']);

    HandleAction();

    echo '<pre>';
    var_export($res);
    echo '</pre>';

?>