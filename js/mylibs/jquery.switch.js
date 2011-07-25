//Run in self contained mode so we don't crunch anyone
(function(){
    if(typeof jQuery !== 'undefined') {
        (function($){
            var head, initialized;
            head = document.getElementsByTagName('head')[0];
            initialized = false;
            
            $.fn.slideSwitch = function(options){
                var settings = $.extend({}, $.fn.slideSwitch.defaults, options);
                if(!initialized){
                    var style = document.createElement('style');
                        style.type = 'text/css';
                        
                    if(typeof style.styleSheet !== 'undefined'){
                        style.styleSheet.csstext = settings.csstext.nodeValue;
                    } else {
                        style.appendChild(settings.csstext);
                    }
                    head.appendChild(style);
                    initialized = true;
                }
            
                return this.each(function(){
                    var self, sibling, group, slideswitch, knob, knoblabels, label, switchouterlabel;
                    self = $(this);
                    group = self.attr('name');
                    sibling = $('[name='+group+']').last();
                    label = $('label[for='+group+']');
                    
                    self.hide()
                    sibling.hide();
                    label.hide();
                                        
                    slideswitch = $(settings.template);
                    switchouterlabel = $('<label></label>').addClass('switch-outer-label').text(label.text());
                    switchouterlabel.prependTo(slideswitch);

                    knoblabels = $('.switch-labels>div', slideswitch).each(function(index){
                        if(index === 0) $(this).text(self.attr('rel'));
                        else $(this).text(sibling.attr('rel'));
                    });
                    knob = $('.switch-knob', slideswitch);
                    slideswitch.bind('click', function(){
                        knob.toggleClass('on');
                        knoblabels.removeClass('on');
                        if(knob.hasClass('on')) {
                            knoblabels.eq(1).addClass('on');
                            sibling[0].checked = true;
                            self[0].checked = false;
                        }else{
                            knoblabels.eq(0).addClass('on');
                            sibling[0].checked = false;
                            self[0].checked = true;
                        }
                    });
                    
                    slideswitch.insertAfter(sibling);
                    
                    if(self.attr('checked')) {
                        knob.addClass('on');
                        slideswitch.trigger('click');
                    }else if(sibling.attr('checked')) {
                        knob.removeClass('on');
                        slideswitch.trigger('click');                      
                    }
                });
            };
            $.fn.slideSwitch.defaults = {
                template:'<div class="slide-switch-wrap"><div class="slide-switch"><div class="switch-knob"></div><div class="switch-labels"><div></div><div></div></div></div></div>',
                csstext:document.createTextNode('@import url(css/jquery.switch.css);')
            };
        })(jQuery);//Pass the jQuery object just incase we're running with other $ libs
    }
})(); //Self invoke