<div class="container">
    <h1>Sprite Generator</h1>
</div>
<div class="container">
    <div class="label">S'INSCRIRE</div>
    <form name="form" id="form">
        <table class="login">
            <tr>
                <td>
                    <input type="email" name="email" id="email" placeholder="Email" required>
                </td>
            </tr>
            <tr>
                <td>
                    <input type="password" name="pass" id="pass" placeholder="Mot de passe" required pattern=".{5,}" title="Minimum 5 caracteres">
                </td>
            </tr>
            <tr>
                <td>
                    <input type="password" name="passTest" id="passTest" placeholder="Retapper le mot de passe" required pattern=".{5,}" title="doit correspondre au premier mot de passe">
                </td>
            </tr>
            <tr>
                <td>
                    <input type="text" name="pseudo" id="pseudo" placeholder="Pseudo" required pattern="[a-zA-Z]+[a-zA-Z0-9]*" title="Doit commencer par une lettre">
                </td>
            </tr>

            <tr>
                <td>
                    <input type="submit" value="S'inscrire">
                </td>
            </tr>
        </table>
    </form>
    <div class="label_bottom"><a href="?action=accueil">Se connecter</a></div>
</div>