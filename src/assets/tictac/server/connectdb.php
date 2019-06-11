<?php

    function ConnectDb()
    {
        global $res;

        $host = "130.240.134.30";
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
            return $con;
        }
        catch(Exception $ex)
        {
            $res->EXCEPTION = $ex->getMessage();
        }
    }


?>