<?php
    include('header.php');
    RequireVariables(['userid', 'category', 'tasks', 'token']);

    $db = ConnectDb();
    $db->beginTransaction();
        foreach($_POST['tasks'] as $task)
        {
            if(isset($task['taskid']))
            {
                $stmt = $db->prepare("UPDATE Tasks SET description=?, icon=?, iconUnicode=?, category=? WHERE id=? AND ownerId IN (SELECT id FROM Users WHERE id=? AND token=?)");
                $stmt->execute([$task['description'], $task['icon'], $task['iconunicode'], $_POST['category'], $task['taskid'], $_POST['userid'], $_POST['token']]);
            }
            else
            {
                $stmt = $db->prepare("INSERT INTO Tasks (public, description, icon, ownerId, category) VALUES (0, ?, ?, ?, ?)");
                $stmt->execute([$task['description'], $task['icon'], $_POST['userid'], $_POST['category']]);
            }

        }
    $res->success = $db->commit();



?>