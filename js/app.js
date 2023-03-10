const loadPhones = async(searchText, dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    // console.log(url);
    const response = await fetch(url)
    const data = await response.json()
    displayPhones(data.data,dataLimit)
}
const displayPhones = (phones,dataLimit) =>{
    const phonesContainer = document.getElementById('phone-container')
    phonesContainer.innerHTML = ``
    // display 10 phones only
    const showAll = document.getElementById('show-all')
    if(dataLimit && phones.length > 10){

        phones =phones.slice(0,dataLimit)
        showAll.classList.remove('d-none')
    }
    else{
        showAll.classList.add('d-none')
    }
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
                          <h5 class="card-title">${phone.phone_name}</h5>
                          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                          <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
                        </div>
                      </div>
                    </div>
    `
    
    })
    // stop loader or spinner
    toggleSpinner(false)
}

const processSearch =(dataLimit) =>{
     // Start loader
     toggleSpinner(true)
     const searchFieldText = document.getElementById('search-field').value
     // console.log(searchFieldText);
     loadPhones(searchFieldText,dataLimit)
}
// handle search button click
const searchButton = document.getElementById('search-btn')
searchButton.addEventListener('click', function(){
   processSearch(10);

})
//search input field enter key event handler
const searchField = document.getElementById('search-field')
searchField.addEventListener('keydown', function(event){
    // console.log(event.key);
    if (event.key == 'Enter'){
        processSearch(10);
    }
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
document.getElementById('show-all').addEventListener('click', function(){
    processSearch()
})
const loadPhoneDetails =async id =>{
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const response = await fetch(url)
    const data = await response.json()
    displayPhoneDetails(data.data);
}
const displayPhoneDetails = phone =>{
    const modalTitle = document.getElementById('phoneDetailModalLabel')
    modalTitle.innerText = phone.name
    const phoneDetails = document.getElementById('phone-details')
    phoneDetails.innerHTML = `
    <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No release Date Found'}</p>
    <p>Storage: ${phone.mainFeatures? phone.mainFeatures.storage : 'No storage Information'}</p>
    <p>Others: ${phone.others ? phone.others.Bluetooth : 'No bluetooth Information'}</p>
    `
}
loadPhones('apple')