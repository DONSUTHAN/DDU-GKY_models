// 'https://cdn.jsdelivr.nrt/npm/swiper@12/swiper-bundle.min.js'
    
  import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.mjs'

const swiper = new Swiper('.swiper', {

  // cube
  effect: 'cube',
  cubeEffect: {
    slideShadows: false,
  },
  // autoplay
  autoplay: {
    delay: 500,
  },
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});

