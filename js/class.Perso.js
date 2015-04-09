var SettingsPerso = {
    "gauche": {
        "direction": 0,
        "position": {
            "x": -50,
            "y": 50
        }
    },
    "droite": {
        "direction": 1,
        "position": {
            "x": 380,
            "y": 50
        }
    }
};

SettingsPerso = {
    "gauche": {
        "direction": 0,
        "position": {
            "x": -50,
            "y": 230
        }
    },
    "droite": {
        "direction": 1,
        "position": {
            "x": 653,
            "y": 230
        }
    }
};

var SettingsSprite =
{
    "taille":{// fixé par feuille de sprite
        "width":279,
        "height":249
    },
    "animation": {
        "debut": [
            {
                "x": 1,
                "y": 1
            }
        ],
        "avance": [
            {
                "x": 281,
                "y": 251
            }
        ],
        "recule": [
            {
                "x": 543,
                "y": 251
            }
        ],
        "repos": [
            {
                "x": 281,
                "y": 1
            },
            {
                "x": 563,
                "y": 1
            }
        ],
        "charge": [
            {
                "x": 1,
                "y": 501
            },
            {
                "x": 281,
                "y": 501
            },
            {
                "x": 563,
                "y": 501
            }
        ],
        "coupPoing":[
            {
                "x": 1,
                "y": 751
            },
            {
                "x": 281,
                "y": 751
            },
            {
                "x": 563,
                "y": 751
            }
        ],
        "coupPied":[
            {
                "x": 1,
                "y": 1001
            },
            {
                "x": 281,
                "y": 1001
            },
            {
                "x": 563,
                "y": 1001
            },
            {
                "x": 841,
                "y": 1001
            }
        ],
        "distancePetit":[
            {
                "x": 1,
                "y": 1251
            },
            {
                "x": 281,
                "y": 1251
            }
        ],
        "distanceMoyen":[
            {
                "x": 1,
                "y": 1501
            },
            {
                "x": 281,
                "y": 1501
            }
        ],
        "distanceMoyen2":[
            {
                "x": 561,
                "y": 1501
            },
            {
                "x": 841,
                "y": 1501
            }
        ],
        "distanceGrand":[
            {
                "x": 1,
                "y": 1751
            },
            {
                "x": 281,
                "y": 1751
            },
            {
                "x": 563,
                "y": 1751
            }
        ]
    }
};

function Perso(url_image) {

    this.settings = SettingsPerso.gauche;
    this.nom = 'Player1';
    this.settingsSprite = SettingsSprite;
    this.sprite = new Image();
    //this.sprite.src = 'img/sprites/' + url_image;
    this.sprite.src = 'upload/' + url_image;
    this.inc_source = 0;

    this.spriteSourceX = 0;
    this.spriteSourceY = 0;
    this.spriteDestX = 0;
    this.spriteDestY = 0;
    this.etatChange = false;

    this.vitalite = 0;
    this.force = 0;
    this.ki = 0;
    this.defense = 0;
    this.agilite = 0;
    this.puissance = 0;


    this.setSprite = function (SettingsSprite) {
        if (typeof SettingsSprite == 'object') {
            this.settingsSprite = SettingsSprite;
        }
        else {
            console.error('Perso()', this.nom, 'error settings', SettingsSprite);
        }
    }

    this.setSettings = function (SettingsPerso) {
        if (typeof SettingsPerso == 'object' && typeof SettingsPerso.direction == 'number') {
            this.settings = SettingsPerso;
            console.info('Settings', this.nom, this.settings);
        }
        else {
            console.error('Perso()', this.nom, 'error settings', SettingsPerso);
        }
    }

    this.changeSprite = function(url_image){
        this.sprite.src = 'img/sprites/' + url_image;
        console.log('change sprite',this.sprite.src);
    }

    this.etat = function () { //sprite debut
        this.spriteSourceX = this.settingsSprite.animation.debut[this.inc_source % this.settingsSprite.animation.debut.length].x;
        this.spriteSourceY = this.settingsSprite.animation.debut[this.inc_source % this.settingsSprite.animation.debut.length].y;
        this.spriteDestX = this.settings.position.x;
        this.spriteDestY = this.settings.position.y;
    }

    this.setEtat = function (etat) { // player1.setEtat
        if (typeof etat == 'function') {
            this.etatChange = true;
            this.etat = etat;

            console.info('Settings', this.nom, this.settings);
        }
        else {
            console.error(this.nom, 'error setEtat', etat);
        }
    }

    this.setNom = function (nom) {
        this.nom = nom;
    }

    this.affiche = function () {
        // affiche perso
        this.etat();
        this.inc_source = Math.round(time_passed / Perso.intervalAnimation); //interval entre 2 animation meme etat
        ctx.drawImage(this.sprite, this.spriteSourceX, this.spriteSourceY, SettingsSprite.taille.width, SettingsSprite.taille.height, this.spriteDestX, this.spriteDestY, SettingsSprite.taille.width, SettingsSprite.taille.height);
        //affiche barre de vie
    }

    this.save = function () {
        $.post("ajax/save_perso.php", {
            "nom": this.nom
        }, function (data) {
            if (data) {
                ko_save = true
            }
            ;
        });
    }
}

Perso.intervalAnimation = 762;
Perso.vitesseDeplacement = 6;

Perso.debut = function () {
    this.spriteSourceX = this.settingsSprite.animation.debut[this.inc_source % this.settingsSprite.animation.debut.length].x;
    this.spriteSourceY = this.settingsSprite.animation.debut[this.inc_source % this.settingsSprite.animation.debut.length].y;
    this.spriteDestX = this.settings.position.x;
    this.spriteDestY = this.settings.position.y;
};


Perso.repos = function () {
    this.spriteSourceX = this.settingsSprite.animation.repos[this.inc_source % this.settingsSprite.animation.repos.length].x;
    this.spriteSourceY = this.settingsSprite.animation.repos[this.inc_source % this.settingsSprite.animation.repos.length].y;
};

Perso.charge = function () {
    this.spriteSourceX = this.settingsSprite.animation.charge[this.inc_source % this.settingsSprite.animation.charge.length].x;
    this.spriteSourceY = this.settingsSprite.animation.charge[this.inc_source % this.settingsSprite.animation.charge.length].y;
};

Perso.distancePetit = function () {
    this.spriteSourceX = this.settingsSprite.animation.distancePetit[this.inc_source % this.settingsSprite.animation.distancePetit.length].x;
    this.spriteSourceY = this.settingsSprite.animation.distancePetit[this.inc_source % this.settingsSprite.animation.distancePetit.length].y;
};

Perso.distanceMoyen = function () {
    this.spriteSourceX = this.settingsSprite.animation.distanceMoyen[this.inc_source % this.settingsSprite.animation.distanceMoyen.length].x;
    this.spriteSourceY = this.settingsSprite.animation.distanceMoyen[this.inc_source % this.settingsSprite.animation.distanceMoyen.length].y;
};

Perso.distanceMoyen2 = function () {
    this.spriteSourceX = this.settingsSprite.animation.distanceMoyen2[this.inc_source % this.settingsSprite.animation.distanceMoyen2.length].x;
    this.spriteSourceY = this.settingsSprite.animation.distanceMoyen2[this.inc_source % this.settingsSprite.animation.distanceMoyen2.length].y;
};

Perso.distanceGrand = function () {
    this.spriteSourceX = this.settingsSprite.animation.distanceGrand[this.inc_source % this.settingsSprite.animation.distanceGrand.length].x;
    this.spriteSourceY = this.settingsSprite.animation.distanceGrand[this.inc_source % this.settingsSprite.animation.distanceGrand.length].y;
};

Perso.coupPoing = function () {
    this.spriteSourceX = this.settingsSprite.animation.coupPoing[this.inc_source % this.settingsSprite.animation.coupPoing.length].x;
    this.spriteSourceY = this.settingsSprite.animation.coupPoing[this.inc_source % this.settingsSprite.animation.coupPoing.length].y;
};

Perso.coupPied = function () {
    this.spriteSourceX = this.settingsSprite.animation.coupPied[this.inc_source % this.settingsSprite.animation.coupPied.length].x;
    this.spriteSourceY = this.settingsSprite.animation.coupPied[this.inc_source % this.settingsSprite.animation.coupPied.length].y;
};

Perso.recule = function () {
    if (this.etatChange) {
        bruitage.src = 'sound/deplacement.wav';
        bruitage.load();
        bruitage.play();
        console.info('son recule');
    }
    this.etatChange = false;
    this.spriteSourceX = this.settingsSprite.animation.recule[this.inc_source % this.settingsSprite.animation.recule.length].x;
    this.spriteSourceY = this.settingsSprite.animation.recule[this.inc_source % this.settingsSprite.animation.recule.length].y;

    var inc_mouvement = -Perso.vitesseDeplacement; // rapidité deplacement
    if (this.settings.direction == 1) {
        inc_mouvement = Perso.vitesseDeplacement;
    }
    this.spriteDestX += inc_mouvement;

    if (this.settings.direction == 1) { //on est player2 a droite
        if (this.spriteDestX == this.settings.position.x) {
            console.log('fin recule: repos !', this.spriteDestX, this.settings.position.x);
            this.setEtat(Perso.repos);
        }
    }
    else { // on est player 1
        if (this.spriteDestX == this.settings.position.x) {
            console.log('fin recule: repos !', this.spriteDestX, this.settings.position.x);
            this.setEtat(Perso.repos);
        }
    }
};

Perso.avance = function () {

    if (this.etatChange) {
        bruitage.src = 'sound/deplacement.wav';
        bruitage.load();
        bruitage.play();
        console.info('son avance');
    }
    this.etatChange = false;
    this.spriteSourceX = this.settingsSprite.animation.avance[this.inc_source % this.settingsSprite.animation.avance.length].x;
    this.spriteSourceY = this.settingsSprite.animation.avance[this.inc_source % this.settingsSprite.animation.avance.length].y;

    var inc_mouvement = Perso.vitesseDeplacement;
    if (this.settings.direction == 1) { //player2 a droite
        inc_mouvement = -Perso.vitesseDeplacement;
    }
    this.spriteDestX += inc_mouvement;


    if (this.settings.direction == 1) { //on est player2 a droite
        if (this.spriteDestX <= Player1.spriteDestX) {
            bruitage.src = 'sound/saut.wav';
            bruitage.load();
            bruitage.play();
            console.info('son fin avance');
            console.log('fin avance: recule !', this.spriteDestX, Player1.spriteDestX);
            Player2.setEtat(Perso.repos);
            setTimeout(function(){
                Player2.setEtat(Perso.recule);
            },1500);

        }
    }
    else { // on est player 1
        if (this.spriteDestX >= Player2.spriteDestX) {
            bruitage.src = 'sound/saut.wav';
            bruitage.load();
            bruitage.play();
            console.info('son fin avance');
            console.log('fin avance: recule !', this.spriteDestX, Player1.spriteDestX);
            Player1.setEtat(Perso.repos);
            setTimeout(function(){
                Player1.setEtat(Perso.recule);
            },1500);

        }
    }
};