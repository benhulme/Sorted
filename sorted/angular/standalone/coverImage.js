'use strict';

$(document).ready(function() {

    var coverImages = $('[cover-image]');
    coverImages.addClass('cover-image');

    coverImages.each(function() {
        var imgSrc = $(this).attr('cover-image');
        
        if (imgSrc) {

            $(this).css({
                backgroundImage: 'url(' + imgSrc + ')',
            });

        }

    });

});
