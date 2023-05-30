"use strict";

const inputTags = document.querySelectorAll("input");
const addButton = document.querySelector("#add");
const container = document.querySelector(".container");
const totalSpendEl = document.querySelector(".spend-amount");
const deleteEL = document.querySelectorAll(".delete-btn");
totalSpendEl.innerHTML = ``;
let totalAmount = 0;
totalSpendEl.innerHTML = `£${0}`;
// function to update total spending:
// deleteEL.forEach((button) => {
//   button.addEventListener("click", function (e) {
//     e.preventDefault();
//     const grandParentTracker = button.closest(".ticket-info").parentNode;
//     grandParentTracker.remove();
//   });
// });
//
// button to click and add the inputs to the rows
addButton.addEventListener("click", function (e) {
  e.preventDefault();
  // declare empty array to insert details
  const values = [];
  // for each loop to push all the values to the array
  inputTags.forEach((input) => {
    values.push(input.value);
    input.value = "";
  });
  // destructuring to allow me to access each value independently
  const [eventName, eventDate, venue, booking, section, row, seats, cost] =
    values;
  // the html i will be appending each time using string literals
  const rowHtml = `

    <div class="tracker">
        <div class="ticket-info">
        <div class="row">
        <p>${eventName}</p>
      </div>
      <div class="row">
        <p>${eventDate}</p>
      </div>
      <div class="row">${venue}</div>
      <div class="row">${booking}</div>
      <div class="row">${section}</div>
      <div class="row">${row}</div>
      <div class="row">${seats}</div>
      <div class="row">${cost}</div>
      <div class="row"><button class="delete-btn">Delete</button></div>
        </div>
    </div>`;
  container.insertAdjacentHTML("beforeend", rowHtml);
  const deleteButton = container.lastElementChild.querySelector(".delete-btn");
  deleteButton.addEventListener("click", function (e) {
    e.preventDefault();
    const grandParentTracker = deleteButton.closest(".tracker");
    grandParentTracker.remove();
  });

  console.log(values);
  const updateTotalSpend = function () {
    const costNum = Number(cost);
    console.log(costNum);
    if (!isNaN(costNum)) {
      totalAmount += costNum;
      totalSpendEl.innerHTML = `£${totalAmount}`;
    }
  };
  updateTotalSpend();
});

// deleteEL.forEach((button) => {
//   button.addEventListener("click", function (e) {
//     e.preventDefault();
//     const grandParentTracker = button.closest(".tracker").parentNode;
//     grandParentTracker.remove();
//   });
// });

/*
<div class="tracker">
        <!-- this is the container for each row -->
        <div class="ticket-info">
          <!-- these are the columns but confusingly called row for now -->
          <div class="row">
            <p>Peter Kay</p>
          </div>
          <div class="row">
            <p>Event Date</p>
          </div>
          <div class="row">Venue</div>
          <div class="row">Booking Reference</div>
          <div class="row">Section</div>
          <div class="row">Row</div>
          <div class="row">Seateds</div>
          <div class="row">Total Cost</div>
        </div>
      </div>







*/
