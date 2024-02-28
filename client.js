let selectRow = null;
let updateSalary = 0;
function onFormSubmit() {
  let formData = readFormData();
  let errorMessage = document.querySelector(".emptyfield"); // Move this line outside the if statement

  if (selectRow === null) {
    if (checkEmptyfields()) {
      errorMessage.innerHTML = "* Empty field is not allowed";
      errorMessage.style.visibility = "visible"; // Show the error message
      return; // Stop further execution if there are empty fields
    }
    insertRecord(formData);

    errorMessage.innerHTML = "* Successfully inserted";
    errorMessage.style.visibility = "visible"; // Show the success message
  } else {
    updateRecord(formData);
  }

  resetFields();

  errorMessage.style.visibility = "hidden"; // Hide the message after resetting fields
}

/**
 * Function name readFormData, this function will read input data from the user
 * I have created empty object 'formData' and later assigned key and
 * value from the input user that will hold data from input user
 *
 * @returns this function will return the objct that holds value from the inputs
 */
function readFormData() {
  let formData = {};
  formData["Firstname"] = document.querySelector(
    '[data-testid="firstname"]'
  ).value;
  formData["lastname"] = document.querySelector(
    '[data-testid="lastname"]'
  ).value;
  formData["employeID"] = document.querySelector(
    '[data-testid="employeid"]'
  ).value;
  formData["title"] = document.querySelector('[data-testid="title"]').value;
  formData["Salary"] = parseFloat(
    document.querySelector('[data-testid="salary"]').value
  );
  return formData;
}

function insertRecord(Data) {
  let table = document
    .getElementById("employedata")
    .getElementsByTagName("tbody")[0];
  let newRow = table.insertRow(table.length);
  let cell1 = newRow.insertCell(0);
  cell1.innerHTML = Data.Firstname;

  let cell2 = newRow.insertCell(1);
  cell2.innerHTML = Data.lastname;

  let cell3 = newRow.insertCell(2);
  cell3.innerHTML = Data.employeID;

  let cell4 = newRow.insertCell(3);
  cell4.innerHTML = Data.title;
  let displaySalary = document.getElementById("salarydisplay");
  let cell5 = newRow.insertCell(4);
  cell5.innerHTML = Data.Salary;
  let updateSalary = parseFloat(Data.Salary); // Convert Data.Salary to a floating-point number
  let salary = updateSalary; // Assign the value of updateSalary to salary

  console.log(updateSalary + salary); // Log the result of adding updateSalary and salary together

  // Append a new span element containing the new salary value
  displaySalary.innerHTML = `<span>${updateSalary}</span>`;

  let cell6 = newRow.insertCell(5);

  cell6.innerHTML = `<button class="btngreen"
    onClick="EditData(this)">
    Edit</button> <button class="btnred"
     onClick= "onDelete(this)">Delete</button>`;
}

function preventFormSubmit(event) {
  event.preventDefault();
  // Add code to handle form submission
}

function resetFields() {
  document.querySelector('[data-testid="firstname"]').value = "";
  document.querySelector('[data-testid="lastname"]').value = "";
  document.querySelector('[data-testid="employeid"]').value = "";
  document.querySelector('[data-testid="title"]').value = "";
  document.querySelector('[data-testid="salary"]').value = "";
  selectRow = null;
}

function EditData(td) {
  selectRow = td.parentElement.parentElement;
  document.querySelector('[data-testid="firstname"]').value =
    selectRow.cells[0].innerHTML;
  document.querySelector('[data-testid="lastname"]').value =
    selectRow.cells[1].innerHTML;
  document.querySelector('[data-testid="employeid"]').value =
    selectRow.cells[2].innerHTML;
  document.querySelector('[data-testid="title"]').value =
    selectRow.cells[3].innerHTML;
  document.querySelector('[data-testid="salary"]').value =
    selectRow.cells[4].innerHTML;
}

function updateRecord(formData) {
  selectRow.cells[0].innerHTML = formData.Firstname;
  selectRow.cells[1].innerHTML = formData.lastname;
  selectRow.cells[2].innerHTML = formData.employeID;
  selectRow.cells[3].innerHTML = formData.title;
  selectRow.cells[4].innerHTML = formData.Salary;
}

function checkEmptyfields() {
  return (
    document.querySelector('[data-testid="firstname"]').value === "" &&
    document.querySelector('[data-testid="lastname"]').value === "" &&
    document.querySelector('[data-testid="employeid"]').value === "" &&
    document.querySelector('[data-testid="title"]').value === "" &&
    document.querySelector('[data-testid="salary"]').value === ""
  );
}

function onDelete(td) {
  // Get the row containing the button that was clicked
  let row = td.parentElement.parentElement;

  // Delete the row from the table
  document.getElementById("employedata").deleteRow(row.rowIndex);
}
