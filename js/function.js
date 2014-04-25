function make_canvas(bg){
    //$('#canvas').width(width); bug : blurry
    document.getElementById('canvas').width=bg.w;
    document.getElementById('canvas').height=bg.h;
    ctx = $('#canvas').get(0).getContext('2d'); // issue de la doc canvas
};

function affiche_pos(p){
    // p la position où on l'affiche sur le canvas
    //cursor : la globale calculé avec l'evenement on mouse over
    ctx.fillText('('+cursor.x+','+cursor.y+')',p.x,p.y); // doc canvas : ctx.fillText( text, x, y )
}

function affiche_heure(p){
     // p la position où on l'affiche sur le canvas
    var d = new Date();
    ctx.fillText(d.getHours()+':'+(d.getMinutes()<10?'0'+d.getMinutes():d.getMinutes())+':'+(d.getSeconds()<10?'0'+d.getSeconds():d.getSeconds()),p.x,p.y);
    
}

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
