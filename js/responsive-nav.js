jQuery(document).ready(function(){
								
"use strict";

$.fn.slideFadeToggle  = function(speed, easing, callback) {
        return this.animate({opacity: 'toggle', height: 'toggle'}, speed, easing, callback);
};


	jQuery('#nav-button').click(function() {
			jQuery('#nav').slideFadeToggle();
	});
	
	
	
});	
	
	
	

	