import i18Obj from './translate.js';

let lang = 'en',
    theme = 'light';

console.log(`Ваша отметка - 80 балла(ов)
Отзыв по пунктам ТЗ:

Частично выполненные пункты:
1) после смены светлой и тёмной темы интерактивные элементы по-прежнему изменяют внешний вид при наведении и клике и при этом остаются видимыми на странице (нет ситуации с белым шрифтом на белом фоне) — 2 балл(а)
2) выбранный пользователем язык отображения страницы и светлая или тёмная тема сохраняются при перезагрузке страницы — 2 балл(а)


Все оставшиеся пункты выполнены и не имеют комментариев проверяющего.`);


//----Change Theme
//----------------

const btnToggle = document.querySelector('.btn-toggle-theme');
const sectionsChangeThemeArr = ['.skills__container', '.portfolio__container', '.video__container', '.price__container'];
// const burgerChangeThemeArr = ['.skills__container', '.portfolio__container', '.video__container', '.price__container'];

function changeTheme() {


    btnToggle.addEventListener('click', () => {

        sectionsChangeThemeArr.forEach((elem, index) => {
            // console.log(elem);
            document.querySelector(elem).classList.toggle('light-theme');
        });

        btnToggle.classList.toggle('light-theme-img');
        btnToggle.classList.toggle('dark-theme-img');
        // document.documentElement.style.setProperty('--color-title', '#000');

    });

}

changeTheme();

//--------
//------------

//--------BURGER
let btn = document.querySelector('.hamburger-btn');
let menu = document.querySelector('.header__nav-hamburger-menu');
let overlay = document.querySelector('.header__nav-hamburger-overlay');
let links = document.querySelectorAll('.header__nav-link_ham');


btn.addEventListener('click', function () {
    btn.classList.toggle('active');
    menu.classList.toggle('header__nav-hamburger_active');
    overlay.classList.toggle('header__nav-hamburger-overlay_active');
});

overlay.addEventListener('click', function () {
    overlay.classList.toggle('header__nav-hamburger-overlay_active');
    btn.classList.toggle('active');
    menu.classList.toggle('header__nav-hamburger_active');
});


for (let i = 0; i < links.length; i++) {
    links[i].onclick = function (e) {
        btn.classList.toggle('active');
        menu.classList.toggle('header__nav-hamburger_active');
        overlay.classList.toggle('header__nav-hamburger-overlay_active');
    }
}
//-----
//-----



//-----------Portfolio

//----------Preload imgs
const seasons = ['winter', 'spring', 'summer', 'autumn'];

function preloadSummerImages(index) {
    for (let i = 1; i <= 6; i++) {
        const img = new Image();
        img.src = `./assets/img/${seasons[index]}/${i}.jpg`;
        // console.log(index);
    }
}

seasons.forEach((elem, index) => preloadSummerImages(index));
//------------
//-----------





//-------changed images
const portfolioArrBtn = document.querySelectorAll('.portfolio__btn-item');
const portfolioImages = document.querySelectorAll('.portfolio__gallery-item');
const portfolioBtns = document.querySelector('.portfolio__btn-s');


function changeImage() {
    portfolioBtns.addEventListener('click', function (event) {
        // console.log(this, event.target);

        if (event.target.classList.contains('portfolio__btn-item')) {
            // console.log('ok');
            portfolioImages.forEach((img, index) => img.src = `./assets/img/${event.target.dataset.season}/${index + 1}.jpg`);
        }

        //----switch button view
        if (event.target.classList.contains('btn_transparent')) {
            // console.log('ok');
            changeClassActive(event);
        }

    });
}


function changeClassActive(event) {
    portfolioArrBtn.forEach((element) => {
        element.classList.remove('btn_gold');
        element.classList.add('btn_transparent');
    });
    // console.log('ok');
    event.target.classList.add('btn_gold');
    event.target.classList.remove('btn_transparent');
}

changeImage();
//----------
//----
//----




//---TRANSLATE

const translateElements = document.querySelectorAll('[data-i18]');
const langBtns = document.querySelector('.header__lang');
const ruLang = document.querySelector('.lang-ru');
const enLang = document.querySelector('.lang-en');
// console.log(langTranslateBtn, '\n');
// console.log(translateElements);
// console.log(langBtns);

function getTranslateLang(langTranslate) {
    translateElements.forEach((e) => e.textContent = i18Obj[langTranslate][e.dataset.i18]);
}

ruLang.addEventListener('click', () => {
    getTranslateLang('ru');
    lang = 'ru';
    ruLang.classList.add('header__lang_active');
    enLang.classList.remove('header__lang_active');
});
enLang.addEventListener('click', () => {
    getTranslateLang('en')
    lang = 'en';
    ruLang.classList.remove('header__lang_active');
    enLang.classList.add('header__lang_active');
});



//------
//------


//--- Work with Local Storage

function setLocalStorage() {
    localStorage.setItem('lang', lang);
    localStorage.setItem('theme', theme);
}

window.addEventListener('beforeunload', setLocalStorage);


function getLocalStorage() {
    if (localStorage.getItem('lang')) {
        const lang = localStorage.getItem('lang');
        getTranslateLang(lang);
    }
}
window.addEventListener('load', getLocalStorage);
