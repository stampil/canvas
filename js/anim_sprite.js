var ctx = null;


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
    console.info(evt,id, filename);
    var img = new Image();
    img.src = evt.target.result;
    ctx = $('#'+id).get(0).getContext('2d');
    ctx.clearRect(0,0,1900,1200);
    ctx.drawImage(img, ((300-img.width)/2), 200-img.height);



    $.ajax({
        type: 'POST',
        url: 'ajax/upload_sprite.php',
        data: {"file": img.src,"filename":filename},
        success: function (data) {
            //console.log(data);
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
