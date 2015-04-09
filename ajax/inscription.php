<?php
chdir('../');
require_once 'require/header.php';
require_once 'require/commun.php';

if(!isset($_POST["email"]) || !isset($_POST["pseudo"]) || !isset($_POST["pass"])){
    exit('parametre manquant');
}

$user = new User((object) array("id_user" =>null, "email" =>$_POST["email"], "pseudo" =>$_POST["pseudo"], "pass" =>$crypt->crypte($_POST["pass"]), "valide" =>true, "creato" =>date("Y-m-d H:i:s"), "lastco" =>date("Y-m-d H:i:s") ));
$Sid = $user->save();
if(!$Sid){
    exit('L\'inscription à echouée, utilisateur déjà enregistré?');
}

?>
ok