'use strict';

$(document).ready(function() {

  var align = function() {

    var vertClass = $(this).attr('vert-middle');

    if ($(this).attr('vert-disable-below') && $(window).innerWidth <= $(this).attr('vert-disable-below')) {
      $(this).find('.' + vertClass).css({
        marginTop: '0',
        marginBottom: '0',
      });
      return false;
    }

    var contentHeight = $(this).find('.' + vertClass).height();

    var containerHeight = $(this).height();
    if ($(this).attr('vert-middle-relative')) {
      containerHeight = $(this).find('.' + $(this).attr('vert-middle-relative')).height();
    }

    var margin = (containerHeight - contentHeight) / 2;

    $(this).find('.' + vertClass).css({
      marginTop: margin + 'px',
      marginBottom: margin + 'px',
    });

    return margin;

  };

  var itemsToAlign = $('[vert-middle]');
  itemsToAlign.each(align);

  $(window).on('resize', function() {
    itemsToAlign = $('[vert-middle]');
    itemsToAlign.each(align);
  });

});
