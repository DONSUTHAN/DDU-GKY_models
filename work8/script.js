// const panels = document.querySelectorAll('panel')
// panels.forEach(panel => {
//     panel.addEventListener('click',() => {
//         removeclass()
//         panel.classList.add('enable')
//     })
// })

// function removeclass() {
//     panels.forEach(panel => {
//         panel.classList.remove('enable')
//     })
// }

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