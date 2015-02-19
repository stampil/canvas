function make_canvas(bg) {
    //$('#canvas').width(width); bug : blurry
    document.getElementById('canvas').width = bg.w;
    document.getElementById('canvas').height = bg.h;
    ctx = $('#canvas').get(0).getContext('2d'); // issue de la doc canvas
    ctx.fillStyle = '#cdcdcd';
}
;

function affiche_pos(p) {
    // p la position où on l'affiche sur le canvas
    //cursor : la globale calculé avec l'evenement on mouse over
    ctx.fillText('(' + cursor.x + ',' + cursor.y + ')', p.x, p.y); // doc canvas : ctx.fillText( text, x, y )
}

function affiche_position(p) {
    // p la position où on l'affiche sur le canvas
    //cursor : la globale calculé avec l'evenement on mouse over
    ctx.fillText('(' + position.x + ',' + position.y + ')', p.x, p.y); // doc canvas : ctx.fillText( text, x, y )
}

function affiche_direction(p) {
    ctx.fillText(direction, p.x, p.y); // doc canvas : ctx.fillText( text, x, y )
}

function affiche_cross(p) {
    ctx.fillText('☻', p.x, p.y); // doc canvas : ctx.fillText( text, x, y )
}

function affiche_heure(p) {
    // p la position où on l'affiche sur le canvas
    var d = new Date();
    ctx.fillText(d.getHours() + ':' + (d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()) + ':' + (d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()), p.x, p.y);

}

function affiche_path() {
    for (var i = 0; i < path.length; i++) {
        eval(path[i]);
    }
}

function is_in_paths() {
    for (var i = 0; i < path.length; i++) {
        eval(path[i]);
        if (ctx.isPointInPath(position.x, position.y) || ctx.isPointInPath(position.x + 8, position.y) || ctx.isPointInPath(position.x, position.y - 8) || ctx.isPointInPath(position.x + 8, position.y - 8))
            return true;
        //TODO faire position + taille image pour checker les 4 coins de l'image
    }
    return false;
}

function give_me_a_color() {
    return '#' + Math.random().toString(16).substr(2, 6);
}

/*
 * exemple : drawRotatedImage(img_hourglass, {x:27,y:51}, ++angle3%360);  ou --angle3%360
 */
function drawRotatedImage(image, p, angle) {

    // save the current co-ordinate system 
    // before we screw with it
    ctx.save();

    // move to the middle of where we want to draw our image
    ctx.translate(p.x, p.y);

    // rotate around that point, converting our 
    // angle from degrees to radians 
    ctx.rotate(angle * TO_RADIANS);

    // draw it up and to the left by half the width
    // and height of the image 
    ctx.drawImage(image, -(image.width / 2), -(image.height / 2));

    // and restore the co-ords to how they were when we began
    ctx.restore();
}

function affiche_symbol(pos, symbole, color, type, num, nomVaiss, nomJoueur) {
    ctx.save();
    ctx.lineWidth = "3";
    switch (symbole) {
        case type_symbole.leger:
            ctx.beginPath();
            ctx.moveTo(pos.x, pos.y);
            ctx.lineTo(pos.x + 60, pos.y);
            ctx.lineTo(pos.x + 60, pos.y - 35);
            ctx.lineTo(pos.x + 30, pos.y - 45);
            ctx.lineTo(pos.x, pos.y - 35);
            ctx.closePath();
            ctx.stroke();
            ctx.fillStyle = color;
            ctx.fill();
            ctx.lineWidth = "2";
            switch (type) {
                case type_vaisseau.medical:
                    ctx.beginPath();
                    ctx.moveTo(pos.x + 30, pos.y - 45);
                    ctx.lineTo(pos.x + 30, pos.y);
                    ctx.closePath();
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(pos.x, pos.y - 20);
                    ctx.lineTo(pos.x + 60, pos.y - 20);
                    ctx.closePath();
                    ctx.stroke();
                    ctx.fillStyle = 'black';
                    ctx.fillText(num, pos.x + 20, pos.y - 34);
                    break;
                case type_vaisseau.VIP:
                    ctx.beginPath();
                    ctx.moveTo(pos.x, pos.y - 25);
                    ctx.lineTo(pos.x + 30, pos.y);
                    ctx.closePath();
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(pos.x + 60, pos.y - 25);
                    ctx.lineTo(pos.x + 30, pos.y);
                    ctx.closePath();
                    ctx.stroke();
                    ctx.fillStyle = 'black';
                    ctx.fillText(num, pos.x + 27, pos.y - 34);
                    break;
                case type_vaisseau.combat :
                    ctx.beginPath();
                    ctx.moveTo(pos.x, pos.y - 35);
                    ctx.lineTo(pos.x + 60, pos.y);
                    ctx.closePath();
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(pos.x + 60, pos.y - 35);
                    ctx.lineTo(pos.x, pos.y);
                    ctx.closePath();
                    ctx.stroke();
                    ctx.fillStyle = 'black';
                    ctx.fillText(num, pos.x + 27, pos.y - 34);
                    break;
                case type_vaisseau.marchand :
                    ;
                    ctx.beginPath();
                    ctx.rect(pos.x + 10, pos.y - 25, 40, 20);
                    ctx.closePath();
                    ctx.stroke();


                    ctx.fillStyle = 'black';
                    ctx.fillText(num, pos.x + 27, pos.y - 34);

                    break;
                default:
                    ctx.fillStyle = 'black';
                    ctx.fillText(num, pos.x + 27, pos.y - 34);
                    break;
            }
            ctx.fillStyle = 'black';
            ctx.fillText(nomVaiss, pos.x, pos.y + 10);
            ctx.fillText(nomJoueur, pos.x, pos.y + 20);
            break;
        case type_symbole.moyen:
            ctx.beginPath();
            ctx.moveTo(pos.x, pos.y);
            ctx.lineTo(pos.x + 70, pos.y);
            ctx.lineTo(pos.x + 90, pos.y - 55);
            ctx.lineTo(pos.x + 35, pos.y - 95);
            ctx.lineTo(pos.x-20, pos.y - 55);
            ctx.closePath();
            ctx.stroke();
            ctx.fillStyle = color;
            ctx.fill();
            ctx.lineWidth = "2";
            switch (type) {
                
                case type_vaisseau.medical:
                    ctx.beginPath();
                    ctx.moveTo(pos.x + 30, pos.y - 45);
                    ctx.lineTo(pos.x + 30, pos.y);
                    ctx.closePath();
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(pos.x, pos.y - 20);
                    ctx.lineTo(pos.x + 60, pos.y - 20);
                    ctx.closePath();
                    ctx.stroke();
                    ctx.fillStyle = 'black';
                    ctx.fillText(num, pos.x + 20, pos.y - 34);
                    break;
                case type_vaisseau.VIP:
                    ctx.beginPath();
                    ctx.moveTo(pos.x, pos.y - 25);
                    ctx.lineTo(pos.x + 30, pos.y);
                    ctx.closePath();
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(pos.x + 60, pos.y - 25);
                    ctx.lineTo(pos.x + 30, pos.y);
                    ctx.closePath();
                    ctx.stroke();
                    ctx.fillStyle = 'black';
                    ctx.fillText(num, pos.x + 27, pos.y - 34);
                    break;
                case type_vaisseau.combat :
                    ctx.beginPath();
                    ctx.moveTo(pos.x, pos.y - 35);
                    ctx.lineTo(pos.x + 60, pos.y);
                    ctx.closePath();
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(pos.x + 60, pos.y - 35);
                    ctx.lineTo(pos.x, pos.y);
                    ctx.closePath();
                    ctx.stroke();
                    ctx.fillStyle = 'black';
                    ctx.fillText(num, pos.x + 27, pos.y - 34);
                    break;
                case type_vaisseau.marchand :
                    
                    ctx.beginPath();
                    ctx.rect(pos.x + 10, pos.y - 45, 50, 30);
                    ctx.closePath();
                    ctx.stroke();


                    ctx.fillStyle = 'black';
                    ctx.fillText(num, pos.x + 31, pos.y - 64);

                    break;
                default:
                    ctx.fillStyle = 'black';
                    ctx.fillText(num, pos.x + 27, pos.y - 34);
                    break;
            }
            ctx.fillStyle = 'black';
            ctx.fillText(nomVaiss, pos.x, pos.y + 10);
            ctx.fillText(nomJoueur, pos.x, pos.y + 20);
            break;
        default:
            break;
    }

    ctx.lineWidth = "1";
    ctx.restore();
}
