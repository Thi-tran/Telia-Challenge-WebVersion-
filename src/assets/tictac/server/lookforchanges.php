<?php
    include("header.php");
    RequireVariables(['matchid', 'latestchange']);

    $db = ConnectDb();
    $stmt = $db->prepare("SELECT COUNT(latestChange) AS changed FROM MatchInfo WHERE id=? AND NOT latestChange=?");
    $stmt->execute([$_POST['matchid'], $_POST['latestchange']]);
    $res->changed = $stmt->fetch()['changed'] === '1';

?>