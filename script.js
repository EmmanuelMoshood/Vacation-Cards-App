

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