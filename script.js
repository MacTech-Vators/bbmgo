$(document).ready(function() {
    console.log("jQuery ready, script loaded");

    class StickyNavigation {
        constructor() {
            console.log("StickyNavigation initialized");
            this.currentId = null;
            this.currentTab = null;
            this.tabContainerHeight = 70;
            const self = this;
            $('.et-hero-tab').click(function(event) {
                console.log("Tab clicked:", $(this).attr('href'));
                self.onTabClick(event, $(this));
            });
            $(window).scroll(() => { this.onScroll(); });
            $(window).resize(() => { this.onResize(); });
            this.onScroll(); // Initialize slider on load
        }

        onTabClick(event, element) {
            event.preventDefault();
            const target = $(element.attr('href'));
            const scrollTop = target.offset().top - this.tabContainerHeight + 1;
            console.log("Target found:", target.length, "ScrollTop:", scrollTop);
            $('html, body').animate({ scrollTop: scrollTop }, 600);
        }

        onScroll() {
            this.checkTabContainerPosition();
            this.findCurrentTabSelector();
        }

        onResize() {
            if (this.currentId) {
                this.setSliderCss();
            }
        }

        checkTabContainerPosition() {
            const offset = $('.et-hero-tabs').offset().top + $('.et-hero-tabs').height() - this.tabContainerHeight;
            if ($(window).scrollTop() > offset) {
                $('.et-hero-tabs-container').addClass('et-hero-tabs-container--top');
            } else {
                $('.et-hero-tabs-container').removeClass('et-hero-tabs-container--top');
            }
        }

        findCurrentTabSelector() {
            let newCurrentId;
            let newCurrentTab;
            const self = this;
            $('.et-hero-tab').each(function() {
                const id = $(this).attr('href');
                const offsetTop = $(id).offset().top - self.tabContainerHeight;
                const offsetBottom = $(id).offset().top + $(id).height() - self.tabContainerHeight;
                if ($(window).scrollTop() > offsetTop && $(window).scrollTop() < offsetBottom) {
                    newCurrentId = id;
                    newCurrentTab = $(this);
                }
            });
            if (this.currentId !== newCurrentId || this.currentId === null) {
                this.currentId = newCurrentId;
                this.currentTab = newCurrentTab;
                console.log("Active tab:", this.currentId);
                this.setSliderCss();
            }
        }

        setSliderCss() {
            let width = 0;
            let left = 0;
            if (this.currentTab) {
                width = this.currentTab.outerWidth(); // Use outerWidth for consistency
                left = this.currentTab.position().left; // Relative to parent
                console.log("Slider set - width:", width, "left:", left);
            }
            $('.et-hero-tab-slider').css({ width: width, left: left });
        }
    }

    new StickyNavigation();

    // Testimonial Slideshow
    let currentIndex = 0;
    const $testimonials = $('.testimonial-card');

    function showNextTestimonial() {
        $testimonials.eq(currentIndex).removeClass('active'); // Hide current
        currentIndex = (currentIndex + 1) % $testimonials.length; // Next index
        $testimonials.eq(currentIndex).addClass('active'); // Show next
    }

    // Initially show the first testimonial
    $testimonials.eq(currentIndex).addClass('active');

    // Set the slideshow interval (every 5 seconds)
    setInterval(showNextTestimonial, 5000);
});