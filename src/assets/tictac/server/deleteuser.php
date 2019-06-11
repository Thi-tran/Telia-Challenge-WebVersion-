<?php

    if(!isset($_POST['userId']))
        $res->error = "No user id supplied!";
    
    $con = ConnectDb();
    $stmt = $con->prepare("DELETE FROM Users WHERE id=?");
    $ans2 = $stmt->execute([$_POST['userId']]);
    //$ans = $stmt->fetch();
    $res->result = $ans2;

?>
