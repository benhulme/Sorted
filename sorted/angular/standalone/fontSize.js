'use strict';

$(document).ready(function() {

    var fontSize = parseInt($('#blog-post-content p').css('font-size'), 10);
    var lineHeight = parseInt($('#blog-post-content p').css('line-height'), 10);
    var foot = 3;

    $('.font-decrease').click(function () {
        
        if(fontSize > 18) {
            fontSize -= foot;
            lineHeight -= foot;
            $('#blog-post-content p').css("font-size", fontSize + "px");
            $('#blog-post-content p').css("line-height", lineHeight + "px");
        }

    });

    $('.font-increase').click(function () {

        if(fontSize < 25) {
            fontSize += foot;
            lineHeight += foot;
            $('#blog-post-content p').css("font-size", fontSize + "px");
            $('#blog-post-content p').css("line-height", lineHeight + "px");
        }

    });

});
