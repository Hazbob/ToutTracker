"use strict";

const inputTags = document.querySelectorAll("input");
const addButton = document.querySelector("#add");
const container = document.querySelector(".container");
const totalSpendEl = document.querySelector(".spend-amount");

totalSpendEl.innerHTML = ``;
let totalAmount = 0;

console.log(inputTags);
addButton.addEventListener("click", function (e) {
  e.preventDefault();
  const values = [];
  inputTags.forEach((input) => {
    values.push(input.value);
    input.value = "";
  });
  const [eventName, eventDate, venue, booking, section, row, seats, cost] =
    values;
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
        </div>
    </div>`;
  container.insertAdjacentHTML("beforeend", rowHtml);
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
