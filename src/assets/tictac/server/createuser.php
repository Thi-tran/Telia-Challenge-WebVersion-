<?php
    include("header.php");
    
    //Validate sufficient input
    {
        $dataMissing = "";
        if(!isset($_POST['email']))
            $dataMissing .= "Email not supplied!\n";
        
        if(!isset($_POST['username']))
            $dataMissing .= "Username not supplied!\n";
        
        if(!isset($_POST['password']))
            $dataMissing .= "Password not supplied!\n";

        /* FIX IF USER NO SUIPPLU NAME OR EFTERAMN :D*/ 
        //if(!isset($))
        
        if(!empty($dataMissing))
            die($dataMissing);
    }

    $con = ConnectDb();
    try
    {
        $token = GetRandomToken();
        $statement = $con->prepare("INSERT INTO Users (firstname, lastname, email, username, password, token) VALUES (?, ?, ?, ?, ?, ?)");
        $password = password_hash($_POST["password"], PASSWORD_DEFAULT);
        $res->success = $statement->execute([$_POST['firstname'], $_POST['lastname'], $_POST['email'], $_POST['username'], $password, $token]);
        
        if($res->success)
            $res->message = "User was created successfully!";
        else
            $res->message = "Could not create user (Unkown error)";
    }
    catch(Exception $ex)
    {
        $res->success = false;
        $res->message = $ex->getMessage();
    }

?>