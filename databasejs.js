const getdata = async()=> {
    const api = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood')
    const data = await apiJSON()
    const{category}
    // console.log(data);
}
