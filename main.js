;
(function($) {
    'use strict';
    var base;
    var video;
    $(document).ready(function() {
        base = new Base();
        video = new Video('.home-video-container video', '.home-video-play-button', true);
        var $header = $('header');
        base.$window.on('scroll', function() {
            if (base.$window.scrollTop() > 0) $header.addClass('fixed');
            else
                $header.removeClass('fixed');
        });
        $('.nav-toggle').on('click', function() {
            $(this).siblings('ul').slideToggle();
        });
        base.initScrollTo('.header-nav ul li a', 100);
        var $owlCabinet = $('.owl-cabinet'),
            $cabinetOwlThumbs = $('.cabinet-owl-thumb');
        $owlCabinet.owlCarousel({
            items: 1,
            loop: true,
            mouseDrag: false,
            pullDrag: false,
            dots: false
        }).on('changed.owl.carousel', function(e) {
            $cabinetOwlThumbs.eq(e.item.index - Math.ceil(e.item.count / 2)).addClass('active').siblings().removeClass('active');
        });
        $('.cabinet-owl-nav-prev').on('click', function() {
            $owlCabinet.trigger('prev.owl.carousel');
        });
        $('.cabinet-owl-nav-next').on('click', function() {
            $owlCabinet.trigger('next.owl.carousel');
        });
        $cabinetOwlThumbs.on('click', function() {
            $owlCabinet.trigger('to.owl.carousel', [$(this).data('index')]);
        });
        var $advicesOwl = $('.advices-owl'),
            $advicesActiveDot = $('<div class="advices-owl-dot-active"></div>'),
            $advicesPrev = $('.advices-owl-nav-prev'),
            $advicesNext = $('.advices-owl-nav-next');
        $advicesOwl.owlCarousel({
            items: 4,
            stagePadding: 1,
            margin: 20,
            responsive: {
                0: {
                    items: 1
                },
                500: {
                    items: 2,
                    margin: 10
                },
                900: {
                    items: 3,
                    margin: 15
                },
                1200: {
                    items: 4,
                    margin: 20
                }
            },
            onInitialized: function(e) {
                $advicesOwl.find('.owl-dot:first-child').prepend($advicesActiveDot);
                advicesNavToggle(e);
            },
            onResized: advicesNavToggle,
            onChanged: function(e) {
                $advicesActiveDot.css('left', (42 * (e.page.index < 0 ? 0 : e.page.index)));
            }
        });
        $advicesPrev.on('click', function() {
            $advicesOwl.trigger('prev.owl.carousel');
        });
        $advicesNext.on('click', function() {
            $advicesOwl.trigger('next.owl.carousel');
        });

        function advicesNavToggle(e) {
            if (e.item.count <= e.page.size) {
                $advicesPrev.css('display', 'none');
                $advicesNext.css('display', 'none');
            } else {
                $advicesPrev.css('display', 'block');
                $advicesNext.css('display', 'block');
            }
        }
        
    });
})(jQuery);