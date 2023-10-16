$(document).ready(function() {
    AOS.init();
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

    var swiper = new Swiper(".htSwiper", {
        slidesPerView: 3,
        spaceBetween: 30,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
})