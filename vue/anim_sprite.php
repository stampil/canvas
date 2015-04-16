<?php
$id_sprite = $_GET["sprite"];
$spriteM = new SpriteManager();
$sprite = $spriteM->get_sprite($id_sprite);
if($USER->get_id_user() != $sprite->get_id_user()){
    exit("Ce sprite ne vous appartient pas");
}

$listsprite = $spriteM->list_configsprite();

?>
<div class="container">
    <h1><?php echo mb_strtoupper($sprite->get_nom(), 'UTF-8');
        ?></h1>
</div>

<p>Faite glisser vos sprites<br />
De votre personnage au repos
<br />en png (fond transparent) dans les cases.</p>

    <?php
    foreach ($listsprite as $configsprite){
        ?>
    <div>Sprite : <?php echo mb_strtoupper($configsprite->nom, 'UTF-8');?></div>
    <div><?php echo $configsprite->description;?></div>

        <?php
        for($i=1; $i<=$configsprite->nbcase; $i++){
        ?>
            <span class="canvas_bg">
                <canvas id="canvas_creation_<?php echo $configsprite->id_configsprite;?>_<?php echo $i; ?>_<?php echo $id_sprite; ?>" class="canvas"  width="900" height="500"></canvas>
            </span>
            <?php
        }
        ?>

        <div><canvas id="canvas_preview_<?php echo $configsprite->id_configsprite;?>_<?php echo $i; ?>_<?php echo $id_sprite; ?>" class="canvas_preview"  width="900" height="500"></canvas>
        </div>
    <?php
    }

    ?>

