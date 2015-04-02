var ctx; // context du canvas, les methodes passeront par ça
var t; // interval de raffraichissement, peut etre killé par : clearInterval(t);
var refresh = 1/30; // 30 fps
var cursor ={x:0,y:0}; // défini un objet nommé cursor ayant 2 methode : x et y
var position  ={x:0,y:0};
var TO_RADIANS = Math.PI/180; 
var img_hourglass = new Image();
img_hourglass.src = 'img/hourglass.png';
var angle = angle2 = angle3 = 0;
var direction = 0;
var path = new Array();
var temp_path='';
var Player1 = new Image();
Player1.src = 'img/goku_sprites_by_saiyagami-d4pxtss.png';
var Player2 = new Image();
Player2.src = 'img/vegeta_androidsaga_battledamaged_75_sprites_lsw_by_zitlezoan-d5t8hzt.png';
var ground = Math.floor(Math.random()*6)+1;







$(window).load(function(){ //permet de savoir que toute la page est chargé sur le client pour manipuler l'affichage

    //TODO recup taille canvas par image d'un background
    var bg ={w:512,h:206}; // en attendant on peut fixer la taille du canvas a 200x200
    
    //creation canvas avec taille dynamique ( sur chrome lancer la console ( F12, onglet console ) et ecrire  make_canvas({w:300,h:100}) par exemple
    make_canvas(bg);  //ds fonction.js
    
    //run program
    t = setInterval(function(){ //doc javascript
        ctx.clearRect(0,0,$('#canvas').width(),$('#canvas').height()); //efface le canvas entier toute les x seconde, principe du dessin animé qui défile
        
        //Affichage :
        affiche_pos({x:1,y:10}); //ds fonction.js
        affiche_heure({x:154,y:13});
        affiche_cross(position);
        affiche_direction({x:180,y:185});
        affiche_position({x:1,y:185});
        affiche_path();
		affiche_goku();
        
    },refresh); //boucle toute les x secondes
    
    //event
    $('#canvas').mousemove(function(e){ // on rempli notre global cursor avec le e.offsetX de l'event mousemove a chaque fois que la page detect un mouvmt souris dans le canvas
    cursor.x = e.offsetX;
    cursor.y = e.offsetY;
    });
    
    var nb_click=0;
    $('#canvas').click(function(e){
        if(!nb_click){
            temp_path+='ctx.save();ctx.globalAlpha = 0.3;ctx.beginPath();';
            temp_path+='ctx.moveTo('+e.offsetX+','+e.offsetY+');';
        }
        else{
            temp_path+='ctx.lineTo('+e.offsetX+','+e.offsetY+');';
        }
        nb_click++;
        
        
    });
    
    $('#canvas').dblclick(function(){
        temp_path+='ctx.closePath();ctx.stroke();ctx.fillStyle="'+give_me_a_color()+'";ctx.fill();ctx.strokeStyle = "black";ctx.lineWidth   = 2;ctx.restore()';
        path.push(temp_path);
        nb_click=0;
        temp_path='';
    });
    
    $('body').keydown(function(e){
        /*
         * e.altKey :true|false
         * e.ctrlKey
         * e.shiftKey
         * e.keyCode
         */
        switch(e.keyCode){
            case 68:
            case 39:
                if(position.x<$('#canvas').width())
                position.x++;
                if(is_in_paths()) position.x--;
            break;
            case 81:
            case 37:
                if(position.x>0)
                position.x--;
                if(is_in_paths()) position.x++;
            break;
            case 83:
            case 40:
                if(position.y<$('#canvas').height())
                position.y++;
                 if(is_in_paths()) position.y--;
            break;
            case 90:
            case 38:
                if(position.y>0)
                position.y--;
                if(is_in_paths()) position.y++;
            break;            
        }
       direction= e.keyCode; 
    });
    
    $('body').keyup(function(e){
        /*
         * e.altKey :true|false
         * e.ctrlKey
         * e.shiftKey
         * e.keyCode
         */
       direction= 0; 
    });
    
   

});


