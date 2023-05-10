

let isRowSelected = false; //Boolean to check if new item is added or existing one is changed
let selectedRow  //global variable for store selected row

//WHEN SUMIT IS CLICKED

const submitForm = () => {
    event.preventDefault();
    
    let formData = getDataFromForm();
    let dataStored = setLocalStorage(formData);

    
    

    if(isRowSelected === false){
        //enter new row
        setDataOnDom(dataStored);
    }else{
        //update existing row
        updateRow(dataStored)
    }
}



//CREATE
const getDataFromForm = () => {
    const locationEntered = document.getElementById('location-name').value;
    const ratingEntered = document.getElementById('rating-input').value;
    const cardImageEntered = document.getElementById('card-image-url-input').value;

    return [locationEntered, ratingEntered, cardImageEntered]
}


//READ
//store data in local storage
const setLocalStorage = (arrData) => {
    let locationNameSet = localStorage.setItem("Location", arrData[0]);
    let ratingSet = localStorage.setItem("Rating", arrData[1]);
    let imageURLSet = localStorage.setItem("Image URL", arrData[2])

    let locationName = localStorage.getItem("Location", locationNameSet)
    let rating = localStorage.getItem("Rating", ratingSet)
    let imageURL = localStorage.getItem("Image URL", imageURLSet)

    return [locationName, rating, imageURL]
}
//insert data into the DOM
const setDataOnDom = (readData) => {
    let table = document.getElementById('result-table');
    let row = table.insertRow();
    row.insertCell(0).innerHTML = readData[0];
    row.insertCell(1).innerHTML = readData[1];
    row.insertCell(2).innerHTML = readData[2];
    row.insertCell(3).innerHTML =  
        `<button onclick="editRow(this)">Edit</button>
        <button onclick="removeRow(this)">Delete</button>
        `
}


//UPDATE - editting and updating the selected row
//display data in the form for making correction
let editRow = (cellValue) =>{
    isRowSelected = true;
    selectedRow = cellValue.parentElement.parentElement;
    document.getElementById('location-name').value = selectedRow.cells[0].innerHTML;
    document.getElementById('rating-input').value  = selectedRow.cells[1].innerHTML;
    document.getElementById('card-image-url-input').value  = selectedRow.cells[2].innerHTML;
}
//replace data on the table
let updateRow = () => {
    selectedRow.cells[0].innerHTML = document.getElementById('location-name').value;
    selectedRow.cells[1].innerHTML = document.getElementById('rating-input').value;
    selectedRow.cells[2].innerHTML = document.getElementById('card-image-url-input').value; 
    isRowSelected = false
}

//DELETE 
const removeRow = (cellValue) => {
    selectedRow = cellValue.parentElement.parentElement;
    document.getElementById("result-table").deleteRow(selectedRow.rowIndex);
}



/////////////
const cardForm = document.getElementById('card-form');
const cardContainer = document.getElementById('card-container');
let isEditing = false;
let editingCard = null;

cardForm.addEventListener('submit', function(event) {
  event.preventDefault(); // prevent form submission

  // get values from form inputs
  const titleInput = document.getElementById('title-input');
  const imageInput = document.getElementById('image-input');
  const descriptionInput = document.getElementById('description-input');
  const title = titleInput.value;
  const image = imageInput.value;
  const description = descriptionInput.value;

  // create card element with title, image, and description
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <img src="${image}" alt="${title}">
    <h2>${title}</h2>
    <p>${description}</p>
    <button class="edit-button">Edit</button>
  `;

  // add event listener to edit button
  const editButton = card.querySelector('.edit-button');
  editButton.addEventListener('click', function() {
    isEditing = true;
    editingCard = card;

    // show form and pre-populate fields with card values
    cardForm.classList.add('show-form');
    titleInput.value = card.querySelector('h2').textContent;
    imageInput.value = card.querySelector('img').getAttribute('src');
    descriptionInput.value = card.querySelector('p').textContent;
  });

  if (isEditing && editingCard === card) {
    // update existing card with new values
    card.querySelector('img').setAttribute('src', image);
    card.querySelector('img').setAttribute('alt', title);
    card.querySelector('h2').textContent = title;
    card.querySelector('p').textContent = description;
    isEditing = false;
    editingCard = null;
  } else {
    // append new card to card container
    cardContainer.appendChild(card);
  }

  // reset form inputs
  titleInput.value = '';
  imageInput.value = '';
  descriptionInput.value = '';
});

// add event listener to form cancel button
const cancelButton = cardForm.querySelector('.cancel-button');
cancelButton.addEventListener('click', function() {
  isEditing = false;
  editingCard = null;
  cardForm.classList.remove('show-form');
  titleInput.value = '';
  imageInput.value = '';
  descriptionInput.value = '';
});