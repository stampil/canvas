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
    header('Location: index.php');
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

function xss_clean($data)
{
    // Fix &entity\n;
    $data = str_replace(array('&amp;','&lt;','&gt;'), array('&amp;amp;','&amp;lt;','&amp;gt;'), $data);
    $data = preg_replace('/(&#*\w+)[\x00-\x20]+;/u', '$1;', $data);
    $data = preg_replace('/(&#x*[0-9A-F]+);*/iu', '$1;', $data);
    $data = html_entity_decode($data, ENT_COMPAT, 'UTF-8');

    // Remove any attribute starting with "on" or xmlns
    $data = preg_replace('#(<[^>]+?[\x00-\x20"\'])(?:on|xmlns)[^>]*+>#iu', '$1>', $data);

    // Remove javascript: and vbscript: protocols
    $data = preg_replace('#([a-z]*)[\x00-\x20]*=[\x00-\x20]*([`\'"]*)[\x00-\x20]*j[\x00-\x20]*a[\x00-\x20]*v[\x00-\x20]*a[\x00-\x20]*s[\x00-\x20]*c[\x00-\x20]*r[\x00-\x20]*i[\x00-\x20]*p[\x00-\x20]*t[\x00-\x20]*:#iu', '$1=$2nojavascript...', $data);
    $data = preg_replace('#([a-z]*)[\x00-\x20]*=([\'"]*)[\x00-\x20]*v[\x00-\x20]*b[\x00-\x20]*s[\x00-\x20]*c[\x00-\x20]*r[\x00-\x20]*i[\x00-\x20]*p[\x00-\x20]*t[\x00-\x20]*:#iu', '$1=$2novbscript...', $data);
    $data = preg_replace('#([a-z]*)[\x00-\x20]*=([\'"]*)[\x00-\x20]*-moz-binding[\x00-\x20]*:#u', '$1=$2nomozbinding...', $data);

    // Only works in IE: <span style="width: expression(alert('Ping!'));"></span>
    $data = preg_replace('#(<[^>]+?)style[\x00-\x20]*=[\x00-\x20]*[`\'"]*.*?expression[\x00-\x20]*\([^>]*+>#i', '$1>', $data);
    $data = preg_replace('#(<[^>]+?)style[\x00-\x20]*=[\x00-\x20]*[`\'"]*.*?behaviour[\x00-\x20]*\([^>]*+>#i', '$1>', $data);
    $data = preg_replace('#(<[^>]+?)style[\x00-\x20]*=[\x00-\x20]*[`\'"]*.*?s[\x00-\x20]*c[\x00-\x20]*r[\x00-\x20]*i[\x00-\x20]*p[\x00-\x20]*t[\x00-\x20]*:*[^>]*+>#iu', '$1>', $data);

    // Remove namespaced elements (we do not need them)
    $data = preg_replace('#</*\w+:\w[^>]*+>#i', '', $data);

    do
    {
        // Remove really unwanted tags
        $old_data = $data;
        $data = preg_replace('#</*(?:applet|b(?:ase|gsound|link)|embed|frame(?:set)?|i(?:frame|layer)|l(?:ayer|ink)|meta|object|s(?:cript|tyle)|title|xml)[^>]*+>#i', '', $data);
    }
    while ($old_data !== $data);

    // we are done...
    return $data;
}

?>