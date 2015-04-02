function make_canvas(bg){
    //$('#canvas').width(width); bug : blurry
    document.getElementById('canvas').width=bg.w;
    document.getElementById('canvas').height=bg.h;
    ctx = $('#canvas').get(0).getContext('2d'); // issue de la doc canvas
    ctx.fillStyle = '#cdcdcd';
};

function affiche_pos(p){
    // p la position où on l'affiche sur le canvas
    //cursor : la globale calculé avec l'evenement on mouse over
    ctx.fillText('('+cursor.x+','+cursor.y+')',p.x,p.y); // doc canvas : ctx.fillText( text, x, y )
}

function affiche_position(p){
    // p la position où on l'affiche sur le canvas
    //cursor : la globale calculé avec l'evenement on mouse over
    ctx.fillText('('+position.x+','+position.y+')',p.x,p.y); // doc canvas : ctx.fillText( text, x, y )
}

function affiche_direction(p){
    ctx.fillText(direction,p.x,p.y); // doc canvas : ctx.fillText( text, x, y )
}

function affiche_cross(p){
    ctx.fillText('☻',p.x,p.y); // doc canvas : ctx.fillText( text, x, y )
}



var inc_sourceX = 0;
function affiche_goku(){
		var sourcesX = new Array(257,327,397);
		var sourceX = sourcesX[++inc_sourceX%sourcesX.length];
        var sourceY = 200;
        var sourceWidth = 65;
        var sourceHeight = 60;
        var destWidth = sourceWidth;
        var destHeight = sourceHeight;
        var destX = 70;
        var destY = 130;

        ctx.drawImage(Player1, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
		 ctx.drawImage(Player2, 10, 10, 30, sourceHeight, 120, destY, 30, destHeight);
		


		

}

function affiche_heure(p){
     // p la position où on l'affiche sur le canvas
    var d = new Date();
    ctx.fillText(d.getHours()+':'+(d.getMinutes()<10?'0'+d.getMinutes():d.getMinutes())+':'+(d.getSeconds()<10?'0'+d.getSeconds():d.getSeconds()),p.x,p.y);
    
}

function affiche_path(){
    for (var i=0; i<path.length; i++){
        eval(path[i]);
    }
}

function is_in_paths(){
    for(var i=0;i <path.length; i++){
        eval(path[i]);
        if(ctx.isPointInPath(position.x, position.y) || ctx.isPointInPath(position.x+8, position.y) || ctx.isPointInPath(position.x, position.y-8) || ctx.isPointInPath(position.x+8, position.y-8)) return true;
        //TODO faire position + taille image pour checker les 4 coins de l'image
    }
    return false;
}

function give_me_a_color(){
    return '#'+Math.random().toString(16).substr(2,6);
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
	ctx.drawImage(image, -(image.width/2), -(image.height/2));
 
	// and restore the co-ords to how they were when we began
	ctx.restore(); 
}
