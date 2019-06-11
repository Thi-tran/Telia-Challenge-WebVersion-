<?php
    echo "hej!";
    ini_set('display_errors',1); 
    error_reporting(E_ALL);
    session_start();


    $res;

    $host = "127.0.0.1";
    $db = "tictac";
    $user = "dbadde";
    $pass = "makinthemchanges753";
    $charset = "utf8";

    $conString = "mysql:host=$host;dbname=$db;charset=$charset";

    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ];

    try
    {
        $con = new PDO($conString, $user, $pass, $options);
        $db = $con;
        //return $con;
    }
    catch(Exception $ex)
    {
        $res->EXCEPTION = $ex->getMessage();
    }

    $ans = $db->query("SELECT * FROM MatchInfo WHERE id=52");
    $res = $ans->fetch();

    $res['dayDiff'] = (int)(new DateTime("now"))->diff(new DateTime($res["end"]))->format('%r%d');

    echo "<pre>";
    var_export($res);
    echo "</pre>";
?>