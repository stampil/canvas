$(function() {

    $('#form').on('submit',function(e){
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: "ajax/connexion.php",
            data: {"email":$('#email').val(),"pass":$('#pass').val()},
            success: function(data){
                if(data=='ok'){
                    document.location.href = '?action=accueil';
                }
                else{
                    console.error(data);
                    alert(data);
                }
            }
        });

        return false;
    });

});