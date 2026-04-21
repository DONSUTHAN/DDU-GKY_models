let getdata = async() => {
    let api = await fetch ('https://www.themealdb.com/api/json/v1/1/categories.php')
    let data = await api.json()
    
    let {categories} =data
    // console.log(data);
    
let list=document.getElementById('list')
categories.map (e=>{
   let categories=e.strCategory

   console.log(categories);
   
   let li = document.createElement('li')
   li.innerHTML+=`${e.strCategory}`
        li.innerHTML+=`${categories} <br> <img src=${e.strCategoryThumb} <br> <p class="card-des">${e.strCategoryDescription || 'Delicious'}</p> `
    list.appendChild(li)  
    list.appendChild(img)
    list.appendChild(de)
})
}
getdata()