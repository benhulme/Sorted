dataLayer = [];
var quote = window.location.hash;

function forceResize(){
  $(window).resize();
}

$(document).ready(function()
{
  if(quote.length > 0) {
    setTimeout(scrQuote, 1000); // Scroll to Quote
    setTimeout(expQuote, 1500); // Expand Quote
  }
  setTimeout(forceResize, 2000); // Force resize

  var $videoContainer = $('#header_videoContent');
  var $videoPlaceHolder = $('#header_videoAction');

  var _tempHTML;

  // console.log(window.videoEmbed);

  var _isMobile = false;

  var constants = {
    MOBILE_MAX_X : 768
  };

  function onPlayerReady()
  {
    // console.log('On YouTube onPlayerReady');
  }

  function onPlayerStateChange(ev)
  {
    // console.log('On YouTube onPlayerStateChange');
    // console.log(ev.data);

    switch(ev.data)
    {
      case 0 : // ended
        $videoContainer.html(_tempHTML);
        $('#header_videoAction').on('click', onHeaderVideoPlay_clickHandler);
        break;

      case 1 : // playing

          break;

      case 2 : // paused

        break;
    }
  }

  function onHeaderVideoPlay_clickHandler(ev)
  {
    ev.preventDefault();

    _tempHTML = $videoContainer.html();
    $videoContainer.html(window.videoEmbed);

    if($('#ytplayer').length)
    {
      // The player exists
    } else {
      $videoContainer.find('iframe').first().attr('id','ytplayer');
    }

    var $iframe = $('#ytplayer');

    var player = new YT.Player('ytplayer', {
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }

  var onBackToTop_clickHandler = function(ev)
  {
    ev.preventDefault();

    TweenMax.to($(window), 1, {scrollTo: 0, ease: Expo.easeInOut});
  }

  $('.back-to-top').each(function(obj, i)
  {
    $(this).on('click', onBackToTop_clickHandler);
  });

  /* Accordian Controls Start */
  /* Scroll to quote */
  function scrQuote() {
    var scrOffset = 0;
    if($(window).width() <= constants.MOBILE_MAX_X)
      scrOffset = 78;
    else
      scrOffset = 54;
    var movePos = $(quote).offset().top - scrOffset;
    $(document).scrollTop(movePos);
    //TweenMax.to(window, 2, {scrollTo:{y:quote, offsetY:54}}); // add space for nav
  }
  /* Expand quote section */
  function expQuote() {
    var parent = quote;
    var selector = $(parent).children('.accordian-item-head');
    triggerQuoteExpand(selector);
  }
  /* Extracted from onclick for implementation with page load */
  function triggerQuoteExpand(selector) {
    if($(selector).parent().hasClass('accordian-collapse')) {
      $(selector).parent().removeClass('accordian-collapse');
      $(selector).find('.collapse-item').addClass('set-open');
      var label = $(selector).attr('ref').substring(1, $(selector).attr('ref').length-1);
      dataLayer.push({'event': 'open_card', 'category': 'view', 'action': 'card', 'label':label});
      //console.log('data', dataLayer);
    } else {
      $(selector).parent().addClass('accordian-collapse');
      $(selector).find('.collapse-item').removeClass('set-open');
    }
  }
  /* Accordian event handler */
  $('.accordian-item-head').each(function(obj, i)
  {
    $(this).on('click', function(ev)
    {
      ev.preventDefault();
      triggerQuoteExpand($(this));
    });
  });

  /* Accordian Controls End */

  $('.accordian-item-body').each(function(i, obj)
  {
    var index = i;

    $(this).find('.collapse-item').each(function(i, obj)
    {
      $(this).on('click', function(ev) {
        ev.preventDefault();

        var $item = $('.accordian-item').eq(index);
        var $body = $('.accordian-item-body').eq(index);
        var $head = $('.accordian-item-head').eq(index);

        if($item.hasClass('accordian-collapse')) {
          $item.removeClass('accordian-collapse');
          $head.find('.collapse-item').addClass('set-open');

        } else {
          $item.addClass('accordian-collapse');
          $head.find('.collapse-item').removeClass('set-open');
        }

      });
    });
  });

  var onLoadMore_clickHandler = function(ev)
  {
    ev.preventDefault();

    var $btn = $(this);
    var $panel = $('#'+$btn.data('panel'));

    if($panel.length) {
      $btn.find('.more').addClass('hidden');
      $btn.find('.less').addClass('hidden');

      if($panel.hasClass('is-masked')) {
        $panel.removeClass('is-masked');
        $panel.attr('style', '');
        $btn.find('.less').removeClass('hidden');

      } else {
        $panel.addClass('is-masked');
        maskCollapsableItems();
        $btn.find('.more').removeClass('hidden');

      }
    }

  }

  var initMaskCollapsableItems = function() {

    $('.load-more').each(function(i, obj)
    {
      $(this).on('click', onLoadMore_clickHandler);
    })

    maskCollapsableItems();
  }

  var maskCollapsableItems = function()
  {
    $('.masked-resources').each(function(i, obj)
    {
      var $firstChild = $(this).children().first();
      if($(this).hasClass('is-masked')) {

        var offset = 1;

        if($(this).hasClass('involved-companies')) {
          if(_isMobile) {
            offset = 5;
          } else {
            offset = 3;
          }
        }

        if($(this).hasClass('resource-items')) {
          if(_isMobile) {
            offset = 3;
          } else {
            offset = 2;
          }
        }

        $(this).css('max-height', parseInt($firstChild.height()*offset).toString()+'px');
      }
    });
  }

  var onWindow_resizeHandler = function(ev)
  {
    _isMobile = ($(window).width() <= constants.MOBILE_MAX_X);


    maskCollapsableItems();
  }

  $(window).on('resize', onWindow_resizeHandler);
  initMaskCollapsableItems();

  $('.main').addClass('fadeIn');

  if((window.videoEmbed != undefined) && (window.videoEmbed.length > 0)) {
    $videoContainer.removeClass('no-video');

    $('#header_videoAction').on('click', onHeaderVideoPlay_clickHandler);
  }

  $(window).on('resize', onWindow_resizeHandler);
  $(window).on('orientationchange', onWindow_resizeHandler);
});


function onYouTubeIframeAPIReady() {
  console.log('onYouTubeIframeAPIReady');
}
