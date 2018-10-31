import Swiper from 'swiper';
import SmoothScroll from 'smoothscroll-for-websites';
import Dragger from './modules/dragger';

SmoothScroll({
    stepSize: 100,
    animationTime: 1500
});

/* ACCORDEON */

document.querySelectorAll('.accordeon').forEach((item) => {
    item.querySelector('.accordeon-title').addEventListener('click', () => {
        console.log('a');
        document.querySelectorAll('.accordeon').forEach((acc) => acc !== item && acc.classList.remove('open'));
        item.classList.toggle('open');
    });
});

/* CATEGORY FILTER */

if (document.querySelector('.select-category')) {
    new Dragger('.select-category');
}

/* SWIPER */

document.querySelectorAll('.main-product-slider').forEach((slider) => {
    new Swiper(slider, {
        navigation: {
            nextEl: slider.parentElement.querySelector('.swiper-button-next'),
            prevEl: slider.parentElement.querySelector('.swiper-button-prev')
        },
        slidesPerView: 3,
        spaceBetween: 20,

        breakpoints: {
            // when window width is <= 320px
            320: {
                slidesPerView: 1,
                spaceBetween: 10
            },
            // when window width is <= 480px
            480: {
                slidesPerView: 2,
                spaceBetween: 20
            }
        }
    });
});

document.querySelectorAll('.product-slider').forEach((slider) => {
    new Swiper(slider, {
        pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true
        }
    });
});

/* MENU */

document.querySelector('.menu').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.container-navigation').classList.toggle('open-menu');
});

/* POPUP */

document.querySelector('.support').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.overlay-popup').classList.add('open-popup');
});

document.querySelector('.popup-close').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.overlay-popup').classList.remove('open-popup');
});

/* SEARCH IN HEADER */

document.querySelector('.icon-search').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.string-search').classList.toggle('show-search');
});
