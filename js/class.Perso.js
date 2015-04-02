
var SettingsPerso = {
    "gauche":{
        "direction":0,
        "position":{
            "x":10,
            "y":100
        }
    },
    "droite":{
        "direction":1,
        "position":{
            "x":100,
            "y":100
        }
    }

};

function Perso() {

    this.settings = SettingsPerso.gauche;
    this.nom = 'Player1';

    this.setSettings = function(settings){
        if(typeof settings == 'object' && typeof settings.direction == 'number'){
            this.setSettings = settings;
        }
        else{
            console.error('Perso()',this.nom, 'error settings', settings);
        }

    }

    this.affiche = function(){

    }

    this.save = function(){

        $.post( "ajax/save_perso.php", {
            "nom":this.nom
        }, function( data ) {
            if(data){ko_save=true};
        });

    }
}
