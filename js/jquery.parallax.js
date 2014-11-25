$(document).ready(function(){
	
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      $('body').addClass('touch')
    }
	
	$window = $(window);
                
   $('section[data-type="background"]').each(function(){
     var $bgobj = $(this); 
                    
      $(window).scroll(function() {
                    
		
										
		var yPos = -($window.scrollTop() / $bgobj.data('speed')); 
		
		
		var coords = '50% '+ yPos + 'px';

		
		$bgobj.css({ backgroundPosition: coords });
		
}); 

 });	

}); 