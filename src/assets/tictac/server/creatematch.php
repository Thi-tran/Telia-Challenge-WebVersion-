<?php
    
    include("header.php");

    $tmp = 0;

    $queries = [];
    //Build query string part by part, used in database call in the bottom
    {
        //Insert TeamInfo
        {
            $teamInfoQuery = "INSERT INTO TeamInfo (name, color) VALUES ";
            $teamInfoArgs = [];

            foreach($_POST['teams'] as $index => $team)
            {
                $teamInfoQuery .= "(?, ?), ";
                $teamInfoArgs = array_merge($teamInfoArgs, [$team['teamname'], $team['color']]);
            }
            
            //Remove trailing comma and space chars for last `(?), ` and add ';' to end of line.
            $teamInfoQuery = substr($teamInfoQuery, 0, -2) . ';';
            
            //Add created query/arg set.
            $queries[] = (object)[
                'query' => $teamInfoQuery,
                'args' => $teamInfoArgs
            ];
            
            //Create queries to set variables for each inserted teamId
            for($i = 0; $i < count($_POST['teams']); $i++)
                $queries[] = (object)['query' => "SET @TeamId$i = LAST_INSERT_ID() + $i;"];
        }

        //Insert MatchInfo
        {
            $matchInfoQuery = "INSERT INTO MatchInfo (name, start, end) VALUES (?, ?, ?);";
            $matchInfoArgs = [$_POST['matchInfo']['name'], $_POST['matchInfo']['start'], $_POST['matchInfo']['end']];

            $queries[] = (object)['query' => $matchInfoQuery, 'args' => $matchInfoArgs];

            //Add query to get inserted matchId
            $queries[] = (object)['query' => "SET @MatchId = LAST_INSERT_ID();"];
        }

        //Insert Matches
        {
            $matchQuery = "INSERT INTO Matches (teamId, matchId) VALUES ";

            foreach($_POST['teams'] as $index => $team)
                $matchQuery .= "(@TeamId$index, @MatchId), ";

            //Remove trailing comma and space chars for last `(...), ` and add ';' to end of line.
            $matchQuery = substr($matchQuery, 0, -2) . ';';
            
            $queries[] = (object)['query' => $matchQuery];
        }

        //Insert Teams
        {
            $teamQuery = "INSERT INTO Teams (teamId, playerId) VALUES ";
            $teamArgs = [];

            foreach($_POST['teams'] as $teamIndex => $team)
            {
                foreach($team['users'] as $userId)
                {
                    $teamQuery .= "(@TeamId$teamIndex, ?), ";
                    $teamArgs[] = $userId;
                }
            }

            //Remove trailing comma and space chars for last `(teamId$i, ?), ` and add ';' to end of line.
            $teamQuery = substr($teamQuery, 0, -2) . ';';

            $queries[] = (object)['query' => $teamQuery, 'args' => $teamArgs];
        }

        //Insert Cells
        {
            $cellQuery = "INSERT INTO Cells (taskId, x, y, matchId) VALUES ";
            $cellArgs = [];

            foreach($_POST['cells'] as $cell)
            {
                $cellQuery .= "(?, ?, ?, @MatchId), ";
                $cellArgs = array_merge($cellArgs, [$cell['taskId'], $cell['x'], $cell['y']]);
            }

            //Remove trailing comma and space chars for last `(?, ?, ?), ` and add ';' to end of line.
            $cellQuery = substr($cellQuery, 0, -2) . ';';

            $queries[] = (object)['query' => $cellQuery, 'args' => $cellArgs];
        }
    }
    
    //Perform prepared queries
    $db = ConnectDb();
    try
    {
        $db->beginTransaction();
        foreach($queries as $query)
        {
            $stmt = $db->prepare($query->query);
            $res->success = $stmt->execute( (isset($query->args)) ? $query->args : [] );
            $tmp++;
        }
        $res->success = $db->commit();
    }
    catch(Exception $ex)
    {
        $res->dbg = $queries;
        $res->tmp = $tmp;
        $res->err = $ex->getMessage();
        $db->rollBack();
    }
?>