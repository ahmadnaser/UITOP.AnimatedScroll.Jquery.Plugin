/*
|--------------------------------------------------------------------------
| UItoTop jQuery Plugin 1.2 by Matt Varone
| http://www.mattvarone.com/web-design/uitotop-jquery-plugin/
|--------------------------------------------------------------------------
*/
(function($){
	$.fn.UItoTop = function(options) {

 		var defaults = {
    			text: 'To Top',
    			min: 200,
    			inDelay:600,
    			outDelay:400,
      			containerID: 'toTop',
    			containerHoverID: 'toTopHover',
    			scrollSpeed: 1200,
    			easingType: 'linear'
 		    },
            settings = $.extend(defaults, options),
            containerIDhash = '#' + settings.containerID,
            containerHoverIDHash = '#'+settings.containerHoverID;
		
		$('body').append('<a href="#" id="'+settings.containerID+'">'+settings.text+'</a>');
		$(containerIDhash).hide().on('click.UItoTop',function(){
			$('html, body').animate({scrollTop:0}, settings.scrollSpeed, settings.easingType);
			$('#'+settings.containerHoverID, this).stop().animate({'opacity': 0 }, settings.inDelay, settings.easingType);
			return false;
		})
		.prepend('<span id="'+settings.containerHoverID+'"></span>')
		.hover(function() {
				$(containerHoverIDHash, this).stop().animate({
					'opacity': 1
				}, 600, 'linear');
			}, function() { 
				$(containerHoverIDHash, this).stop().animate({
					'opacity': 0
				}, 700, 'linear');
			});
					
		$(window).scroll(function() {
			var sd = $(window).scrollTop();
			if(typeof document.body.style.maxHeight === "undefined") {
				$(containerIDhash).css({
					'position': 'absolute',
					'top': sd + $(window).height() - 50
				});
			}
			if ( sd > settings.min ) 
				$(containerIDhash).fadeIn(settings.inDelay);
			else 
				$(containerIDhash).fadeOut(settings.Outdelay);
		});
};
})(jQuery);


/**
* AnimatedScroll.js - Developer version
* Smooth, animated document scroll to a specific element, supporting native jQuery UI easings.
* https://github.com/yevhentiurin/animatedscrolljs
*
* By Yevhen Tiurin <yevhentiurin@gmail.com>, Mikhail Semakhin <mike.semakhin@gmail.com>, Carlo Alberto Ferraris <cafxx@cafxx.strayorange.com>
* Licensed under the LGPL Version 3 license.
* http://www.gnu.org/licenses/lgpl.txt
*
**/

(function($) 
{
  //***************************
  $.animatedScroll = 
  {
    animateOptions: {},
    offsetFromTarget: 
    {
      left: "50%",
      top: "50%"
    }
  };

  //***************************
  $.fn.animatedScroll = function(animateOptions, offsetFromTarget) 
  {
    animateOptions = $.extend({}, $.animatedScroll.animateOptions, animateOptions);
    offsetFromTarget = $.extend({}, $.animatedScroll.offsetFromTarget, offsetFromTarget);

    AnimatedScroll(this.get(0), animateOptions, offsetFromTarget);

    return this;
  };

  //***************************
  function AnimatedScroll(element, animateOptions, offsetFromTarget)
  {
    var $element,
      viewportWidth, viewportHeight, targetWidth, targetHeight, 
      documentWidth, documentHeight, targetLeft, targetTop,
      animateLeft, animateTop, offsetLeft, offsetTop,
      animateStep, animateComplete,
      $viewportDetectElement;

    $viewportDetectElement = $('<div style="visibility:hidden;position:fixed;width:100%;height:100%" />').appendTo(document.body);
    viewportWidth = $viewportDetectElement.width();
    viewportHeight = $viewportDetectElement.height();
    $viewportDetectElement.remove();
    
    targetWidth = $(element).outerWidth();
    targetHeight = $(element).outerHeight();
    documentWidth = $(document).width();
    documentHeight = $(document).height();
    targetLeft = $(element).offset().left;
    targetTop = $(element).offset().top;

    function parseOffsetValue(targetValue, offsetValue)
    {
      var parsedOffsetValue = parseInt(offsetValue);

      if (isNaN(parsedOffsetValue))
        return 0;

      if (offsetValue.indexOf !== undefined)
      {
          if (offsetValue.indexOf("%") > -1)
          {
            return (targetValue * parsedOffsetValue / 100);
          }
      };

      return parsedOffsetValue; 
    };

    offsetLeft = parseOffsetValue(targetWidth, offsetFromTarget.left);
    offsetTop = parseOffsetValue(targetHeight, offsetFromTarget.top);
    
    animateLeft = targetLeft + offsetLeft - (viewportWidth / 2);
    animateLeft = animateLeft < 0 ? 0 : (animateLeft + viewportWidth > documentWidth ? documentWidth - viewportWidth : animateLeft);
    animateTop = targetTop + offsetTop - (viewportHeight / 2);
    animateTop = animateTop < 0 ? 0 : (animateTop + viewportHeight > documentHeight ? documentHeight - viewportHeight : animateTop);

    animateStep = animateOptions.step;
    animateComplete = animateOptions.complete;

    animateOptions = $.extend({}, animateOptions, 
      {
        step: function(now, tween)
        {
          tween.elem.scrollIntoView(true);
          
          if (typeof animateStep == "function")
          {
            animateStep.apply(this, arguments);
          };
        },
        complete: function()
        {
          this.scrollIntoView(true);
          $(this).remove();

          if (typeof animateComplete == "function")
          {
            animateComplete.apply(element, arguments);
          };
        }
      }
    );

    $("<div/>")
      .css(
        {
          visibility: 'hidden',
          position: "absolute", 
          width: viewportWidth, 
          height: viewportHeight, 
          left: $(window).scrollLeft(),
          top: $(window).scrollTop()
        }
      )
      .appendTo(document.body)
      .animate({left: animateLeft, top: animateTop}, animateOptions);
  };

})(jQuery);
