'use strict';

$(document).ready(function() {

  var navSearchVisible = false;
  var animationTime = 100;

  var closeNav = function() {
    $('.nav-search-bar').slideUp(animationTime, function() {
      navSearchVisible = false;
      if (window.pageYOffset === 0) {
        $('.nav-sticky').removeClass('nav-fade');
      }
    });
  };

  var openNav = function() {
    if (window.pageYOffset === 0) {
      $('.nav-sticky').addClass('nav-fade');
    }
    $('.nav-search-bar').slideDown(animationTime, function() {
      navSearchVisible = true;
    });
  };

  var fadeNav = function() {

    if (!$('.nav-sticky').hasClass('nav-fade') && window.pageYOffset > 0) {
      $('.nav-sticky').addClass('nav-fade');
    } else if ($('.nav-sticky').hasClass('nav-fade') && window.pageYOffset === 0 && !navSearchVisible) {
      $('.nav-sticky').removeClass('nav-fade');
    }
  };

  $(document).on('click', '.nav-search', function() {
    if (!navSearchVisible) {
        ga('send', 'event', 'navigation', 'search', 'open', {'nonInteraction' : 1});
      openNav();
    } else {
        ga('send', 'event', 'navigation', 'search', 'close', {'nonInteraction' : 1});
      closeNav();
    }
  });

  $(document).on('click', '.nav-search-close', function(event) {
    event.stopPropagation();
    closeNav();
  });

  $(window).on('scroll', fadeNav);
  $(window).on('touchmove', fadeNav);

  if (window.location.pathname.search('/must-reads') !== -1) {
    $('.nav-link[href*="/must-reads"]').addClass('selected');
  }

});
