<?php
    include('header.php');
    RequireVariables(['username', 'password']);

    $con = ConnectDb();
    $statement = $con->prepare("SELECT * FROM Users WHERE username=?");
    $valid = $statement->execute([$_POST['username']]);

    $ans = $statement->fetch();
    if(password_verify($_POST['password'], $ans['password']))
    {
        $_SESSION["loggedIn"] = true;
        $res->success = true;
        $res->id = $ans['id'];
        $res->firstname = $ans['firstname'];
        $res->lastname = $ans['lastname'];
        $res->email = $ans['email'];
        $res->username = $ans['username'];
        $res->bio = $ans['bio'];
        $res->pic = $ans['picpath'];
        $res->token = $ans['token'];
        $con->query("UPDATE Users SET lastLogin=CURRENT_TIMESTAMP WHERE id=$ans[id]");
    }
    else
    {
        $res->success = false;
    }


?>
