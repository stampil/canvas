<?php

date_default_timezone_set('Europe/Paris');

spl_autoload_register(function($class) {
    include 'class/' . $class . '.php';
});

$bdd = new MyPDO();
$crypt = new Crypt();


$USER = false;


if(isset($_GET["deco"])){
    session_destroy();
}

function is_connected(){
    return isset($_SESSION["Semail"]) && $_SESSION["Spass"];
}

if(is_connected()){
    $userM = new UserManager();
    $USER = $userM->find_user($_SESSION["Semail"],$_SESSION["Spass"]);
}

 /**
  * 
  * @param type $path api/arena-commander/getLeaderboard
  * @param type $data {"mode":"BR","team":"PERSEIDE"}
  * @return object
  */
function API($path, $data){
    $url = 'https://robertsspaceindustries.com/api/'.$path;

    $options = array(
                    'http' => array(
                                    'header' => "application/x-www-form-urlencoded\r\n",
                                    'method' => 'POST',
                                    'content' => http_build_query(json_decode($data)),
                    ),
    );
    $context = @stream_context_create($options);
    $result = @file_get_contents($url, false, $context);
    $result = json_decode($result);
    return $result;
}

$jours = array("DIM","LUN","MAR","MER","JEU","VEN","SAM");

function usdatetotime($usdate){
    return preg_replace("/[0-9]{4}-[0-9]{2}-[0-9]{2} ([0-9]{2}):([0-9]{2}):[0-9]{2}/", "$1h$2", $usdate);
}
function usdatetotimeus($usdate){
    return preg_replace("/[0-9]{4}-[0-9]{2}-[0-9]{2} ([0-9]{2}):([0-9]{2}):[0-9]{2}/", "$1:$2", $usdate);
}

?>