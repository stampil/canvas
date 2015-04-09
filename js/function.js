function make_canvas(bg) {
    //$('#canvas').width(width); bug : blurry
    document.getElementById('canvas').width = bg.w;
    document.getElementById('canvas').height = bg.h;
    $('#canvas').css('background-image', "url('img/tournois2.jpg')");

    ctx = $('#canvas').get(0).getContext('2d'); // issue de la doc canvas
    ctx.fillStyle = '#cdcdcd';
    time_debut = Math.round(new Date().getTime());
};

function affiche_time(p) {
    ctx.fillText(time_passed, p.x, p.y);
}

function affiche_pos(p) {
    // p la position où on l'affiche sur le canvas
    //cursor : la globale calculé avec l'evenement on mouse over
    ctx.fillText('(' + cursor.x + ',' + cursor.y + ')', p.x, p.y); // doc canvas : ctx.fillText( text, x, y )
}

function affiche_key(p) {
    ctx.fillText(keyPressed, p.x, p.y); // doc canvas : ctx.fillText( text, x, y )
}

function give_me_a_color() {
    return '#' + Math.random().toString(16).substr(2, 6);
}
