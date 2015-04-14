$(function(){
    $('#creation_sprite').on('click',function(){
        $.ajax({
            type: 'POST',
            url: 'ajax/creer_sprite.php',
            data: {"nom": $('#nom').val()},
            success: function (data) {
                console.log('creation sprite line insered:',data);
                if(data>0){
                    location.href='?action=anim_sprite&sprite='+data;

                }
                else{
                    alert('enregistrement non effectué, verifier que le nom de ce sprite n\'existe pas déjà.');
                }
            }
        });
    });
});