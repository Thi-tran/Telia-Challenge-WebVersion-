<?php
    include("header.php");

    if(!isset($_POST['userid']) || !isset($_POST['bio']) || !isset($_POST['token']))
        die("Some needed variable(s) undefined, ensure userid, bio and token were supplied!");

    $db = ConnectDb();
    $stmt = $db->prepare("UPDATE Users SET bio=? WHERE id=? AND token=?");
    $res->success = $stmt->execute([$_POST['bio'], $_POST['userid'], $_POST['token']]);
?>