  
const panels = document.querySelectorAll('.panel')
panels.forEach(panel => {
panel.addEventListener('click', () => {
removeclass()
panel.classList.add('enable')
})
})

function removeclass() {
panels.forEach(panel => {
panel.classList.remove('enable')
})
}

//////swipers here



 


const swiper = new Swiper('.swiper', {
  
  // cube
  effect: 'cube',
  cubeEffect: {
    slideShadows: false,
  },
  // autoplay
  autoplay: {
    delay: 1200,
  },
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  // navigation: {
  //   nextEl: '.swiper-button-next',
  //   prevEl: '.swiper-button-prev',
  // },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});