var RocketSlides = function(container) {
    var self = {
        currentStep: 0,
        container: container
    };
    
    var init = function() {
        self.steps = document.querySelectorAll('.step');
        container.style.height = (1 + self.steps.length) * 2000 + "px";
        for(var i=0, len = self.steps.length; i < len; i++) {
            self.steps[i].style.top = ((len-i) * 2000) + 'px';
        }
        if(document.location.hash) {
            scrollToStep(document.location.hash.slice(1));
        } else {
            document.querySelector('[data-step="0"]').scrollIntoView(true);
            //window.scrollTo(0, (self.steps.length * 2000));
        }
        
        document.getElementsByTagName('body')[0].addEventListener('keyup', function(e) {
            console.log(e.keyCode);
            if(e.keyCode == 39 || e.keyCode == 38) {
                scrollToStep(self.currentStep + 1);
            }
            else if(e.keyCode == 37 || e.keyCode == 40) {
                scrollToStep(self.currentStep - 1);
            }
        });
    };
            
    var scrollToStep = function(step) {
        if(self.currentStep >= 0) {
            var prevSlide = document.querySelector('[data-step="' + (self.currentStep) + '"]');
            if(prevSlide)
                prevSlide.className = "step";
        }
        
        if(isNaN(step)) {
            step = document.getElementById(step).getAttribute('data-step');
        }
        
        var forwardScroll = true;
        if(step < self.currentStep) forwardScroll = false;
        
        self.currentStep = step;
        var slide = document.querySelector('[data-step="' + step + '"]');
        slide.className += ' active';
          
        //window.scrollTo(0, (self.steps.length - step) * 2000);
        container.style.top = step * 2000 + 'px';
        if(forwardScroll) document.querySelector('[data-step="' + (step - 1) + '"]').scrollIntoView(true);
        else document.querySelector('[data-step="' + (step+1) + '"]').scrollIntoView(true);
        document.getElementById('indicator').style.top = (90 - (step * (100/self.steps.length)) + '%');
    }
            
    init();
    return self;    
};