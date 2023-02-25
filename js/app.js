const loadPhones = async(searchText) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    // console.log(url);
    const response = await fetch(url)
    const data = await response.json()
    displayPhones(data.data)
}
const displayPhones = phones =>{
    const phonesContainer = document.getElementById('phone-container')
    phonesContainer.innerHTML = ``
    // display 20 phones only
    phones =phones.slice(0,20)
    //display no phones found if search is not found in API
    const noPhone = document.getElementById('no-phones-found-message')
    if(phones.length === 0 ){
        noPhone.classList.remove('d-none')
    }
    else{
        noPhone.classList.add('d-none') 
    }
    // display all phones
    phones.forEach(phone =>{
    //   const phoneDiv  = document.createElement('div')
    phonesContainer.innerHTML += `
    <div class="col">
                      <div class="card p-4">
                        <img src="${phone.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">${phone.name}</h5>
                          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        </div>
                      </div>
                    </div>
    `
    // stop loader or spinner
        toggleSpinner(false)
    })
}
// handle search button click
const searchButton = document.getElementById('search-btn')
searchButton.addEventListener('click', function(){
    // Start loader
    toggleSpinner(true)
    const searchFieldText = document.getElementById('search-field').value
    // console.log(searchFieldText);
    loadPhones(searchFieldText)

})
const toggleSpinner = isLoading =>{
const loaderSection = document.getElementById('loader')
if(isLoading){
    loaderSection.classList.remove('d-none')
}
else{
    loaderSection.classList.add('d-none')
}
}
loadPhones()