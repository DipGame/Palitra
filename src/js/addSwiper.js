document.addEventListener("DOMContentLoaded", function () {

    let swiperMenuTabs = new Swiper(".swiperMenuTabs", {
        // autoplay: {
        //     delay: 5000,
        //     disableOnInteraction: false,
        // },
        // effect: 'fade',
        // fadeEffect: {
        //     crossFade: true
        // },
        speed: 1200,
        loop: true,
        slidesPerView: 1,
        navigation: {
            nextEl: ".swiperMenuTabs-button-next",
            prevEl: ".swiperMenuTabs-button-prev",
        },
        // pagination: {
        //     el: ".banerMainSwiper-pagination",
        // },
        // breakpoints: {
        //     300: {
        //         slidesPerView: 1,
        //         spaceBetween: 30
        //     },
        //     1044: {
        //         slidesPerView: 2,
        //         spaceBetween: 30
        //     },
        //     1636: {
        //         slidesPerView: 3,
        //         spaceBetween: 30
        //     }
        // }
    });
    let swiperMenu = new Swiper(".swiperMenu", {
        speed: 1200,
        loop: true,
        slidesPerView: 1,
        spaceBetween: 30,
        autoHeight: true,
    });


    let swiperBanerLeft = new Swiper(".swiperBanerLeft", {
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        speed: 1200,
        loop: true,
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: {
            el: ".swiperBanerLeft-pagination",
        },
    });

    let swiperBanerRight = new Swiper(".swiperBanerRight", {
        speed: 1200,
        loop: true,
        slidesPerView: 1,
        spaceBetween: 30,
    });

    swiperMenu.controller.control = swiperMenuTabs;
    swiperMenuTabs.controller.control = swiperMenu;

    swiperBanerLeft.controller.control = swiperBanerRight;
    swiperBanerRight.controller.control = swiperBanerLeft;

    console.log('addSwiper.js finish work');

});