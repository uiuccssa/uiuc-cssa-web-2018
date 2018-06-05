/*
* Helper functions to determine
* what files to read from a given link
*/
// returns a directory path
function hrefToFile(href){
    return ( href? href.substr(1)+'.html' : "home.html" );
}
//
/* 
* Refreshes the body content
* @name: string to apprea on tab title
* @href: index.html#foo. may or maynot be valid
*/
function setBody(name,href){
    $("nav li").removeClass("active");
    $("#body").empty();
    
    var href = href;
    $.ajax({
        url: hrefToFile(href),
        type:'HEAD',
        error: function(){
            window.location = ".";
        }
    });
   // alert(hrefToFile(href));
    $("#body").attr("w3-include-html", hrefToFile(href));
    w3.includeHTML();

    $("title").text("UIUC CSSA | "+ name.toUpperCase() );
}

/*
* jQuery function to manipulate the page when it's loaded
*/
$(document).ready(function() {

    // Pulls a page from a link when it's first opened
    var href_curr = window.location.hash;
    setBody(href_curr.substr(1).toUpperCase(), href_curr);   
    
    //Listen for clicks on navbar
    $("nav li>a").not("nav .nav>li:last-child").click(function(event) {
        var href_out = $(this).attr("href");
        var name = $(this).closest("a").text();
        
        // if a is not a link OR same link OR is inspecting dropdown, dont do anything
        if (!href_out || href_out == href_curr || $(this).hasClass("dropdown-toggle") ) { return; }
        
        setBody(name,href_out);
        $(this).parent().addClass("active");

        href_curr = href_out;
    });

});

