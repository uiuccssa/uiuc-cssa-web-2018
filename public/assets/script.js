/*
* Helper functions to determine
* what files to read from a given link
*/
// returns a directory path
function hrefToFile(href){
    return ( href? href.substr(1)+'.html' : "home.html" );
}
// Refreshes the body content
function setBody(name,href){
    $("nav li").removeClass("active");
    
    $("#body").empty();
    $("#body").attr("w3-include-html", hrefToFile(href));
    w3.includeHTML();
    $("title").text("UIUC CSSA | "+name );
    //alert('body set to'+href);
}

/*
* jQuery function to manipulate the page when it's loaded
*/
$(document).ready(function() {

    // Pulls a page from a link when it's first opened
    var href_curr = window.location.hash;
    setBody(href_curr);   
    
    //Listen for clicks on navbar
    $("nav li>a").not("nav li:last-child").click(function(event) {
        var href_out = $(this).attr("href");
        var name = $(this).parentsUntil("nav ul.dropdown-menu").first().text();
        
        // if a is not a link, dont do anything
        if (!href_out) { return; }
        
        setBody(name,href_out);
        $(this).parent().addClass("active");

    });

});