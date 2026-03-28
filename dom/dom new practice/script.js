const imgUrlInput = document.getElementsById('img_url');
const nameInput = document.getElementById('user_name');
const occupationc = document.getElementById('job_title');
const infoinput = document.getElementById('job_info');
const generateBtn = document.getElementById('generate_btn');
const cardContainer = document.getElementById('card_container');

generateBtn.addEventListener('click',() =>{
    const imgUrl = imgUrlInput.value.trim();
    const name = nameInput.value.trim();





    if(!imgUrl){
        alert("please fill all required forms(image url).");
        return;
    }

    const card = document.createElement('div');
    card.classList.add('card');

    const img = document.createElement('img');
    img.src = imgUrl;
    img.alt = name;
    img.onerror = () => {
        img.src
    }

})
