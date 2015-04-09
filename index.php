<?php
require 'require/header.php';
require 'require/commun.php';

$action = isset($_GET["action"]) ? $_GET["action"] : "accueil";

?>
<!DOCTYPE html>
<html>
<head>
    <title>SpriteGenerator</title>
    <link href="css/styles.css" rel="stylesheet" type="text/css">

</head>
<body>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js"></script>

<?php
$local_js = 'js/'.$action.'.js';
if( is_file($local_js)){
    echo '<script src="'.$local_js.'"></script>';
}
?>
<?php require 'require/menu.php'; ?>
<div style="position:relative">

    <?php @include 'vue/' . $action . '.php'; ?>

</div>
<div id="foot">

</div>
<script src="js/footer.js"></script>

</body>
</html>