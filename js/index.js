$(document).ready(function() {
    AOS.init();
    gsap.registerPlugin(ScrollTrigger);

    /* header */
    var didscroll; 
    var lastScrollTop = 0;
    var delta = 1; 
    var navbarHeight = $('header').outerHeight();

    $(window).scroll(function(e) {
        didscroll = true;
    })

    setInterval(function() {
        if (didscroll) {
            hasScrolled()
            didscroll = false;
        }
    }, 400)

    function hasScrolled() {
        var st = $(this).scrollTop();

        if (Math.abs(lastScrollTop - st) <= delta)
        return;
    
        if (st > lastScrollTop && st > navbarHeight){
            $('header').removeClass('off').addClass('active');
        }else {
            if(st + $(window).height() < $(document).height()) { 
                $('header').removeClass('active').addClass('off');
            }
        }
        lastScrollTop = st;
    }

    /* nav */
    $menu = $('.depth1 > a');
    $subMenu = $('.sub-menu-list-wrap');

    $menu.on('mouseover', function() {
        $subMenu.addClass('active')
    })
    $menu.on('mouseleave', function() {
        $subMenu.removeClass('active')
    })

    window.addEventListener('scroll', function() {
        var leftList = document.getElementById('left-list');
        var rightList = document.getElementById('right-list');
        var bgCircle = document.getElementById('bg-circle');
        var scrollY = window.scrollY;
        //console.log(scrollY)
        if (scrollY > 720 && scrollY < 999) {
            leftList.style.transform = 'translateY(' + (-scrollY + 850) + 'px)';
            rightList.style.transform = 'translateY(' + (scrollY - 850) + 'px)';
        } else if (scrollY > 1600) {
            bgCircle.style.transform = 'scale(' + (scrollY/1600) + ',' + (scrollY/1600) + ')'
        } else {
            return false
        }

        //scrollTop 2460
        //scrollTop2 3263
        //scrollTop3 4066
    });

    console.clear();

    gsap.defaults({overwrite: 'auto'});

    
    
    // Set up our scroll trigger
    const ST = ScrollTrigger.create({
      trigger: ".content-container",
      start: "top top",
      end: "bottom bottom",
      onUpdate: getCurrentSection,
      pin: ".right-content"
    });
    
    const contentMarkers = gsap.utils.toArray(".contentMarker");
    
    // Set up our content behaviors
    contentMarkers.forEach(marker => {
      marker.content = document.querySelector(`#${marker.dataset.markerContent}`);
      
      if(marker.content.tagName === "IMG") {
        gsap.set(marker.content, {transformOrigin: "center"});
        
        marker.content.enter = function() {
            gsap.fromTo(marker.content, {autoAlpha: 0, rotateY: 0}, {duration: 0.4, autoAlpha: 1, rotateY: 0});
        }
      } else {
        gsap.set(marker.content, {transformOrigin: "center"});
        
        marker.content.enter = function() {
          gsap.fromTo(marker.content, {autoAlpha: 0, rotateY: 0}, {duration: 0.4, autoAlpha: 1, rotateY: 0, opacity: 0});
        }
      }
      
      marker.content.leave = function() {
        gsap.to(marker.content, {duration: 0.4, autoAlpha: 0});
      }
      
    });
    
    // Handle the updated position
    let lastContent;
    function getCurrentSection() {
      let newContent;
      const currScroll = scrollY;
      
      // Find the current section
      contentMarkers.forEach(marker => {
        if(currScroll > marker.offsetTop) {
          newContent = marker.content;
        }
      });
      
      // If the current section is different than that last, animate in
      if(newContent
      && (lastContent == null 
         || !newContent.isSameNode(lastContent))) {
        // Fade out last section
        if(lastContent) {
          lastContent.leave();
        }
        
        // Animate in new section
        newContent.enter();
        
        lastContent = newContent;
      }
      
    }
    
    const media = window.matchMedia("screen and (max-width: 600px)");
    ScrollTrigger.addEventListener("refreshInit", checkSTState);
    checkSTState();
    
    function checkSTState() {
      if(media.matches) {
        ST.disable();
      } else {
        ST.enable();
      }
    }
    
})
