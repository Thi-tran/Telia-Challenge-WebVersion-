<?php
include("header.php");

if(isset($_POST["fileName"]) && isset($_POST['userid']) && isset($_POST['token']))
{
    $res->success = unlink("assets/images/user_submitted/" . $params["fileName"]);
    if($res->success)
    {
        $db = ConnectDb();
        $stmt = $db->prepare("UPDATE Users SET picpath=NULL WHERE id=? AND token=?");
        $stmt->execute([$_POST['userid'], $_POST['token']]);
    }
}
else
{
    $res->success = false;
    $res->message = "One or more of the follwing values was not supplied; fileName, userid and/or token";
}


?>