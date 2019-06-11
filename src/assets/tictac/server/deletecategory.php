<?php
    include('header.php');
    RequireVariables(['category', 'userid', 'token']);

    $db = ConnectDb();
    $stmt = $db->prepare('DELETE FROM Tasks WHERE category=? AND ownerId IN (SELECT id FROM Users WHERE id=? AND token=?)');
    $res->success = $stmt->execute([$_POST['category'], $_POST['userid'], $_POST['token']]);
?>