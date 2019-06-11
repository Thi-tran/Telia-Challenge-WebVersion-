<?php
    include("header.php");
    RequireVariables(['cellid', 'teamid', 'matchid']);

    class DatePassedException extends Exception
    {
    } 

    function IsCell($x, $y, $cells)
    {
        if(array_key_exists($x, $cells))
            if(array_key_exists($y, $cells[$x]))
                return true;
            
        return false;
    }

    function DirCountRow($xStart, $yStart, $xStep, $yStep, $cells, $dir)
    {
        global $res;
        $x = 0;
        $y = 0;
        for($i = 1; $i < 4; $i++)
        {
            $x = ($xStart + $i * $xStep);
            $y = ($yStart + $i * $yStep);
            if(!IsCell( $x, $y, $cells) || isset($cells[$x][$y][$dir]))
                return $i - 1; 
        }
        
        return 3;
    }

    function GetCloseRows($cell)
    {
        global $db, $res;

        $stmt = $db->prepare("SELECT CompletedRows.id as rowId, c1.x AS startX, c1.y as startY, c2.x AS endX, c2.y AS endY, vertBool, horiBool, diagRupBool, diagRownBool FROM CompletedRows 
            LEFT JOIN Cells c1 ON (CompletedRows.firstCellId=c1.id) 
            LEFT JOIN Cells c2 ON (CompletedRows.lastCellId=c2.id) 
            WHERE (c1.ownerTeamId=? AND c1.matchId=?)
                AND ((c1.x <= ? AND c1.x >= ?) AND (c1.y <= ? AND c1.y >= ?) 
                OR (c2.x <= ? AND c2.x >= ?) AND (c2.y <= ? AND c2.y >= ?))");

        $stmt->execute([ $_POST['teamid'], $_POST['matchid'], $cell['x'] + 3, $cell['x'] - 3, $cell['y'] + 3, $cell['y'] - 3, $cell['x'] + 3, $cell['x'] - 3, $cell['y'] + 3, $cell['y'] - 3 ]);

        $res->matchId = $_POST['matchid'];

        $rows = $stmt->fetchAll();
        return $rows;
    }

    function GetCell($cellId)
    {
        global $db;
        $stmt = $db->prepare("SELECT * FROM Cells WHERE id=?");
        $stmt->execute([$cellId]);
        return $stmt->fetch();
    }

    function GetAdjacentCells($cell)
    {
        global $db, $res;

        $stmt = $db->prepare('SELECT * FROM Cells WHERE matchId=? AND (x <= ? AND x >= ?) AND (y <= ? AND y >= ?) AND ownerTeamId=?;');
        $stmt->execute([$_POST['matchid'], $cell['x'] + 3, $cell['x'] - 3, $cell['y'] + 3, $cell['y'] - 3, $_POST['teamid']]);


        //Structure data as 2d array
        $adjacentCells = array(array());
        foreach($stmt->fetchAll() as $tmpCell)
            $adjacentCells[$tmpCell['x']][$tmpCell['y']] = $tmpCell;
        

        $rows = GetCloseRows($cell);

        $res->rows = $rows;

        $dirs = ["horiBool", "vertBool", "diagRupBool", "diagRownBool"];
        //Insert 'rowId' on taken cells
        foreach($rows as $row)
        {
            //Check each dir if bool is set, if so. add it to adjacentCells - use this to see if occupied!
            foreach($dirs as $dir)
            {
                if($row[$dir] === '1')
                {
                    if(isset($adjacentCells[$row['startX']][$row['startY']]))
                    {
                        $adjacentCells[$row['startX']][$row['startY']][$dir] = true;
                        $adjacentCells[$row['startX']][$row['startY']]['rowId'] = $row['rowId'];
                    }
                    else if(isset($adjacentCells[$row['endX']][$row['endY']]))
                    {
                        $adjacentCells[$row['endX']][$row['endY']][$dir] = true; 
                        $adjacentCells[$row['endX']][$row['endY']]['rowId'] = $row['rowId'];
                    }
                }
            }
        }
        return $adjacentCells;
    }

    function UpdateTimestamp()
    {
        global $db;
        
        $stmt = $db->prepare("UPDATE MatchInfo SET latestChange=CURRENT_TIMESTAMP WHERE id=?");
        $stmt->execute([$_POST['matchid']]);
    }

    function AddCompletedRows($completedRows)
    {
        global $db, $res;

        if(count($completedRows) === 0)
            return;
        

        $updateQuery = "";
        $updateArgs = array();
        $insertQuery = "INSERT INTO CompletedRows (firstCellId, lastCellId, vertBool, horiBool, diagRupBool, diagRownBool, teamId) VALUES ";
        $insertArgs = array();
        //Build SQL queries based on completedRows
        foreach($completedRows as $row)
        {
            $insertQuery .= "(?, ?, ?, ?, ?, ?, ?), ";
            $bools = [
                (($row->dir) === 'vertBool') ? true : false,
                (($row->dir) === 'horiBool') ? true : false,
                (($row->dir) === 'diagRupBool') ? true : false,
                (($row->dir) === 'diagRownBool') ? true : false,
            ];
            $insertArgs = array_merge($insertArgs, [$row->start['id'], $row->end['id'], $bools[0], $bools[1], $bools[2], $bools[3], $_POST['teamid']]);
        }

        //Remove trailing `, ` and insert `;`
        $insertQuery = substr($insertQuery, 0, -2) . ';';

        $stmt = $db->prepare($insertQuery);
        $stmt->execute($insertArgs);

        AddTeamScore($stmt->rowCount());
        $res->addedScore = $stmt->rowCount();
    }

    function AddTeamScore($score)
    {
        global $db;

        $stmt = $db->prepare('UPDATE TeamInfo SET score=score+? WHERE id=?');
        $stmt->execute([$score, $_POST['teamid']]);

        
    }


    $cell;
    $db;
    try
    {
        global $cell, $db;

        $db = ConnectDb();
        $db->beginTransaction();

        $stmt = $db->prepare("SELECT * FROM MatchInfo WHERE id=?");
        $stmt->execute([$_POST['matchid']]);
        $match = $stmt->fetch();
        $daysLeft = (int)(new DateTime("now"))->diff(new DateTime($match["end"]))->format('%r%d'); //Get days formatted with optional `-` sign.

        if($daysLeft < 0)
            throw new DatePassedException();


        $stmt = $db->prepare('UPDATE Cells SET ownerTeamId=? WHERE id=? AND ownerTeamId IS NULL;');
        $res->success = $stmt->execute([$_POST['teamid'], $_POST['cellid']]);


        $completedRows = array();
        /* If cell is taken, update timestamp and update score */
        if($stmt->rowCount() > 0)
        {            
            $cell = GetCell($_POST['cellid']);
            $adjacentCells = GetAdjacentCells($cell); //Find close cells (max 3 cells distance)

            $res->adj = $adjacentCells;

            //Find sets of four-in-a-row in each direction
            {
                $dirs = ['vertBool', 'diagRupBool', 'horiBool', 'diagRownBool'];
                //        'N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW';
                $xStep = [ 0,   1,    1,   1,    0,   -1,  -1,   -1];
                $yStep = [-1,  -1,    0,   1,    1,    1,   0,   -1];

                // V3.0
                $len1 = $len2 = 0; 

                foreach($dirs as $index => $dir)
                {
                    $len2 = 0;
                    $len1 = DirCountRow($cell['x'], $cell['y'], $xStep[$index], $yStep[$index], $adjacentCells, $dir);

                    //If no four-in-row found, try merging with opposing direction
                    if($len1 < 3)
                        $len2 = DirCountRow($cell['x'], $cell['y'], $xStep[$index+4], $yStep[$index+4], $adjacentCells, $dir);

                    
                    
                    if($len1 + $len2 >= 3)
                    {
                        $startCell = $adjacentCells[$cell['x'] + ($xStep[$index] * $len1)][$cell['y'] + ($yStep[$index] * $len1)];
                        
                        //Use cell as endCell opposing dir was not used
                        if($len2 === 0)
                            $endCell = $adjacentCells[$cell['x']][$cell['y']];
                        else
                            $endCell = $adjacentCells[$cell['x'] + ($xStep[$index + 4] * $len2)][$cell['y'] + ($yStep[$index + 4] * $len2)];


                        if(!isset($startCell[$dir]) && !isset($endCell[$dir]))
                        {
                            $res->len2 = $len2;
                            $res->len1 = $len1;
                            $completedRows[] = (object) ["start" => $startCell, "end" => $endCell, 'dir' => $dir];
                        }
                    }
                }

                // for($i = 0; $i < count($dirs); $i++)
                // {
                //     $len2 = 0;
                //     $len1 = DirCountRow($cell['x'], $cell['y'], $xStep[$i], $yStep[$i], $adjacentCells, $dirs[$i]);

                //     //If no four-in-row found, try merging with opposing direction
                //     if($len1 < 3)
                //         $len2 = DirCountRow($cell['x'], $cell['y'], $xStep[$i+4], $yStep[$i+4], $adjacentCells, $dirs[$i]);

                    
                    
                //     if($len1 + $len2 >= 3)
                //     {
                //         $startCell = $adjacentCells[$cell['x'] + ($xStep[$i] * $len1)][$cell['y'] + ($yStep[$i] * $len1)];
                        
                //         //Use cell as endCell opposing dir was not used
                //         if($len2 === 0)
                //             $endCell = $adjacentCells[$cell['x']][$cell['y']];
                //         else
                //             $endCell = $adjacentCells[$cell['x'] + ($xStep[$i + 4] * $len2)][$cell['y'] + ($yStep[$i + 4] * $len2)];


                //         if(!isset($startCell[$dirs[$i]]) && !isset($endCell[$dirs[$i]]))
                //         {
                //             $res->len2 = $len2;
                //             $res->len1 = $len1;
                //             $completedRows[] = (object) ["start" => $startCell, "end" => $endCell, 'dir' => $dirs[$i]];
                //         }
                //     }
                // }
            }
            $res->completedRows = $completedRows;
            AddCompletedRows($completedRows);
            UpdateTimestamp();
        }
        else
        {
            $res->msg = "Cell redan tagen";
        }
        
        if(isset($_POST['test']))
            $db->rollBack();
        else
            $db->commit();
    }
    catch(DatePassedException $ex)
    {
        $db->rollBack();
        $res->success = false;
        $res->msg = "Match avslutad";
    }
    catch(Exception $ex)
    {
        $db->rollBack();
        $res->success = false;
        $res->err = $ex->getMessage();
    }
?>