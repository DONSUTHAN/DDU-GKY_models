const panels = document.querySelectorAll('pqnel')

panels.forEach(panel => {
    panel.addEventListener('click',()=> {
        removeclass()

        panel.classList.add('enable')
    })
})

function removeclass(){
    panels.forEach(panel => {
        panel.classList.remove('enable')
    })
}