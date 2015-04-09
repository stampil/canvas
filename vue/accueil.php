<div class="container">
    <h1>Sprite Generator</h1>
</div>

<?php
if(!is_connected()){
?>
<div class="container">
    <div class="label">SE CONNECTER</div>
    <form name="form" id="form">
        <table class="login">
            <tr>
                <td>
                    <input type="email" name="email" id="email" placeholder="Email" required>
                </td>
            </tr>
            <tr>
                <td>
                    <input type="password" name="pass" id="pass" placeholder="Mot de passe" required>
                </td>
            </tr>
            <tr>
                <td>
                    <input type="submit" value="Se connecter">
                </td>
            </tr>
        </table>
    </form>
    <div class="label_bottom"><a href="?action=inscription">S'inscrire</a></div>
</div>
    <?php
}
else{
        ?>
    <div class="container">Session de <?php echo $USER->get_pseudo() ?>.
        <a href="?action=accueil&deco=1">Se déconnecter.</a>
        </div>
<?php
}
?>