<?php
    include('header.php');
    RequireVariables(['userid']);

    //$res->success = mail('trackbildoorsandroid@gmail.com', 'testmailfrompie', '<h2>This is a message</h2>', 'From: server@tictactraining.tk');
    
    $db;    
    try
    {
        $db = ConnectDb();
        $db->beginTransaction();
        
        /* GET CELLS */
        $stmt = $db->prepare('SELECT Cells.*, T.*, Cells.id AS id FROM Cells LEFT JOIN Tasks T on (Cells.taskId=T.id) WHERE matchId IN (SELECT matchId FROM Matches WHERE teamId in (SELECT teamId FROM Teams WHERE playerId=?)) ORDER BY Cells.id ASC;');
        $stmt->execute([$_POST['userid']]);
        $res->cells = $stmt->fetchAll();

        /* GET MATCH INFO */
        $stmt = $db->prepare('SELECT * FROM MatchInfo WHERE id IN (SELECT matchId FROM Matches WHERE teamId in (SELECT teamId FROM Teams WHERE playerId=?));');
        $stmt->execute([$_POST['userid']]);
        $res->matchInfo = $stmt->fetchAll();

        /* Build team information object for each matchid */
        foreach($res->matchInfo as $matchIndex => $match)
        {
            /* DELETE 10 DAYS OLD GAMES */
            $daysTillEnd = (int)(new DateTime("now"))->diff(new DateTime($match["end"]))->format('%r%d'); //Get days formatted with optional `-` sign.
            if($daysTillEnd < -9)
            {
                DeleteMatch($match['id']);
            }

            /* GET COMPLETED ROWS */
            $stmt = $db->prepare("SELECT c1.x AS startX, c1.y as startY, c2.x AS endX, c2.y AS endY, c1.ownerTeamId, CompletedRows.vertBool, CompletedRows.horiBool, CompletedRows.diagRupBool, CompletedRows.diagRownBool FROM CompletedRows LEFT JOIN Cells c1 ON (CompletedRows.firstCellId=c1.id) LEFT JOIN Cells c2 ON (CompletedRows.lastCellId=c2.id) WHERE c1.matchId=?;");
            $stmt->execute([$match['id']]);
            $rows = $stmt->fetchAll();

            foreach($rows as $index => $row)
            {
                if($row['vertBool'])
                    $rows[$index]['dir'] = 'vertical';
                else if($row['diagRupBool'])
                    $rows[$index]['dir'] = 'rup';
                else if($row['horiBool'])
                    $rows[$index]['dir'] = 'horizontal';
                else
                    $rows[$index]['dir'] = 'rown';

                unset($rows[$index]['vertBool'], $rows[$index]['diagRupBool'], $rows[$index]['horiBool'], $rows[$index]['diagRownBool']);
            }

            $res->matchInfo[$matchIndex]['rows'] = $rows;


            /* GET TEAM INFOS */
            $stmt = $db->prepare("SELECT * FROM TeamInfo WHERE id IN (SELECT teamId FROM Matches WHERE matchId=?)");
            $stmt->execute([$match['id']]);
            $res->matchInfo[$matchIndex]['teamInfo'] = $stmt->fetchAll();


            /* GET TEAM USERS */
            foreach($res->matchInfo[$matchIndex]['teamInfo'] as $teamIndex => $teamInfo)
            {
                //$stmt = $db->prepare("SELECT username, firstname, lastname, picpath FROM Users where id IN (SELECT playerId FROM Teams WHERE teamId IN (SELECT id FROM TeamInfo WHERE id IN (SELECT teamId FROM Matches WHERE teamId in (SELECT teamId FROM Teams WHERE playerId=?))));");
                $stmt = $db->prepare("SELECT username, firstname, lastname, picpath FROM Users where id IN (SELECT playerId FROM Teams WHERE teamId=?)");
                $stmt->execute([$teamInfo['id']]);
                $res->matchInfo[$matchIndex]['teamInfo'][$teamIndex]['users'] = $stmt->fetchAll();
            }
        }
    }
    catch(Exception $ex)
    {
        $db->rollBack();
        $res = $ex;
    }

?>