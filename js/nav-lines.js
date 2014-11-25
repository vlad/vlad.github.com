jQuery(document).ready(function($){
	"use strict";	
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      $('body').addClass('touch')
    }
	
	jQuery('#nav li').not('.touch #nav li').bind('mouseover', function() {
	  jQuery(this).find('.menu-line').stop().animate({
    "width": "100%"
  }, 150 );
	   });
	
	jQuery('#nav li').not('.touch #nav li').bind('mouseout', function() {
	  jQuery(this).find('.menu-line').stop().animate({
    "width": "0"
  }, 150 );
	   });
	
	

});