var ctx = null;

function show_old_sprite(id_configsprite,num_case,id_sprite){
    console.log('show_old_sprite(',id_configsprite,',',num_case,',',id_sprite,')');
    var img = new Image();
    img.src = 'upload/SpritePerso/'+id_sprite+'/sprite_'+id_configsprite+'_'+num_case+'.png?'+Math.round(Math.random()*10000); // casse le cache image, pour refresh direct les changements

    var ctx = $('#canvas_creation_'+id_configsprite+'_'+num_case+'_'+id_sprite).get(0).getContext('2d');
    //ctx.clearRect(0,0,1900,1200);
    img.onload = function () {
        console.info('image loaded',img,id_configsprite,num_case,id_sprite);
        ctx.drawImage(img, 100-(img.width/2),$('#canvas_creation_'+id_configsprite+'_'+num_case+'_'+id_sprite).height()-img.height-80 );
    }
}

var interv_old_sprite = [];
function show_old_sprite_animated(id_configsprite,id_sprite,nb_case ,img_loaded,imgs){

    if(!img_loaded) clearInterval(interv_old_sprite[id_configsprite]);
    console.log('show_old_sprite_animated(',id_configsprite,',',id_sprite,',',nb_case,',',img_loaded,',',imgs,')');
    var tps_anim=0;

    if(img_loaded!=nb_case){
        var img = new Image();
        img.src = 'upload/SpritePerso/'+id_sprite+'/sprite_'+id_configsprite+'_'+(1+img_loaded)+'.png?'+Math.round(Math.random()*10000);
        img.onload = function(){
            imgs.push(img);
            show_old_sprite_animated(id_configsprite,id_sprite,nb_case,++img_loaded,imgs);
            return
        }.bind(imgs,img);

        return;
    }
    console.log('all images loaded',imgs);

    interv_old_sprite[id_configsprite] = setInterval(function(){
        tps_anim++;
        var img_number =(tps_anim%nb_case);

        console.log('show_old_sprite_animated(',id_configsprite,',',id_sprite,')' ,imgs[img_number] );
        var ctx = $('#canvas_preview_'+id_configsprite+'_'+id_sprite).get(0).getContext('2d');
        ctx.clearRect(0,0,1900,1200);
        ctx.font="20px Georgia";
        ctx.fillText("Preview animation!",10,50);
        if(typeof imgs[img_number] != 'undefined')  ctx.drawImage(imgs[img_number], 100-(imgs[img_number].width/2),$('#canvas_preview_'+id_configsprite+'_'+id_sprite).height()-imgs[img_number].height-80 );


    }.bind(tps_anim,nb_case),450);

}

    $(function () {


    $(document).on('dragenter', '.canvas', function () {
        $(this).css('border', '3px dashed red');
        return false;
    });


    $(document).on('dragover', '.canvas', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).css('border', '3px dashed red');
        return false;
    });

    $(document).on('dragleave', '.canvas', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).css('border', '3px dashed #BBBBBB');
        return false;
    });

    $(document).on('drop', '.canvas', function (e) {
        if (e.originalEvent.dataTransfer) {
            if (e.originalEvent.dataTransfer.files.length) {
                // Stop the propagation of the event
                e.preventDefault();
                e.stopPropagation();
                $(this).css('border', '3px dashed green');
                // Main function to upload
                upload(e.originalEvent.dataTransfer.files,$(this).attr("id"));
            }
        }
        else {
            $(this).css('border', '3px dashed #BBBBBB');
        }
        return false;
    });
});

function handleReaderLoad(evt,id, filename) {

    var img = new Image();
    img.src = evt.target.result;

    ctx = $('#'+id).get(0).getContext('2d');
    ctx.clearRect(0,0,1900,1200);
    var posX = 100-(img.width/2);
    var posY = $('#'+id).height()-img.height-40
    ctx.drawImage(img, posX,posY ); //-40 position dans le decors a partir du bas, peros pas coller tout en bas
    var splitId = id.split('_');

    console.info(evt,id, filename,img.width,img.height,posX,posY);
    $.ajax({
        type: 'POST',
        url: 'ajax/upload_sprite.php',
        data: {"file": img.src,
            "filename":filename,
            "w":img.width,
            "h":img.height,
            "x":posX,
            "y":posY,
            "id_configsprite":splitId[2],
            "num_case":splitId[3],
            "id_sprite":splitId[4]
        },

        success: function (data) {
            //console.log(data);
            show_old_sprite_animated(splitId[2],splitId[4],splitId[3],0, new Array());
        }
    });
}

function upload(files,id) {

    var f = files[0];
    console.log('upload',id, f.name);

    if (!f.type.match('image/png')) {
            alert('The file must be a png image');
            return false;
    }
    // Read in the image file as a data URL.

        var reader = new FileReader();

        // When the image is loaded,
        // run handleReaderLoad function
        reader.onload = function(evt){
            handleReaderLoad(evt,id, f.name);
        };
        reader.readAsDataURL(f);

}

function multipleUpload(files) {
    console.log(files.length, 'files');
    var f = files[0];

    for (var i = 0; i < files.length; i++) {
        if (!files[i].type.match('image/png')) {
            alert('The file must be a png image');
            return false;
        }
    }
    console.log('files ok');


    // Read in the image file as a data URL.
    for (var i = 0; i < files.length; i++) {
        var reader = new FileReader();

        // When the image is loaded,
        // run handleReaderLoad function
        reader.onload = handleReaderLoad;
        reader.readAsDataURL(files[i]);
    }
}
