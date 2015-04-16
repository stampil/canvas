<?php
chdir('../');
require_once 'require/header.php';
require_once 'require/commun.php';
var_dump($USER);
//echo $_POST["file"]
//set_sprite_configsprite
$id_sprite = $_POST["id_sprite"];
$id_configsprite = $_POST["id_configsprite"];
$id_num_case = $_POST["num_case"];
$rep = "upload/SpritePerso/$id_sprite/";
$data = $_POST["file"];
@mkdir($rep,0777);

$file_name = 'sprite_'.$id_configsprite.'_'.$id_num_case.'.png';
list($type, $data) = explode(';', $data);
list(, $data)      = explode(',', $data);
$data = base64_decode($data);
// Finally, save the image
file_put_contents($rep.$file_name, $data) ;

$spriteM = new SpriteManager();
$spriteM->set_sprite_configsprite($id_sprite,$id_configsprite,$id_num_case,$_POST["w"],$_POST["h"],$_POST["x"],$_POST["y"]);
?>