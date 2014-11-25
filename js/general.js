
// Add the basic String function trim for all browsers with an outdated ECMAScript implementation
if(typeof String.prototype.trim !== 'function') {
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, '');
  }
}
// Add the isNumeric function for older versions of jQuery that do not have it
if(typeof(jQuery.isNumeric) !== 'function'){
    jQuery.isNumeric = function(obj){ return !isNaN(parseFloat(obj)) && isFinite(obj); };
}

var Main = Main || {};

function HeadlineHandler(){
    var self = this,
        container = jQuery('#headline_cycler'),
        clone = container.clone( false );

    this.init = function (){
      var slides = container.find('.slide');
      var max_s_h = 0;
      slides.each(function(){
        jQuery(this).css({'height': 'auto'});
        var s_h = jQuery(this).outerHeight();
        max_s_h = (s_h > max_s_h) ? s_h : max_s_h;
      });
      slides.each(function(){
        jQuery(this).css({'height': max_s_h+'px'});
      });
      var $ = jQuery;
      container.flexslider({
        selector: '.flexslider > .slide',
        animation: 'slide',
          controlNav: false,
          directionNav: false,
          animationLoop: true,
          slideshow: true,
          slideshowSpeed: 4000,
          direction: 'vertical',
          itemMargin: 0,
          move: 1,
          minItems: 1,
          maxItems: 1
      });
    }
    this.update = function () {
      container.replaceWith(clone);
      container = clone;
      clone = container.clone( false );
      this.init();
    }

    this.init();
}


// Outer Code Wrapper for jQuery, prevents polluting the window object while still keeping it accessible.
;(function($, window, document, undefined) {
  "use strict";
  var $window   = $(window),
      $document = $(document),
      $body     = $('body');

  /**
   * jQuery displayWidth - A simple Media Query check
   * @param  {string} comparison   Comparison condition. Possible values: Either one these: '>', '<', '>=', '<=' or a full, complex Media Query. The latter is risky because it will fail without a fallback in browsers that do not support the matchMedia function.
   * @param  {int+} width          Display width (in pixels)
   *
   * @author Stefan Winkler
   */
  window.displayWidth = function(comparison, value){
    if(typeof window.matchMedia == 'function' && window.matchMedia!=undefined && window.matchMedia('screen and (max-width: 767px)')!=null){
        if(jQuery.isNumeric(value)){
            value = Number(value);
            if(comparison == '>='){
                comparison = 'min-width';
            }else if(comparison == '<='){
                comparison = 'max-width';
            }else if(comparison == '>'){
                comparison = 'min-width';
                value++;
            }else if(comparison == '<'){
                comparison = 'max-width';
                value--;
            }
            return window.matchMedia('('+comparison+':'+value+'px)').matches;
        }else{
            return window.matchMedia(value).matches;
        }
    }else{
        if(!jQuery.isNumeric(value)){
            if(typeof(console) !== 'undefined'){
        console.log("Error: This Browser doesn't support media queries.");
      }
            return false;
        }
        if(typeof(window.current_screen_width)==='undefined'){
            window.current_screen_width = jQuery(window).outerWidth();
        }
        if(comparison == '>='){
            return window.current_screen_width >= value;
        }else if(comparison == '<='){
            return window.current_screen_width <= value;
        }else if(comparison == '>'){
            return window.current_screen_width > value;
        }else if(comparison == '<'){
            return window.current_screen_width < value;
        }
    }
  };

  /**
   * @param  {function} func      the code to be executed
   * @param  {int+} threshold     delay after trigger event (in milliseconds)
   * @param  {boolean} execAsap   forces to execute the code as soon as possible
   * @return {void}
   *
   * @author Paul Irish
   * @see http://www.paulirish.com/2009/throttled-smartresize-jquery-event-handler/
   */
  var debounce = function (func, threshold, execAsap) {
    var timeout;

    return function () {
      var obj = this, args = arguments;
      function delayed () {
        if (!execAsap)
          func.apply(obj, args);
        timeout = null;
      }

      if (timeout)
        clearTimeout(timeout);
      else if (execAsap)
        func.apply(obj, args);

      timeout = setTimeout(delayed, threshold || 100);
    };
  };

  /**
   * jQuery debounceEvent function
   * @param  {string} event       The event to be bound
   * @param  {int+} threshold     Delay after trigger event (in milliseconds)
   * @param  {boolean} execAsap   Forces to execute the code as soon as possible
   *
   * @author Paul Irish
   * @see http://www.paulirish.com/2009/throttled-smartresize-jquery-event-handler/
   */
  $.fn.debounceEvent = function(event, func, threshold, execAsap){
    return func ? this.bind(event, debounce(func, threshold, execAsap)) : this.trigger(event);
  };

  var resizeHandler = function(){
    if(Main.headlineHandler && typeof(Main.headlineHandler.update)==='function'){
      Main.headlineHandler.update();
    }
  };

  $window.load(function(){
    if($('#headline_cycler').length){
      //Main.headlineHandler = new HeadlineHandler();
    }
  });

  $document.ready(function(){
    if(navigator.appVersion.indexOf("Mac")!=-1){
      $('html').addClass('MacOS');
    }else if(navigator.userAgent.toLowerCase().indexOf("android") > -1){
      $('html').addClass('Android');
    }

    $('.service_item').on('click touchend', function(e){
      var $this  = $(this);
      var $popup = $this.children('.service_details').first();
      $this.toggleClass('open').siblings().removeClass('open');
      $popup.css({'margin-left': (-1*(Math.round($popup.outerWidth()/2)))+'px'});
    }).hover(function(e){
      var $this  = $(this);
      var $popup = $this.children('.service_details').first();
      $this.addClass('hover').siblings().removeClass('hover');
      $popup.css({'margin-left': (-1*(Math.round($popup.outerWidth()/2)))+'px'});
    }, function(e){
      $(this).removeClass('hover');
    });

    $('.gallery_item').on('touchend', function(e){
      var $this = $(this);
      if(!$this.hasClass('active')){
        e.preventDefault();
        $this.siblings().removeClass('active');
        $this.addClass('active')
      }
    });

    //$('#quotes_slider_container').flexslider({
    //  selector: '.flexslider > .quote_slide',
    //  animation: 'slide',
    //  controlNav: false,
    //  directionNav: true,
    //  animationLoop: true,
    //  slideshow: false,
    //  slideshowSpeed: 6000,
    //  direction: 'horizontal',
    //  itemMargin: 0,
    //  move: 1,
    //  minItems: 1,
    //  maxItems: 1
    //});

    $('.load_more_btn').click(function(e){
      e.preventDefault();
      var url = $(this).attr('data-ajax-url');
      var $temp = $('<div class="temp_loader hidden"></div>');
      var $container = $(this).parent('.centralizer').siblings('.full_width_gallery').first();
      var displayed = $container.children('.gallery_item').length;
      var amount = 4;
      var ajax_container_id = '#content';
      if(displayWidth("(min-width: 768px) and (max-width: 999px)")){
        amount = 2;
      }else if(displayWidth('<=',767)){
        amount = 1;
      }
      $temp.appendTo($container);
      $temp.load(url+' '+ajax_container_id, {'amount_to_load': amount, 'displayed_items': displayed}, function(response, status, xhr){
        var $loaderContent = $temp.find(ajax_container_id+' > *');
        if($loaderContent.length){
          var last_batch = ($temp.find('.last_item').length > 0);
          $loaderContent.appendTo($container);
          $temp.remove();
          if(last_batch){
            $('.load_more_btn').fadeOut(400);
          }
        }else{
          $('.load_more_btn').fadeOut(400);
        }
      });
    });

    $('.unfocused').blur(function(){
      $(this).removeClass('unfocused');
    });

    $body.on('click touchstart',function(e){
      var $t = $(e.target);
      if($('#nav-button').is(':visible') && $('#nav').is(':visible')){
        if(!$t.is('#nav-button') && !$t.closest('#nav-button').length && !$t.closest('#nav').length){
          e.preventDefault();
          $('#nav-button').click();
        }
      }
      if(!$t.is('.service_item') && !$t.closest('.service_item').length){
        $('.service_item').removeClass('open').removeClass('hover');
      }
    });

    $window.debounceEvent('resize', resizeHandler, 120);


  });
})(jQuery, window, document);
