$(document).ready(function() {
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


      gsap.registerPlugin(ScrollTrigger);

      let allowScroll = true;
      let scrollTimeout = gsap.delayedCall(1, () => allowScroll = true).pause();
      let currentIndex = 0;
      let swipePanels = gsap.utils.toArray(".swipe-section .panel");
      
      // set z-index levels for the swipe panels
      gsap.set(swipePanels, { zIndex: i => swipePanels.length - i})
      
      // create an observer and disable it to start
      let intentObserver = ScrollTrigger.observe({
        type: "wheel,touch",
        onUp: () => allowScroll && gotoPanel(currentIndex - 1, false),
        onDown: () => allowScroll && gotoPanel(currentIndex + 1, true),
        tolerance: 10,
        preventDefault: true,
        onEnable(self) {
          allowScroll = false;
          scrollTimeout.restart(true);
          let savedScroll = self.scrollY();
          self._restoreScroll = () => self.scrollY(savedScroll); 
          document.addEventListener("scroll", self._restoreScroll, {passive: false});
        },
        onDisable: self => document.removeEventListener("scroll", self._restoreScroll)
      });
      intentObserver.disable();
      
      // handle the panel swipe animations
      function gotoPanel(index, isScrollingDown) {
        // return to normal scroll if we're at the end or back up to the start
        if ((index === swipePanels.length && isScrollingDown) || (index === -1 && !isScrollingDown)) {
          intentObserver.disable(); // resume native scroll
          return;
        }
        allowScroll = false;
        scrollTimeout.restart(true);
      
        let target = isScrollingDown ? swipePanels[currentIndex] : swipePanels[index];
        gsap.to(target, {
          yPercent: isScrollingDown ? -100 : 0,
          duration: 0.75
        });
      
        currentIndex = index;
      }
      
      // pin swipe section and initiate observer
      ScrollTrigger.create({
        trigger: ".swipe-section",
        pin: true,
        start: "top top",
        end: "+=200", 
        onEnter: (self) => {
          if (intentObserver.isEnabled) { return } 
          self.scroll(self.start + 1); 
          intentObserver.enable(); // STOP native scrolling
        },
        onEnterBack: (self) => {
          if (intentObserver.isEnabled) { return }
          self.scroll(self.end - 1); 
          intentObserver.enable(); // STOP native scrolling
        }
      });

})