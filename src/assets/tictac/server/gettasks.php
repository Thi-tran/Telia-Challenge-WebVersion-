<?php 
    include("header.php");
    RequireVariables(['userid', 'showpublic']);

    $db = ConnectDb();

    /* Select query depending on showpublic bool */
    $query = ($_POST['showpublic']) ? "SELECT * FROM Tasks WHERE ownerId=? OR public=1" : "SELECT * FROM Tasks WHERE ownerId=?" ;
    
    $stmt = $db->prepare($query);
    $stmt->execute([$_POST['userid']]);
    $res = $stmt->fetchAll();
?>