<?php
    include("header.php");

    if(!isset($_POST['searchstring']))
    {
        $res->err = "No search string provided!";
    }

    $db = ConnectDb();
    
    $serachStringFormatted = "%$_POST[searchstring]%";
    $stmt = $db->prepare("SELECT id, username, firstname, lastname, picpath FROM Users WHERE (CONCAT(username, ' ', firstname, ' ', lastname) LIKE ?)");
    $stmt->execute([$serachStringFormatted]);
    $res = $stmt->fetchAll();
?>