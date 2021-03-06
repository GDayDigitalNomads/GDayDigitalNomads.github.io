;(function () {
    "use strict";
    
    var $window, $document, $body;

    $window = $(window);
    $document = $(document);
    $body = $("body");

    
    /*==============================================
     Pre loader init
     ===============================================*/
    $window.on("load", function () {
        $body.imagesLoaded(function () {
            $(".tb-preloader-wave").fadeOut();
            $("#tb-preloader").delay(200).fadeOut("slow").remove();
        });
    });

    /*==============================================
     Wow init
     ===============================================*/
    if (typeof WOW == "function")
        new WOW().init();


    $document.ready(function () {

        /*==============================================
         Retina support added
         ===============================================*/
        if (window.devicePixelRatio > 1) {
            $(".retina").imagesLoaded(function () {
                $(".retina").each(function () {
                    var src = $(this).attr("src").replace(".", "@2x.");
                    var h = $(this).height();
                    $(this).attr("src", src).css({height: h, width: "auto"});
                });
            });
        }


        /*==============================================
         Smooth scroll init
         ===============================================*/
        if (typeof smoothScroll == "object") {
            smoothScroll.init();
        }
   
        /*==============================================
         Menuzord init
         ===============================================*/
        $(".js-primary-navigation").menuzord();


        /*==============================================
         Onepage nav init
         ===============================================*/
        $(".op-nav li").on("click", function () {
            if ($(".showhide").is(":visible")) {
                $(".showhide").trigger("click");
            }
        });

        if ($.fn.onePageNav) {
            $(".op-nav").onePageNav({
                currentClass: "active"
            });
        }


        /*==============================================
         Sticky nav
         ===============================================*/
        function initSticky() {
            var $navbarSticky, navbarHeight, $brandLogo, centerLogoNormalHeight, centerLogoStickyHeight;
            $navbarSticky = $(".js-navbar-sticky").not(".l-navbar_s-left");
            navbarHeight = $navbarSticky.height();
            $brandLogo = $(".logo-brand");
            centerLogoNormalHeight = 100;
            centerLogoStickyHeight = 60;

            if ($navbarSticky.hasClass("l-navbar_s-center")) {
                $brandLogo.height(centerLogoNormalHeight);
            }

            $navbarSticky.sticky({
                className: "l-navbar-wrapper_has-sticky",
                wrapperClassName: "l-navbar-wrapper",
                zIndex: 10000,
                bottomSpacing: 100
            }).on("sticky-start", function() {
                if ($navbarSticky.hasClass("l-navbar_s-center")) {
                    $brandLogo.height(0);
                    setTimeout(function() {
                        $brandLogo.addClass("sticky-fix").height(centerLogoStickyHeight);
                    }, 300);
                }
            }).on("sticky-end", function () {
                $navbarSticky.parent().height(navbarHeight);
                if ($navbarSticky.hasClass("l-navbar_s-center")) {
                    $brandLogo.removeClass("sticky-fix").height(centerLogoNormalHeight);
                }
            });
        }
        initSticky();


        /*==============================================
         Flex slider init
         ===============================================*/
        $window.load(function () {
            $(".portfolio-slider").flexslider({
                animation: "slide",
                direction: "vertical",
                slideshowSpeed: 3000,
                start: function () {
                    imagesLoaded($(".portfolio"), function () {
                        setTimeout(function () {
                            $(".portfolio-filter li:eq(0) a").trigger("click");
                        }, 500);
                    });
                }
            });
        });

        $window.load(function () {
            $(".portfolio-slider-alt").flexslider({
                animation: "slide",
                direction: "horizontal",
                slideshowSpeed: 4000,
                start: function () {
                    imagesLoaded($(".portfolio"), function () {
                        setTimeout(function () {
                            $(".portfolio-filter li:eq(0) a").trigger("click");
                        }, 500);
                    });
                }
            });
        });

        $window.load(function () {
            $(".post-slider-thumb").flexslider({
                animation: "slide",
                controlNav: "thumbnails",
                directionNav: true,
                touch: true
            });
        });

        $window.load(function () {
            $(".post-slider").flexslider({
                animation: "slide",
                touch: true,
                directionNav: true
            });
        });


        $('.flex-controls').on('click', function(e){
            e.preventDefault();
            var href = $(this).attr('flex-direction');
            $('.post-slider, .post-slider-thumb').flexslider(href);
            return false;
        })


        /*==============================================
         Full screen banner init
         ===============================================*/
        $window.bind("resizeEnd", function () {
            $("#fullscreen-banner").height($window.height());
        });

        $window.resize(function () {
            if (this.resizeTO) clearTimeout(this.resizeTO);
            this.resizeTO = setTimeout(function () {
                $(this).trigger("resizeEnd");
            }, 300);
        }).trigger("resize");

        

        /*==============================================
         Portfolio filterable grid init
         ===============================================*/
        var $portfolioGeneral = $(".portfolio:not(.portfolio-masonry)").isotope({
            itemSelector: ".portfolio-item",
            layoutMode: "fitRows",
            filter: "*"
        });

        var $portfolioMasonry = $(".portfolio-masonry").isotope({
            itemSelector: ".portfolio-item",
            resizesContainer: false,
            layoutMode: "masonry",
            filter: "*"
        });

        if (typeof imagesLoaded == "function") {
            $portfolioGeneral.imagesLoaded().progress(function () {
                $portfolioGeneral.isotope("layout");
            });

            $portfolioMasonry.imagesLoaded().progress(function () {
                $portfolioMasonry.isotope("layout");
            });

            $portfolioGeneral.imagesLoaded().done(function() {
                setTimeout(function() {
                    $portfolioGeneral.isotope("layout");
                }, 400);
            });
            
            $portfolioMasonry.imagesLoaded().done(function() {
                setTimeout(function() {
                    $portfolioMasonry.isotope("layout");
                }, 400);
            });
        }


        /*==============================================
         Portfolio filter nav
         ===============================================*/
        $(".portfolio-filter").on("click", "a", function (event) {
            event.preventDefault();
            var $this = $(this);
            $this.parent().addClass("active").siblings().removeClass("active");
            $this.parents(".text-center").next().isotope({filter: $this.data("filter")});
        });


        /*==============================================
         Portfolio item slider init
         ===============================================*/
        $(".portfolio-slider, .portfolio-slider-alt").each(function () { // the containers for all your galleries
            var _items = $(this).find("li > a");
            var items = [];
            for (var i = 0; i < _items.length; i++) {
                items.push({src: $(_items[i]).attr("href"), title: $(_items[i]).attr("title")});
            }
            $(this).parent().find(".action-btn").magnificPopup({
                items: items,
                type: "image",
                gallery: {
                    enabled: true
                }
            });
            $(this).parent().find(".portfolio-description").magnificPopup({
                items: items,
                type: "image",
                gallery: {
                    enabled: true
                }
            });
        });


        /*==============================================
         Portfolio popup gallery init
         ===============================================*/
        $(".portfolio-gallery").each(function () { // the containers for all your galleries
            $(this).find(".popup-gallery").magnificPopup({
                type: "image",
                gallery: {
                    enabled: true
                }
            });
            $(this).find(".popup-gallery2").magnificPopup({
                type: "image",
                gallery: {
                    enabled: true
                }
            });
        });


        /*==============================================
         Progressbar init
         ===============================================*/
        var progressBar = $(".progress-bar");
        progressBar.each(function (indx) {
            $(this).data("animated", 0);
            if ($.fn.visible) {
                animateProgressbar(this);
            }
        });
        $window.on("scroll", function () {
            if ($.fn.visible) {
                progressBar.each(function () {
                    animateProgressbar(this);
                })
            }
        });

        function animateProgressbar(pb) {
            if ($(pb).data("animated") == 0) {
                if ($(pb).visible()) {
                    $(pb).css("width", $(pb).attr("aria-valuenow") + "%");
                    $(pb).data("animated", 1);
                }
            }
        }


        /*==============================================
         Magnific popup init
         ===============================================*/
        $(".popup-link").magnificPopup({
            type: "image"
            // other options
        });

        $(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
            disableOn: 700,
            type: "iframe",
            mainClass: "mfp-fade",
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });


        /*==============================================
         Accordion init
         ===============================================*/
        var allPanels = $(".accordion > dd").hide();
        allPanels.first().slideDown("easeOutExpo");
        $(".accordion").each(function () {
            $(this).find("dt > a").first().addClass("active").parent().next().css({display: "block"});
        });

        $(".accordion > dt > a").click(function () {

            var current = $(this).parent().next("dd");
            $(this).parents(".accordion").find("dt > a").removeClass("active");
            $(this).addClass("active");
            $(this).parents(".accordion").find("dd").slideUp("easeInExpo");
            $(this).parent().next().slideDown("easeOutExpo");

            return false;

        });


        /*==============================================
         Toggle init
         ===============================================*/
        var allToggles = $(".toggle > dd").hide();
        $(".toggle > dt > a").click(function () {

            if ($(this).hasClass("active")) {

                $(this).parent().next().slideUp("easeOutExpo");
                $(this).removeClass("active");

            }
            else {
                var current = $(this).parent().next("dd");
                $(this).addClass("active");
                $(this).parent().next().slideDown("easeOutExpo");
            }

            return false;
        });


        /*==============================================
         Career show/hide button
         ===============================================*/
        $(".show-detail").click(function (e) {
            $(this).next().slideToggle();
            e.preventDefault();
            $(this).css({opacity: 0})
        });

        $(".cancel-btn").click(function (e) {
            var prnt = $(this).parents(".career-details-info");
            prnt.slideToggle();
            e.preventDefault();
            $(prnt).prev().css({opacity: 1})
        });

        $(".career-details-info .apply-btn").on("click", function () {

        });


        /*==============================================
         Count to init
         ===============================================*/
        var timers = $(".timer");
        if ($.fn.countTo) {
            timers.each(function () {
                $(this).data("animated", 0);
                animateTimer(this);
            });
        }

        $window.on("scroll", function () {
            timers.each(function () {
                animateTimer(this);
            });
        });

        function animateTimer(timer) {
            if ($(timer).data("animated") == 0) {
                if ($.fn.visible && $(timer).visible()) {
                    $(timer).data("animated", 1);
                    $(timer).countTo();
                }
            }
        }


        /*==============================================
         Carousel init
         ===============================================*/
        if ($.fn.owlCarousel) {

            $("#img-carousel").owlCarousel({
                autoplay:true,
                autoplayTimeout:2000,
                dots: false,
                autoWidth: true,
                navigation: true,
                pagination: false,
                navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]

            });

            $('.magnificPopupGallery').magnificPopup({
              delegate: 'a', // child items selector, by clicking on it popup will open
              type: 'image',
              gallery:{
                enabled:true,
                 preload: [0,2],
                 navigateByImgClick: true
              }          
              // other options
            });

            $("#app-carousel").owlCarousel({
                autoplay:true,
                autoplayTimeout:2000,
                dots: true,
                items: 1,
                navigation: false,
                pagination: true,
                navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]

            });

            
            $("#testimonial-4").owlCarousel({
                autoPlay: 3000, //Set AutoPlay to 3 seconds
                items: 1
            });

            $("#owl-slider").owlCarousel({
                autoPlay: 8000, //Set AutoPlay to 3 seconds
                items: 1,
                navigation: true,
                pagination : false,
                dots: true,
                navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
            });

            
            $("#portfolio-carousel").owlCarousel({
                autoPlay: 3000, //Set AutoPlay to 3 seconds
                items: 3,
                itemsDesktop: [1199, 3],
                itemsDesktopSmall: [979, 3],
                navigation: true,
                pagination: false,
                navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]

            });

            $("#portfolio-carousel-alt").owlCarousel({
                autoplay:true,
                autoplayTimeout:2000,
                dots: true,
                nav: true,
                pagination: true,
                navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]

            });

         
            $("#testimonial-5").owlCarousel({
                autoPlay: 3000, //Set AutoPlay to 3 seconds
                items: 1
            });

        }

        $(".portfolio-with-title").addClass("portfolio");


        /*==============================================
         Back to top init
         ===============================================*/
        $body.append("<a data-scroll class='lift-off js-lift-off lift-off_hide' href='#'><i class='fa fa-angle-up'></i></a>");

        var $liftOff = $(".js-lift-off");
        $window.on("scroll", function () {
            if ($window.scrollTop() > 150) {
                $liftOff.addClass("lift-off_show").removeClass("lift-off_hide");
            } else {
                $liftOff.addClass("lift-off_hide").removeClass("lift-off_show");
            }
        });

        /*==============================================
         Bitcoin funding
        ================================================*/
        if (typeof bitcoinaddress == 'object') {
            bitcoinaddress.init({
                selector: ".bitcoin-address",
                template: "bitcoin-address-template",
                qr : {
                    width: 128,
                    height: 128,
                    colorDark : "#000000",
                    colorLight : "#ffffff"
                },
                qrRawAddress: false
            });
        }

        /*==============================================
         Mailchip init
         ===============================================*/
        if ($.fn.ajaxChimp) {
            $(".mailchimp").ajaxChimp({
                /**
                 * Example mailchimp url
                 * //blahblah.us1.list-manage.com/subscribe/post?u=5afsdhfuhdsiufdba6f8802&id=4djhfdsh9"
                 */
                url: "paste mailchimp url"
            });
        }




        /*==============================================
         Special Contact links
         ===============================================*/

        $('.contactsubmit').on('click', function () {
            try {
                var link = $(this)
                var txt = link.attr('subject-line')
                var subInput = $('#subject')
                subInput.addClass('custom-input')
                subInput.val(txt)
            } catch (e) {
                console.log('Something went wrong with the contact a href')
            }
            
        });

        /*==============================================
         Contact form
         ===============================================*/

        // initMailer();

    });


        // TODO

    function initMailer() {
        // var url = 'https://api.gdaydigitalnomads.com/api/mailer'
        var url = 'http://formspree.io/enquiries@gdaydigitalnomads.com'


        $.getJSON('//freegeoip.net/json/?callback=?', function(data) {
            $("#user-meta").val(JSON.stringify(data, null, 2))
        });


        if (!$.fn.validator) {
            return;
        }

        $(".js-Mailer").validator().on("submit", function(e) {
            
            var $form     = $(this)
            var $response = $("<div />", {
                    "id": "mailmessage",
                    "class": "alert js-Response text-center",
                    "style": "margin-top: 20px; display:none"
                    });

            if (!$form.data("isready")) {
                $form.after($response);
                $form.data("isready", true);
            }

            if (e.isDefaultPrevented()) {
                return;
            }

            var $msg = $("#mailmessage");
            if (grecaptcha.getResponse() == ""){
                e.preventDefault();
                showMailerResponse($form, $msg, "You must cheeck the Captcha.", "warning");
                return;
            } 
            
            e.preventDefault();

            $.post(url, {message: 'hello gday'}).done(function(r) {
                showMailerResponse($form, $msg, "Thank you. To prevent span please verify you email address. Email from FORMSPREE.");
            }).fail(function() {
                showMailerResponse(null, $msg, "Woops. There is something wrong, try again!", "warning");
            })
        });
    }

    function showMailerResponse($aForm, $holder, rMessage, rType) {
        var rClass = "alert-warning",
            aClass = "alert-success",
            SPEED  = 3000;

        rType = rType || "success";

        if (rType === "warning") {
            rClass = "alert-success",
            aClass = "alert-warning";
            $holder
                .removeClass(rClass)
                .addClass(aClass)
                .text(rMessage)
                .slideDown()
                .delay(SPEED)
                .slideUp();  

        } else {
            $aForm.addClass('hidden');
            $holder
                .removeClass(rClass)
                .addClass(aClass)
                .text(rMessage)
                .slideDown();
        }


    }

})(jQuery);