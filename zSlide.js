//	zSlide: Lightweight jQuery Slideshow Plugin
//	MIT license http://www.opensource.org/licenses/mit-license.php/
//	@author Adam Stanford :: www.adamstanford.net

(function( $ ){

  var methods = {

	init : function( photos, options ) {
		
		var css = 'position:absolute;';
			css += 'top:0;';
			css += 'right:0;';
			css += 'bottom:0;';
			css += 'left:0;';
			css += 'width:100%;';
			css += 'height:100%;';
			css += 'background-position:center center;';
			css += 'background-repeat:no-repeat;';
			css += 'background-size:'+options.photoSize+';';
			css += 'opacity:0;';
			css += '-webkit-transition:opacity '+options.animationSpeed+'ms ease-in-out;';
			css += '-moz-transition:opacity '+options.animationSpeed+'ms ease-in-out;';
			css += '-ms-transition:opacity '+options.animationSpeed+'ms ease-in-out;';
			css += '-o-transition:opacity '+options.animationSpeed+'ms ease-in-out;';
			css += 'transition:opacity '+options.animationSpeed+'ms ease-in-out;';

	  this.append('<div id="zSlide_top_slide" style="' + css + 'z-index:2"></div>');

	  this.append('<div id="zSlide_bottom_slide" style="' + css + 'z-index:1"></div>');

		this.attr('data-zslide-interval', options.interval);
		this.attr('data-zslide-animationspeed', options.animationSpeed);

			$.fn.zSlide.slides[ this.attr('id') ] = photos;
			$.fn.zSlide.current[ this.attr('id') ] = -1;
			$.fn.zSlide.timer[ this.attr('id') ] = 0;

			var el = this;

			if(options.back !== null){
				
				options.back.click(function(){
					
					el.zSlide('back')
					
				});
				
			}

			if(options.next !== null){
				
				options.next.click(function(){
					
					el.zSlide('next')
					
				});
				
			}

			if(options.pause !== null){
				
				options.pause.click(function(){
					
					el.zSlide('pause')
					
				});
				
			}

			this.zSlide('play');

	},

	play : function() {

	  var el = this;

		if(($.fn.zSlide.current[ el.attr('id') ]+1) >= $.fn.zSlide.slides[ el.attr('id') ].length){

			$.fn.zSlide.current[ el.attr('id') ] = -1;

		}

	  $.fn.zSlide.current[ el.attr('id') ]++;

	  this.find('#zSlide_bottom_slide').css({'background-image':'url('+ $.fn.zSlide.slides[ el.attr('id') ][ $.fn.zSlide.current[ el.attr('id') ] ] +')'}).css({'opacity':'1'});
	  this.find('#zSlide_top_slide').css({'opacity':'0'});

		setTimeout(function(){
			el.find('#zSlide_top_slide').css({'background-image':'url('+ $.fn.zSlide.slides[ el.attr('id') ][ $.fn.zSlide.current[ el.attr('id') ] ] +')'}).css({'opacity':'1'});
		}, el.attr('data-zslide-animationspeed') );

		$.fn.zSlide.timer[ this.attr('id') ] = setTimeout(function(){ el.zSlide('play') }, el.attr('data-zslide-interval') );

			// TODO: Preload next image here
			$('<img/>').attr('src', $.fn.zSlide.slides[ el.attr('id') ][ $.fn.zSlide.current[ el.attr('id') ] + 1 ]);

	},
	pause : function() {
		
		clearTimeout($.fn.zSlide.timer[ this.attr('id') ]);

	},
	next : function() {
		
		clearTimeout($.fn.zSlide.timer[ this.attr('id') ]);
		
		this.zSlide('play');

	},
	back : function() {
		
		if(($.fn.zSlide.current[ this.attr('id') ]-1) == -1){
		  
			$.fn.zSlide.current[ this.attr('id') ] = $.fn.zSlide.slides[ this.attr('id') ].length;
		
		}
		
		clearTimeout($.fn.zSlide.timer[ this.attr('id') ]);
		$.fn.zSlide.current[ this.attr('id') ] =  $.fn.zSlide.current[ this.attr('id') ] - 2;
		this.zSlide('play');

	}
  };

  $.fn.zSlide = function( method, options ) {
	  
	  var settings = $.extend( {
	    'interval'			: 3000,
	    'animationSpeed'	: 250,
	    'photoSize'			: 'cover',
	    'next'				: null,
	    'back'				: null,
	    'pause'				: null
	  }, options);

	if ( methods[method] ) {
		
	  return methods[ method ].apply( this );
	  
	} else if ( typeof method === 'object' ) {
		
	  return methods.init.apply( this, [method,settings] );
	  
	} else {
		
	  $.error( 'Method ' +  method + ' does not exist in zSlide');
	  
	}    

  };
  
  $.fn.zSlide.slides = [];
  $.fn.zSlide.current = [];
  $.fn.zSlide.timer = [];

})( jQuery );