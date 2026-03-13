function toogleLike(element) {
    const icon = element.queryselector('i');
    icon.classList.toogle('fa-solid');
    icon.classList.toogle('fa-regula');
    element.classList.toogle('liked');
}

function toogleSave(element) {
    const icon = element.queryselector('i');
    icon.classList.toogle('fa-solid');
    icon.classList.toogle('fa-regular');
    element.classList.toogle('saved')
;}