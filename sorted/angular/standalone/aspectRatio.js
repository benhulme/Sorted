'use strict';

$(document).ready(function() {

  var resize = function() {

    var contentWidth = $(this).width();

    var ratios = $(this).attr('aspect-ratio').split(':');

    if (ratios.length !== 2) {
      return false;
    }

    var ratioX = parseInt(ratios[0]);
    var ratioY = parseInt(ratios[1]);

    if (isNaN(ratioX) || isNaN(ratioY)) {
      return false;
    }

    if (ratioX <= 0 || ratioY <= 0) {
      return false;
    }

    var newHeight = (contentWidth / ratioX) * ratioY;

    $(this).css({
      height: newHeight + 'px',
    });

    return newHeight;

  };

  var aspectRatios = $('[aspect-ratio]');
  aspectRatios.each(resize);

  $(window).on('resize', function() {
    aspectRatios = $('[aspect-ratio]');
    aspectRatios.each(resize);
  });

});
