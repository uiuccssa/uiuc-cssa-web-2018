var content = {
    "pages" : "home",
    "sections" : {
        "1" : "<p>Hello</p>",
        "2" : "<p>world.</p>"
    }
}


//=====================================================

function hrefToFile(href){
    return ( href? href.substr(1)+'.html' : "home.html" );
}
function setBody(href){
    $("nav li").removeClass('active');
    
    $("#body").empty();
    $("#body").attr("w3-include-html", hrefToFile(href));
    w3.includeHTML();
    
    //alert('body set to'+href);
}

$(document).ready(function() {

    // set location to read file
    var href_curr = window.location.hash;
    setBody(href_curr);   
    
    //Listen for clicks on navbar
    $("nav li").click(function(event) {
        //var href_out = $(this).attr('href');
        setBody($(this).attr('href'));
        $(this).addClass('active');
    });

});


/*
for(var e in content.sections) {
    $("#body").append(content.sections[e]);
}
*/