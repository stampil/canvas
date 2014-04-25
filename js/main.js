var ctx; // context du canvas, les methodes passeront par ça
var t; // interval de raffraichissement, peut etre killé par : clearInteval(t);
var refresh = 1/30; // 30 fps
var cursor ={x:0,y:0}; // défini un objet nommé cursor ayant 2 methode : x et y



$(window).load(function(){ //permet de savoir que toute la page est chargé sur le client pour manipuler l'affichage
    
    //TODO recup taille canvas par image d'un background
    var bg ={w:200,h:200}; // en attendant on peut fixer la taille du canvas a 200x200
    
    //creation canvas avec taille dynamique ( sur chrome lancer la console ( F12, onglet console ) et ecrire  make_canvas({w:300,h:100}) par exemple
    make_canvas(bg);  //ds fonction.js
    
    //run program
    t = setInterval(function(){ //doc javascript
        ctx.clearRect(0,0,$('#canvas').width(),$('#canvas').height()); //efface le canvas entier toute les x seconde, principe du dessin animé qui défile
        
        //Affichage :
        affiche_pos({x:1,y:10}); //ds fonction.js
        affiche_heure({x:154,y:13});
        affiche_pos(cursor);
        
    },refresh); //boucle toute les x secondes
    
    //event
    $('#canvas').mousemove(function(e){ // on rempli notre global cursor avec le e.offsetX de l'event mousemove a chaque fois que la page detect un mouvmt souris dans le canvas
    cursor.x = e.offsetX;
    cursor.y = e.offsetY;
    });

});


