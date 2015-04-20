<?php
$nb_cased_sprite = $_GET["sprite"];
$nb_cased_configsprite = $_GET["config"];
$spriteM = new SpriteManager();
$sprite = $spriteM->get_sprite($nb_cased_sprite);
if ($USER->get_id_user() != $sprite->get_id_user()) {
    exit("Ce sprite ne vous appartient pas");
}

$listsprite = $spriteM->list_configsprite();

?>
<div class="container">
    <h1><?php echo mb_strtoupper($sprite->get_nom(), 'UTF-8');
        ?></h1>
</div>

<p>Faite glisser vos sprites<br/>
    De votre personnage
    <br/>en png (fond transparent) dans les cases.</p>
<hr/>
<?php
foreach ($listsprite as $configsprite) {

    ?>
    <div>Sprite<?php echo $configsprite->id_configsprite;?> (<?php echo $configsprite->nbcase; ?> case<?php echo $configsprite->nbcase>1?'s':''; ?>) : <?php echo mb_strtoupper($configsprite->nom, 'UTF-8'); ?></div>
    <div><?php echo $configsprite->description; ?></div>

    <?php
    for ($nb_case = 1; $nb_case <= $configsprite->nbcase; $nb_case++) {
        ?>
        <span class="canvas_bg">
                <canvas
                    id="canvas_creation_<?php echo $configsprite->id_configsprite; ?>_<?php echo $nb_case; ?>_<?php echo $nb_cased_sprite; ?>"
                    class="canvas" width="1350" height="750"></canvas>
            </span>
        <script>
            show_old_sprite(<?php echo $configsprite->id_configsprite;?>, <?php echo $nb_case; ?>, <?php echo $nb_cased_sprite; ?>);
        </script>

    <?php


    }
        ?>

        <canvas id="canvas_preview_<?php echo $configsprite->id_configsprite; ?>_<?php echo $nb_cased_sprite; ?>"
                class="canvas_preview" width="1350" height="750"></canvas>

        <script>
            show_old_sprite_animated(<?php echo $configsprite->id_configsprite;?>, <?php echo $nb_cased_sprite; ?>,<?php echo $configsprite->nbcase; ?>,0, new Array());
        </script>


    <hr/>
<?php
}

?>

