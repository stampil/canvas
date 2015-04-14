<?php
chdir('../');
require_once 'require/header.php';
require_once 'require/commun.php';

$sprite = new Sprite( (object) array("id_sprite" =>null, "nom" =>$_POST["nom"], "creato" =>date("Y-m-d H:i:s"), "id_user"=>$USER->get_id_user()));
exit($sprite->save());
?>