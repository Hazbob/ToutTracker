"use strict";

const inputTags = document.querySelectorAll("input");
const addButton = document.querySelector("#add");
const container = document.querySelector(".container");
const totalSpendEl = document.querySelector(".spend-amount");
totalSpendEl.innerHTML = "£0";
let totalAmount = 0;

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
  const deleteButton = container.lastElementChild.querySelector(".delete-btn");
  deleteButton.addEventListener("click", function (e) {
    e.preventDefault();
    const parentRow = deleteButton.closest(".tracker");
    const costElement = parentRow.querySelector(".cost");
    const cost = parseFloat(costElement.textContent);
    parentRow.remove();
    updateTotalSpend(-cost);
  });

  const updateTotalSpend = function (cost) {
    totalAmount += cost;
    totalSpendEl.innerHTML = `£${totalAmount.toFixed(2)}`;
  };

  const costNum = parseFloat(cost);
  if (!isNaN(costNum)) {
    updateTotalSpend(costNum);
  }
});
