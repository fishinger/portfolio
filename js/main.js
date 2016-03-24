// $(document).ready(function(){
// 	/*--fancybox--*/
// 	// $(".open-popup").fancybox({
//  //    	openEffect	: 'elastic',
//  //    	closeEffect	: 'elastic',
//  //    	scrolling: 'visible',
//  //    	padding: 0,
//  //    	width: 640,
//  //    	helpers : {
//  //    		title : {
//  //    			type : 'inside'
//  //    		}
//  //    	}
//  //    });
//     /*--end-fancybox--*/
// })

// var mas = [];
// for(var i = 0; i < 5; i++){
// 	(function(){
// 		var index = i;
// 		mas.push(function(){
// 			console.log(index)
// 		})
// 	}())
// }
// for(var i = 0; i < 5; i++){
// 	mas[i]();
// }
// $(document).ready(function() {
//     $('#fullpage').fullpage();
// });
$(document).ready(function() {
    $(document).on('scroll', function(){
    	var scrollPos = $(window).scrollTop(),
    		nav = $('.nav');
    	if(scrollPos > 0){
    		nav.addClass('active');
    	} else {
    		nav.removeClass('active');
    	}
    });
    
    
});