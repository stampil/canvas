<?php
$target_dir = "uploads/";
$target_file = $target_dir . basename($_FILES["spriteG"]["name"]);
$uploadOk = 1;
$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
// Check if image file is a actual image or fake image

if($_FILES["spriteG"]["tmp_name"]){
    $check = getimagesize($_FILES["spriteG"]["tmp_name"]);
    if($check !== false) {
        $uploadOk = 1;
        if(!preg_match("/.png$/",$check["mime"])){
            echo "File is not an png.";
            $uploadOk = 0;
        }

    } else {
        echo "File is not an image.";
        $uploadOk = 0;
    }

if($uploadOk){
    $ret = "upload/spriteG_".time().".png";
    move_uploaded_file($_FILES["spriteG"]["tmp_name"],"upload/spriteG.png");
    copy("upload/spriteG.png","upload/spriteG_".time().".png");
    header("Location: index.html");
}
}

if($_FILES["spriteD"]["tmp_name"]){
    $check = getimagesize($_FILES["spriteD"]["tmp_name"]);
    if($check !== false) {
        $uploadOk = 1;
        if(!preg_match("/.png$/",$check["mime"])){
            echo "File is not an png.";
            $uploadOk = 0;
        }

    } else {
        echo "File is not an image.";
        $uploadOk = 0;
    }

    if($uploadOk){
        $ret = "upload/spriteD_".time().".png";
        move_uploaded_file($_FILES["spriteD"]["tmp_name"],"upload/spriteD.png");
        copy("upload/spriteD.png","upload/spriteD_".time().".png");
        header("Location: index.html");
    }
}
?>