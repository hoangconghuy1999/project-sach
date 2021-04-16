$(document).ready(function(){
    $("input[value='hien']").click(function(){
        $("#password").show();
    })
    $("input[value='an']").click(function(){
        $("#password").hide();
    })
})