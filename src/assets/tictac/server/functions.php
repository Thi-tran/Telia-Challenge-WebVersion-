<?php

    include("connectdb.php");
    
    function ExecuteQuery($db, $query, $args)
    {
        global $res;

        try
        {
            $stmt = $db->prepare($query);
            $res->success = $stmt->execute($args);
            $res->result = $stmt->fetchAll();
            $res->affectedRows = $db->rowCount();
    
        }
        catch(Exception $ex)
        {
            $res->err = $ex->getMessage();
        }
    }
    
    function RequireVariables($reqVars)
    {
        $errMsg = "";
        foreach($reqVars as $varName)
        {
            if(!isset($_POST[$varName]))
                $errMsg .= "POST variable $varName required, but not set!<br>\n";
                
        }
    
        if($errMsg !== "")
            die($errMsg);
    }
    
    function IsLoggedIn($res)
    {
    
        if(!isset($_POST['username']))
        {
            $res->msg = "no username supplied";
            return false;
        }
        if(!isset($_POST['token']))
        {
            $res->msg = "no token supplied!";
            return false;
        }
    
        $db = ConnectDb();
        $stmt = $db->prepare("SELECT COUNT(username) AS LoggedIn FROM Users WHERE username=? AND token=?");
        $stmt->execute([$_POST['username'], $_POST['token']]);
        $ans = $stmt->fetch();
    
        if($ans['LoggedIn'] === "1")
        {
            return true;
        }
        return false;
    }

    function DeleteMatch($matchId)
    {
        $db = ConnectDb();
        $stmt = $db->prepare("DELETE FROM MatchInfo WHERE id=?");
        $stmt->execute([$matchId]);
    }
    
    function GetRandomToken()
    {
        $db = ConnectDb();
    
        $token = "";
        $isUnique = false;
        do
        {
            $token = substr(md5(rand()), 0, 40);
            $stmt = $db->query('SELECT username FROM Users WHERE token="' . $token . '"');
            $ans = $stmt->fetchAll();
    
            //ensure token is unique
            if(is_null($ans) || empty($ans))
                $isUnique = true;
        }
        while($isUnique === false);
        
        return $token;
    }

    function SetHeaders()
    {
        $whitelistedOrigins = 
        [
            "http://localhost:4200",
            "https://dev.tictactraining.tk",
            "https://tictactraining.tk",
            "https://www.tictactraining.tk"
        ];
        
        $host;
        if(isset($_SERVER["HTTP_REFERER"]))
        {
    
            //Get host from REFERER URL
            $host = "";
            {
                $url = parse_url($_SERVER["HTTP_REFERER"]);
                
                $host = $url["scheme"] . "://" . $url["host"];
                
                if(isset($url['port']))
                $host .= ":".$url['port'];
    
    
            }
        }
        else 
            $host = "Unkown host";

        //Ensure host is allowed to access file using ugly hack (FIXES CORS error)
        if(in_array($host, $whitelistedOrigins, true))
        {
            /* ONLY ALLOW OUR WHITELISTED HOSTS ACCESS */
            header("Access-Control-Allow-Origin: $host");
            header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
            header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
        }
        else
        {
            /* UGLY HACK THAT ALLOWS ALL ORIGINS TO SEE THAT ACCESS IS DENIED */ 
            header("Access-Control-Allow-Origin: *");
            header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
            header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
            die("CORS Error occured in file: " . __FILE__ . " @ line: " . __LINE__ . "\nEller, som Anthon sa; He va' det gamla vanliga flyget som int flyg!");
        }
    }

    function HandleAction()
    {
        global $res;

        switch($_POST['action'])
        {
            case "auth":
                include("auth.php");
            break;

            case "logincheck":
                $res->status = IsLoggedIn($res); 
            break;

            case "updateprofile":
                if(isset($_FILES['image']))
                    include("uploadimage.php");
                if(isset($_POST['bio']))
                    include("updatebio.php");
            break;


            case "uploadimage":
                include("uploadimage.php");
            break;

            case "getfriends":
                $db = ConnectDb();
                $stmt = $db->prepare("SELECT * FROM Users WHERE id IN(SELECT friendId FROM Friends WHERE playerId=?))");
                $stmt->execute($_POST['userId']);

                $res->friends = $stmt->fetchAll();
            break;

            case "findusers";
                include("findusers.php");
            break;

            case "creatematch":
                include("creatematch.php");
            break;

            case "getmatches":
                include("getmatches.php");
            break;

            case "createtask":
                include('createtask.php');
            break;

            case "gettasks":
                include("gettasks.php");
            break;

            case "deletecategory":
                include('deletecategory.php');
            break;

            case "updatecategory":
                include('updatecategory.php');
            break;

            case "deleteimage":
                include("deleteimage.php");
            break;
                    
            case "deleteuser":
                include("deleteuser.php");
            break;

            case "createuser":
                include("createuser.php");
            break;

            case 'takecell':
                include('takecell.php');
            break;

            case 'lookforchanges':
                include('lookforchanges.php');
            break;

            case "getfalse":
                $res->value = false;
                $res->msg = "If this is used, then programmers would probably be ashamed :D";
            break;

            default:
                $res->msg = "No action performed";
            break;
        }
    }
?>