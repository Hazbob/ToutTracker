"use strict";

const inputTags = document.querySelectorAll("input");
const addButton = document.querySelector("#add");
const container = document.querySelector(".container");
const totalSpendEl = document.querySelector(".spend-amount");
totalSpendEl.innerHTML = "£0";
let totalAmount = 0;

//function below is to add the inputs to the row

addButton.addEventListener("click", function (e) {
  e.preventDefault();
  const values = [];
  inputTags.forEach((input) => {
    values.push(input.value);
    input.value = "";
  });
  console.log(values);
  //array method to capitalise the first letter
  const valuesCap = values.map((word) => {
    if (word === "") return "";
    const wordCase = word
      .toLowerCase()
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join("");
    return wordCase;
  });
  console.log(valuesCap);
  //destructured so i can grab each value independently
  const [eventName, eventDate, venue, booking, section, row, seats, cost] =
    valuesCap;
  //below is the html to be inserted each time with the dynamic values
  const rowHtml = `
    <div class="tracker">
      <div class="ticket-info">
        <div class="row">${eventName}</div>
        <div class="row">${eventDate}</div>
        <div class="row">${venue}</div>
        <div class="row">${booking}</div>
        <div class="row">${section}</div>
        <div class="row">${row}</div>
        <div class="row">${seats}</div>
        <div class="row cost">${cost}</div>
        <div class="row"><button class="delete-btn">Delete</button></div>
      </div>
    </div>`;
  container.insertAdjacentHTML("beforeend", rowHtml);

  // const deleteButton = container.lastElementChild.querySelector(".delete-btn");
  // the function of adding the delete button
  const deleteButton = container.lastElementChild.querySelector(".delete-btn"); //references the last delete button each time called
  deleteButton.addEventListener("click", function (e) {
    e.preventDefault();
    const parentRow = deleteButton.closest(".tracker"); //grabs the nearest tracker element so it only deletes the row it belongs to
    const costElement = parentRow.querySelector(".cost"); //grabs the cost so i can delete from total spend
    const cost = parseFloat(costElement.textContent);
    parentRow.remove();
    updateTotalSpend(-cost); //calls update total spend but subtracts the cost that was defined when the row was created
  });
  // function to update total spend
  const updateTotalSpend = function (cost) {
    totalAmount += cost;
    totalSpendEl.innerHTML = `£${totalAmount.toFixed(2)}`;
    if (totalAmount <= 0) totalSpendEl.innerHTML = `£0`;
    checkTotal(totalSpendEl.textContent);
  };
  // this below checks to see if the cost amount is a number or not and if it is it will update the total amount spent with that

  const costNum = parseFloat(cost);
  if (!isNaN(costNum)) {
    updateTotalSpend(costNum);
  }
});
// function below is to capitalise the first letter of the word
const capitalise = function (word) {
  const split = word.toLowerCase().split("");
  const capital = split[0].toUpperCase() + split.slice(1);
  return capital.replaceAll(",", "");
};

//function to check if total spend is NaN - this will be called after each update to correct - probs a better way to do this
const checkTotal = function (totalAmountSpentEl) {
  if (totalSpendEl.textContent == `£NaN`) {
    totalAmount = 0;
    totalSpendEl.textContent = `£0`;
  }
};
//this function will allow for me to format the date to a 24/05/23
