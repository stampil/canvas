<div id='cssmenu'>
    <ul>
        <li <?php if($action=="accueil") echo 'class="active"' ?>><a href='?action=accueil'>Accueil</a></li>
        <?php
        if(is_connected()){
        ?>
        <li class='has-sub'><a href='#'>Sprites</a>
            <ul>
                <li><a href='?action=creer_sprite'>Créer un Sprite</a></li>
                <li class='has-sub'><a href='#'>Afficher ses Sprites</a>
                    <ul>
                        <li><a href='#'>Aucun sprite a afficher</a></li>
                    </ul>
                </li>
            </ul>
        </li>
        <?php
        }
        else{
        ?>
        <li <?php if($action=="apropos") echo 'class="active"' ?>><a href='?action=apropos'>A propos</a></li>
        <li <?php if($action=="apercu") echo 'class="active"' ?>><a href='?action=apercu'>Aperçu</a></li>
        <?php
        }
        ?>
    </ul>
</div>