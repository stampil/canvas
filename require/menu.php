<?php
$spriteM = new SpriteManager();
$sprites = $spriteM->get_all_sprite();
$nb_sprite = count($sprites);
$listsprite = $spriteM->list_configsprite();
?>
<div id='cssmenu'>
    <ul>
        <li <?php if ($action == "accueil") echo 'class="active"' ?>><a href='?action=accueil'>Accueil</a></li>
        <?php
        if (is_connected()) {
            ?>
            <li <?php if ($action == "creer_sprite") echo 'class="active"' ?>><a href='?action=creer_sprite'>Créer un
                    Sprite</a></li>
            <li class='has-sub'><a href='#'>Gerer ses Sprites</a>
            <ul>
            <?php
            if(!$nb_sprite){
                ?>
                <li><a href='#'>Pas de Sprite.</a>
                </li>
                <?php
            }
            for ($i = 0; $i < $nb_sprite; $i++) {
                ?>
                <li><a href='?action=anim_sprite&sprite=<?php echo $sprites[$i]->get_id_sprite(); ?>'><?php echo $sprites[$i]->get_nom(); ?></a>
                </li>
            <?php
            }?>
                </ul>
                <?php
        } else {
            ?>
            <li <?php if ($action == "apropos") echo 'class="active"' ?>><a href='?action=apropos'>A propos</a></li>
            <li <?php if ($action == "apercu") echo 'class="active"' ?>><a href='?action=apercu'>Aperçu</a></li>
        <?php
        }
        ?>
    </ul>
</div>