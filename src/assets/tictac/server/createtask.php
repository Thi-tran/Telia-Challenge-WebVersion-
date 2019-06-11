<?php
    include("header.php");
    RequireVariables(['userid', 'tasks', 'category']);

    $db = ConnectDb();

    $query = "";
    $args = [];
    //Build querystring
    {
        $query = "INSERT INTO Tasks (public, description, icon, iconUnicode, ownerId, category) VALUES ";
        foreach($_POST['tasks'] as $task)
        {
            $query .= "(0, ?, ?, ?, ?, ?), ";
            array_push($args, $task['description'], $task['icon'], $task['iconunicode'], $_POST['userid'], $_POST['category']);
        }
        $query = substr($query, 0, -2) . ';'; //remove trailing ', ' and insert ; at the end of the queryline.
    }

    $stmt = $db->prepare($query);
    $res->success = $stmt->execute($args);

?>