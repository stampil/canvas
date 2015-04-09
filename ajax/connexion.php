<?php
chdir('../');
require_once 'require/header.php';
require_once 'require/commun.php';

if(!isset($_POST["email"])  || !isset($_POST["pass"])){
    exit('parametre manquant');
}

$userM = new UserManager();
$USER = $userM->find_user($_POST["email"],$crypt->crypte($_POST["pass"]));
if($USER){
    $_SESSION["Semail"] = $USER->get_email();
    $_SESSION["Spass"] = $USER->get_pass();
}
else{
    exit('La connexion à echouée, mauvais mot de passe ?');
}

?>
ok