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
    
    var href = href;
    $.ajax({
        url: hrefToFile(href),
        dataType: "html",
//        type:'HEAD',
        error: function(){
            window.location = ".";
        },
        success:function(data) {
            $("#body").html(data);
            if($("#translation").text() == "中文") {
                $(".chinese").css("display", "none");
                $(".english").css("display", "block");
            } else {
                $(".chinese").css("display", "block");
                $(".english").css("display", "none");
            }
        }
    });
   // alert(hrefToFile(href));
//    $("#body").attr("w3-include-html", hrefToFile(href));
//    w3.includeHTML();
    //$("#body").load(hrefToFile(href));

    $("title").text("UIUC CSSA | "+ name.toUpperCase() );
}

/* 
** Used to append pictures to the correct div block, only used for divsion
*/
function fillDivision(divsion_name) {
    var data;
    var divsion_csv = "image/" + "division/" + divsion_name + "/" + divsion_name + ".csv";
    
    // load csv file and given to data variable
    $.ajax({
        url: divsion_csv,
        async: false,
        success: function(csv) {
            data = $.csv.toArrays(csv);
        },
        dataType: "text",
        complete: function() {
            
        }
    });
    
    var num_member = data.length;
    
    // append it to the division_part
    for (var i = 0; i < num_member; i++) {
        // each line has 3 thumbnail images
        // there definitely exist some other easy way to do it
        // but this one is more explicit, for example, we can use $.add() with jquery selector
        if(i % 3 == 0) {
            // build a new row
            var row_html = "<div class = \"row\"></div>"; 
            $("#division_part").append(row_html);
        }
        var img_name;
        if (data[i][1] == "present") {
            // get the name of image we want to show
            img_name = "image/division/"+divsion_name+"/"+data[i][0]+".jpg";
        } else {
            img_name = "image/division/blank.jpg";
        }
        
        // get the index of row we want to append the image to
        var target = "#division_part .row:nth-child(" + (parseInt(i/3) + 1) + ")";
        
        // get the thumbnail html source
        var img_html = "<div class=\"col-md-4\">" +
                       "<div class=\"thumbnail\">" +
                       "<a href=\"" + img_name + "\" target=\"_blank\">" +
                       "<img src=\"" + img_name + "\" alt=\"" + data[i][0] + "\">" +
                       "<h3 style=\"text-align:center\">" + data[i][0] + 
                       "</h3>" + 
                       "</a>" +
                       "</div>" +
                       "</div>";
        
        $(target).append(img_html);
    }
    
    //create division title for current division page
    $("#division_title").append("<h1></h1>");
    $("#division_title > h1").text(divsion_name);
    $("#division_title > h1").addClass("text-center");
    $("#division_title > h1").css("color", "#CC3300");
    
    //create division info for current division page
    var division_html = "division/" + divsion_name + ".html";
    $.ajax({
        url: division_html,
        dataType: "html",
        error: function() {
            
        },
        success: function(data) {
            $("#division_info").html(data);
        }
    })
}

/*
* jQuery function to manipulate the page when it's loaded
*/
$(document).ready(function() {
    
    
    // Pulls a page from a link when it's first opened
    var href_curr = window.location.hash;
    // this is for version button to prevent intentionally multiple clicking of switch language button
    var prev_version;
    setBody(href_curr.substr(1).toUpperCase(), href_curr);   
    
    //Listen for clicks on navbar
    $("nav li>a").not("nav .nav>li:last-child").click(function(event) {
        var href_out = $(this).attr("href");
        var name = $(this).closest("a").text();
        
        // check if the nav page is the one that needs a lot of thumbnail pictures->like division
        var check = (href_out.split("/"))[0];
        
        // if a is not a link OR same link OR is inspecting dropdown, dont do anything
        if (!href_out || href_out == href_curr || $(this).hasClass("dropdown-toggle")) { return; }
        
        // make sure the other content is clear, since there is some change in href
        $("#body").empty();
        $("#division_part").empty();
        $("#division_info").empty();
        $("#division_title").empty();
        $("nav li").removeClass("active");
        
        // divsion act a bit different than the other page
        if (check == "#division") {
            // find which department images should be loaded
            var branch = href_out.split("/")[1];
            fillDivision(branch);
            $("nav li:contains('division')").addClass("active");
//            $("#body").attr("w3-include-html", "");
//            w3.includeHTML();
            $("title").text("UIUC CSSA | "+ "divisions".toUpperCase() + " | " + branch);
            
        } else {
            setBody(name,href_out);
            $(this).parent().addClass("active");   
        }

        href_curr = href_out;
    });

});

$("#translation").click(function() {
    var currentVersion = $(this).text();
    if (currentVersion == "English") {
        $(this).text("中文");
    } else {
        $(this).text("English");
    }
    setBody("", window.location.hash);
})
