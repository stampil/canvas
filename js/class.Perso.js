var SettingsPerso = {
    "gauche": {
        "direction": 0,
        "position": {
            "x": 0,
            "y": 50
        }
    },
    "droite": {
        "direction": 1,
        "position": {
            "x": 310,
            "y": 50
        }
    }
};
var widthSprite = 279; // fixé par feuille de sprite
var heightSprite = 249;
var SettingsSprite =
{
    "animation": {
        "debut": [
            {
                "x": 1,
                "y": 1
            }
        ],
        "avance": [
            {
                "x": 1,
                "y": 251
            }
        ],
        "recule": [
            {
                "x": 281,
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
        ]
    }
};

function Perso(url_image) {

    this.settings = SettingsPerso.gauche;
    this.nom = 'Player1';
    this.settingsSprite = SettingsSprite;
    this.sprite = new Image();
    this.sprite.src = 'img/sprites/' + url_image;
    this.inc_source = 0;

    this.spriteSourceX = 0;
    this.spriteSourceY = 0;
    this.spriteDestX = 0;
    this.spriteDestY = 0;

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

    this.etat = function () {
        this.spriteSourceX = this.settingsSprite.animation.debut[this.inc_source % this.settingsSprite.animation.debut.length].x;
        this.spriteSourceY = this.settingsSprite.animation.debut[this.inc_source % this.settingsSprite.animation.debut.length].y;
        this.spriteDestX = this.settings.position.x;
        this.spriteDestY = this.settings.position.y;
    }

    this.setEtat = function (etat) { // player1.setEtat
        if (typeof etat == 'function') {
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
        this.etat();
        this.inc_source = Math.round(time_passed / 300); //interval entre 2 animation meme etat
        ctx.drawImage(this.sprite, this.spriteSourceX, this.spriteSourceY, widthSprite, heightSprite, this.spriteDestX, this.spriteDestY, widthSprite, heightSprite);
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

Perso.recule = function () {
    this.spriteSourceX = this.settingsSprite.animation.recule[this.inc_source % this.settingsSprite.animation.recule.length].x;
    this.spriteSourceY = this.settingsSprite.animation.recule[this.inc_source % this.settingsSprite.animation.recule.length].y;

    var inc_mouvement = -4; // rapidité deplacement
    if (this.settings.direction == 1) {
        inc_mouvement = 4;
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
    this.spriteSourceX = this.settingsSprite.animation.avance[this.inc_source % this.settingsSprite.animation.avance.length].x;
    this.spriteSourceY = this.settingsSprite.animation.avance[this.inc_source % this.settingsSprite.animation.avance.length].y;

    var inc_mouvement = 4;
    if (this.settings.direction == 1) { //player2 a droite
        inc_mouvement = -4;
    }
    this.spriteDestX += inc_mouvement;


    if (this.settings.direction == 1) { //on est player2 a droite
        if (this.spriteDestX <= Player1.spriteDestX) {
            console.log('fin avance: recule !', this.spriteDestX, Player1.spriteDestX);
            Player2.setEtat(Perso.recule);
        }
    }
    else { // on est player 1
        if (this.spriteDestX >= Player2.spriteDestX) {
            console.log('fin avance: recule !', this.spriteDestX, Player1.spriteDestX);
            Player1.setEtat(Perso.recule);
        }
    }
};