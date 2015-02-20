var ctx; // context du canvas, les methodes passeront par ça
var t; // interval de raffraichissement, peut etre killé par : clearInterval(t);
var refresh = 1 / 30; // 30 fps
var cursor = {x: 0, y: 0}; // défini un objet nommé cursor ayant 2 methode : x et y
var position = {x: 0, y: 0};
var TO_RADIANS = Math.PI / 180;
var img_hourglass = new Image();
img_hourglass.src = 'img/hourglass.png';
var angle = angle2 = angle3 = 0;
var couleur = {"rouge": "#ED1313", "bleu": "#139EED", "vert": "#13ED1A", "jaune": "yellow"};
var couleurs = [couleur.rouge, couleur.bleu, couleur.vert, couleur.jaune];
var type_vaisseau = {"neutre": 0, "medical": 1, "VIP": 2, "combat": 3, "marchand": 4};
var type_symbole = {"leger": 0, "moyen": 1, "lourd": 2};
var symboles = [
    new Symbole({x: 200, y: 90}, type_symbole.leger, 0, type_vaisseau.combat, 'L', 'super hornet', 'gourmand'),
    new Symbole({x: 138, y: 156}, type_symbole.leger, 0, type_vaisseau.combat, 2, 'hornet ghost', '306_hawk_fabian'),
    new Symbole({x: 264, y: 156}, type_symbole.leger, 0, type_vaisseau.combat, 3, 'avenger', 'test nom'),
    new Symbole({x: 330, y: 226}, type_symbole.leger, 0, type_vaisseau.neutre, 4, 'aurora LX', 'big'),
    new Symbole({x: 483, y: 195}, type_symbole.lourd, 2, type_vaisseau.marchand, 'L', 'Idriss', 'baraque a frite'),
    new Symbole({x: 530, y: 326}, type_symbole.moyen, 2, type_vaisseau.medical, '2', 'Cutlass Red', 'un mec')
];
var bg = {w: 800, h: 600};
var clicked = position;
var click = false;
var keyCode = null;



$(window).load(function () { //permet de savoir que toute la page est chargé sur le client pour manipuler l'affichage

    //TODO recup taille canvas par image d'un background
    // en attendant on peut fixer la taille du canvas a 200x200

    //creation canvas avec taille dynamique ( sur chrome lancer la console ( F12, onglet console ) et ecrire  make_canvas({w:300,h:100}) par exemple
    make_canvas(bg);  //ds fonction.js

    //run program
    t = setInterval(function () { //doc javascript
        ctx.clearRect(0, 0, bg.w, bg.h); //efface le canvas entier toute les x seconde, principe du dessin animé qui défile

        //Affichage :
        affiche_pos({x: 1, y: 22}); //ds fonction.js
        affiche_heure({x: 1, y: 10});

        for (i in symboles) {
            symboles[i].affiche();
        }

        //drawRotatedImage(img_hourglass, {x:180,y:40}, --angle2%360);
        //drawRotatedImage(img_hourglass, {x:27,y:51}, ++angle3%360);
        //drawRotatedImage(img_hourglass, cursor, ++angle%360);

    }, refresh); //boucle toute les x secondes

    //event
    $('#canvas').mousemove(function (e) { // on rempli notre global cursor avec le e.offsetX de l'event mousemove a chaque fois que la page detect un mouvmt souris dans le canvas
        cursor.x = e.offsetX;
        cursor.y = e.offsetY;
    });



    $('#canvas').click(function (e) {

        clicked.x = e.offsetX;
        clicked.y = e.offsetY;

    });



    $('body').keydown(function (e) {
        /*
         * e.altKey :true|false
         * e.ctrlKey
         * e.shiftKey
         * e.keyCode
         */
        keyCode = e.keyCode;
        console.log(keyCode);

    });

    $('body').keyup(function () {
        keyCode = '';
    });



});


