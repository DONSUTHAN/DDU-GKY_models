
const imgUrlInput = document.getElementById('img_url');
const nameInput = document.getElementById('user_name');
const occupationInput = document.getElementById('job_title');
const infoInput = document.getElementById('job_info');
const generateBtn = document.getElementById('generate_btn');
const cardContainer = document.getElementById('card_container');


generateBtn.addEventListener('click', () => {
    const imgUrl = imgUrlInput.value.trim();
    const name = nameInput.value.trim();
    const occupation = occupationInput.value.trim();
    const info = infoInput.value.trim();


    if (!imgUrl || !name || !occupation) {
        alert("Please fill in all required fields (Image URL, Name, Occupation).");
        return;
    }


    const card = document.createElement('div');
    card.classList.add('card');

    const img = document.createElement('img');
    img.src = imgUrl;
    img.alt = name;
    img.onerror = () => {
        img.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
    };

    const title = document.createElement('h2');
    title.textContent = name;

    const job = document.createElement('h4');
    job.textContent = occupation;

    const description = document.createElement('p');
    description.textContent = info || "No description provided.";


    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(job);
    card.appendChild(description);

    cardContainer.appendChild(card);
});