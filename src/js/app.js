/* import Swiper, { Navigation, Pagination } from 'swiper'; */
import { initSpollers } from './modules/spollers.js';
import './modules/smoothScroll.js';
import './modules/lightgallery.min.js';
/* import Isotope from 'isotope-layout'; */

window.addEventListener('load', windowLoad);
function windowLoad() {
    document.body.classList.add('load');

    //?определение высоты для изображений в табах
    /*     function imagesInit() {
            const images = document.querySelectorAll('.article-articles__image');
            if (images.length){
                images.forEach(image => {
                    const imageItem = image.querySelector('img');
                    const padding = imageItem.naturalHeight / imageItem.naturalWidth * 100;
                    image.style.paddingBottom = `${padding}%`;
                    imageItem.classList.add('init');
                });
            }
        } */
    //?иницилизация табов при помощи Isotope
    /*     let itemsGrid;
        function gridInit() {
            const items = document.querySelector('.articles__items');
            itemsGrid = new Isotope(items,{
                itemSelector: '.article-articles',
                masonry: {
                    fitWidth: true,
                    gutter: 20
                }
            });
        }
        imagesInit();
        gridInit(); */

    //?плавный скролл
    SmoothScroll({ animationTime: 550, stepSize: 75, accelerationDelta: 30, accelerationMax: 2, keyboardSupport: true, arrowScroll: 50, pulseAlgorithm: true, pulseScale: 4, pulseNormalize: 1, touchpadSupport: true, });

    //?Тема темная
    const html = document.documentElement;
    const saveUserTheme = localStorage.getItem('user-theme');
    let userTheme;
    if (window.matchMedia) {
        userTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        !saveUserTheme ? changeTheme() : null;
    });
    const themeButton = document.querySelector('.theme');
    const resetButton = document.querySelector('.reset-theme');
    function setThemeClass() {
        if (saveUserTheme) {
            html.classList.add(saveUserTheme);
            if (resetButton) {
                resetButton.classList.add('active');
            }
        } else {
            html.classList.add(userTheme);
        }
    }
    setThemeClass()
    function changeTheme(saveTheme = false) {
        let currentTheme = html.classList.contains('light') ? 'light' : 'dark';
        let newTheme;

        if (currentTheme === 'light') {
            newTheme = 'dark';
        } else if (currentTheme === 'dark') {
            newTheme = 'light';
        }
        html.classList.remove(currentTheme);
        html.classList.add(newTheme);
        saveTheme ? localStorage.setItem('user-theme', newTheme) : null;
    }

    //?Инициализация спойлеров
    initSpollers();

    //?Делегирование клика
    document.addEventListener("click", documentActions);
    function documentActions(e) {
        const targetElement = e.target;

        if (targetElement.closest('.theme')) {
            themeButton.classList.add('active');
            changeTheme(true);
        }
        if (targetElement.closest('.reset-theme')) {
            resetButton.classList.remove('active');
            localStorage.setItem('user-theme', '');
        }

        //!Табы
        if (targetElement.closest('[data-filter]')) {
            const itemFilter = targetElement.closest('[data-filter]');
            const filterValue = itemFilter.dataset.filter;
            const tabs = itemFilter.closest('[data-tabs]');
            tabs.querySelector('.filter-articles__item.active').classList.remove('active');
            /*             filterValue === "*" ? itemsGrid.arrange({ filter: `` }) : 
                            itemsGrid.arrange({ filter: `[data-filter="${filterValue}"]` }) */
            itemFilter.classList.add('active');
            const tabsItems = tabs.querySelectorAll('[data-filter-item]');
            const durationAnimation = 300;
            if (filterValue === "*") {
                tabsItems.forEach(item => {
                    if (item.style.position !== 'absolute') {
                        item.style.cssText = `opacity: 0;`;
                        setTimeout(() => {
                            item.style.cssText = `position: absolute;opacity: 0;`;
                        }, durationAnimation);
                    }
                });

                setTimeout(() => {
                    tabsItems.forEach(item => {
                        item.style.cssText = ``;
                        setTimeout(() => { item.style.cssText = `opacity: 1;`; }, 100);
                    });
                }, durationAnimation);
            } else {
                tabsItems.forEach(item => {
                    if (item.style.position !== 'absolute') {
                        item.style.cssText = `opacity: 0;`;
                        setTimeout(() => {
                            item.style.cssText = `position: absolute;opacity: 0;`;
                        }, durationAnimation);
                    }
                });

                setTimeout(() => {
                    tabsItems.forEach(item => {
                        if (item.dataset.filterItem === filterValue) {
                            item.style.cssText = ``;
                            setTimeout(() => { item.style.cssText = `opacity: 1;`; }, 100);
                        }
                    });
                }, durationAnimation);
            }
            e.preventDefault();
        }

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i
            .test(navigator.userAgent) && window.innerWidth > 767.98) {
            if (targetElement.classList.contains('menu__arrow')) {
                targetElement.closest('.menu__item').classList.toggle('hover');
            }
            if (!targetElement.closest('.menu__item')) {
                document.querySelectorAll('.menu__item').forEach(item => {
                    item.classList.remove('hover');
                });
            }
        }
        if (targetElement.closest('.menu__icon')) {
            targetElement.closest('.menu__icon').classList.toggle('active');
            document.querySelector('.menu__body').classList.toggle('active');
            document.body.classList.toggle('lock');
        }
        if (targetElement.classList.contains('menu__link') || targetElement.classList.contains('menu__sub-link')) {
            document.querySelector('.menu__body').classList.remove('active');
            document.querySelector('.menu__icon').classList.remove('active');
        }
        if (targetElement.classList.contains('phone__link')) {
            document.querySelector('.phone__popup').classList.toggle('active');
            document.querySelector('.popup-phone__body').classList.toggle('active');
            document.body.classList.add('lock');
        } else if (!targetElement.closest('.popup-phone__body')) {
            document.querySelector('.popup-phone__body').classList.remove('active');
            document.querySelector('.phone__popup').classList.remove('active');
            document.body.classList.remove('lock');
        }
        if (targetElement.closest('[data-goto]')) {
            /*             if (targetElement.closest('.menu__link')) {
                            document.querySelector('.menu__body').classList.remove('open');
                            document.querySelector('.menu__icon').classList.remove('active');
                            document.body.classList.remove('lock');
                        } */
            const link = targetElement.closest('[data-goto]');
            const goToBlock = document.querySelector(link.dataset.goto);
            if (goToBlock) {
                let goToBlockValue = goToBlock.getBoundingClientRect().top + scrollY;
                const header = document.querySelector('.header');
                if (header) {
                    goToBlockValue -= header.offsetHeight;
                }
                window.scrollTo({
                    top: goToBlockValue,
                    behavior: "smooth"
                });
                e.preventDefault();
            }
        }
        //Копирование номера телефона
        if (targetElement.closest('.popup-phone__title')) {
            const titleTel = targetElement.closest('.popup-phone__title');
            const textTel = titleTel.querySelector('span').textContent.replace(/\-/g, '').replace('(', '').replace(')', '');
            window.navigator.clipboard.writeText(textTel);
            titleTel.classList.add('copy');
            setTimeout(() => { titleTel.classList.remove('copy'); }, 3500);
        }
    }

    /*     if (document.querySelector('.project-slider__body')) {
            new Swiper('.project-slider__body', {
                modules: [Navigation, Pagination],
                wrapperClass: 'project-slider__wrapper',
                slideClass: 'project-slider__slide',
                observer: true,
                observeParents: true,
                observeSlideChildren: true,
                slidesPerView: 1,
                spaceBetween: 24,
                speed: 800,
                loop: true,
                pagination: {
                    el: '.project-slider__dotts',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.project-slider__arrow_next',
                    prevEl: '.project-slider__arrow_prev',
                },
            });
        } */
}
