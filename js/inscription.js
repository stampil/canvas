$(function() {

    $('#form').on('submit',function(e){
        e.preventDefault();

        if($('#pass').val() != $('#passTest').val()){
            alert('Les mots de pass ne correspondents pas !');
            return false;
        }
        $.ajax({
            type: "POST",
            url: "ajax/inscription.php",
            data: {"email":$('#email').val(),"pass":$('#pass').val(),"pseudo":$('#pseudo').val()},
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