var ctx; // context du canvas, les methodes passeront par ça
var t; // interval de raffraichissement, peut etre killé par : clearInterval(t);
var refresh = 1 / 30; // 30 fps: 1/30
var cursor = {x: 0, y: 0}; // défini un objet nommé cursor ayant 2 methode : x et y

var keyPressed = '';

var Player1 = new Perso('spriteG.png');
Player1.setNom("Goku");
Player1.setSettings(SettingsPerso.gauche);

var Player2 = new Perso('spriteD.png');
Player2.setNom("Vegeta");
Player2.setSettings(SettingsPerso.droite);

var son_intro = document.getElementById("son_intro");
var bruitage = document.getElementById("bruitage");

var time_passed = 0;
var time_debut = null;

$(window).load(function () { //permet de savoir que toute la page est chargé sur le client pour manipuler l'affichage

    son_intro.volume = 0.1;
    var bg = {w: 900, h: 500};
    //creation canvas avec taille dynamique ( sur chrome lancer la console ( F12, onglet console ) et ecrire  make_canvas({w:300,h:100}) par exemple
    make_canvas(bg);  //ds fonction.js

    //run program
    t = setInterval(function () { //doc javascript
        ctx.clearRect(0, 0, $('#canvas').width(), $('#canvas').height()); //efface le canvas entier toute les x seconde, principe du dessin animé qui défile
        time_passed = Math.round(new Date().getTime()) - time_debut;
        //Affichage :
        affiche_pos({x: 1, y: 10}); //ds fonction.js
        affiche_key({x: 30, y: 10});
        affiche_time({x: 50, y: 10});

        Player1.affiche();
        Player2.affiche();

    }, refresh); //boucle toute les x secondes


    //event
    $('#canvas').mousemove(function (e) { // on rempli notre global cursor avec le e.offsetX de l'event mousemove a chaque fois que la page detect un mouvmt souris dans le canvas
        cursor.x = e.offsetX;
        cursor.y = e.offsetY;
    });


    $('body').keydown(function (e) {
        keyPressed = e.keyCode;
        /*
         * e.altKey :true|false
         * e.ctrlKey
         * e.shiftKey
         * e.keyCode
         */
        switch (keyPressed) {
            case 68:
                break;
        }
    });

    $('body').keyup(function (e) {
        /*
         * e.altKey :true|false
         * e.ctrlKey
         * e.shiftKey
         * e.keyCode
         */
        keyPressed = '';
    });

});


