<?php
    include("header.php");

    //Add uploaded files
    if(isset($_FILES['image']) && isset($_POST['userid']))
    {
        $fileCount = count($_FILES['image']['name']);
        for($i = 0; $i < $fileCount; $i++)
        {
            
            $uploadedFileName = $_FILES['image']['name'];
            $tmpName = $_FILES['image']['tmp_name'];
            $ext = pathinfo($uploadedFileName, PATHINFO_EXTENSION);
            $fileName = $_POST['userid'] . '.'. $ext;
            $res->success = move_uploaded_file($tmpName, "/var/www/html/assets/images/user_submitted/" . $fileName);	

            if($res->success)
            {
                $res->picPath = $fileName;
                $con = ConnectDb();
                $stmt = $con->prepare("UPDATE Users SET picpath=? WHERE id=?");
                $stmt->execute([$fileName, $_POST['userid']]);
            }
            else
            {
                $res->err = "Not uploaded because of error #".$_FILES["image"]["error"];
                $res->dbg = $tmpName;
            }

        }		
    }
    else
    {
        $res->success = false;
        $res->err = "Either userid or fileupload POST variables not set";
    }


?>