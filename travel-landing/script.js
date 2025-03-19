$(document).ready(function() {
    console.log("jQuery ready, script loaded");

    // Hamburger Toggle Functionality
    const $hamburger = $('#hamburger-toggle');
    const $navTabs = $('#nav-tabs');

    $hamburger.click(function() {
        $(this).toggleClass('active');
        $navTabs.toggleClass('active');
    });

    class StickyNavigation {
        constructor() {
            console.log("StickyNavigation initialized");
            this.currentId = null;
            this.currentTab = null;
            this.tabContainerHeight = 70;
            const self = this;

            // Handle tab clicks
            $('.et-hero-tab').click(function(event) {
                console.log("Tab clicked:", $(this).attr('href'));
                self.onTabClick(event, $(this));
                // Close hamburger menu on mobile after clicking a tab
                if ($(window).width() <= 768) {
                    $hamburger.removeClass('active');
                    $navTabs.removeClass('active');
                }
            });

            $(window).scroll(() => { this.onScroll(); });
            $(window).resize(() => { this.onResize(); });
            this.onScroll(); // Initialize slider on load
        }

        onTabClick(event, element) {
            event.preventDefault();
            const target = $(element.attr('href'));
            if (target.length) { // Ensure target exists
                const scrollTop = target.offset().top - this.tabContainerHeight + 1;
                console.log("Target found:", target.length, "ScrollTop:", scrollTop);
                $('html, body').animate({ scrollTop: scrollTop }, 600, () => {
                    // Update slider after scrolling completes
                    this.findCurrentTabSelector();
                });
            }
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
            let newCurrentId = null;
            let newCurrentTab = null;
            const self = this;

            $('.et-hero-tab').each(function() {
                const id = $(this).attr('href');
                const $section = $(id);
                if ($section.length) { // Check if section exists
                    const offsetTop = $section.offset().top - self.tabContainerHeight;
                    const offsetBottom = $section.offset().top + $section.height() - self.tabContainerHeight;
                    if ($(window).scrollTop() >= offsetTop && $(window).scrollTop() < offsetBottom) {
                        newCurrentId = id;
                        newCurrentTab = $(this);
                    }
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
            if (this.currentTab && this.currentTab.is(':visible')) { // Ensure tab is visible
                width = this.currentTab.outerWidth();
                left = this.currentTab.position().left;
                console.log("Slider set - width:", width, "left:", left);
                $('.et-hero-tab-slider').css({ width: width + 'px', left: left + 'px' });
            } else {
                $('.et-hero-tab-slider').css({ width: '0px', left: '0px' }); // Hide slider if no tab is active
            }
        }
    }

    new StickyNavigation();

    // Testimonial Slideshow
    let currentIndex = 0;
    const $testimonials = $('.testimonial-card');

    function showNextTestimonial() {
        $testimonials.eq(currentIndex).removeClass('active');
        currentIndex = (currentIndex + 1) % $testimonials.length;
        $testimonials.eq(currentIndex).addClass('active');
    }

    $testimonials.eq(currentIndex).addClass('active');
    setInterval(showNextTestimonial, 5000);
});