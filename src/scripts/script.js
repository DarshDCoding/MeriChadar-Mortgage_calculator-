console.log("Radhe Radhe...");

import { isNumberic } from "./stringCheck.js";
import mortgagePayments from "./mortgageCalculation.js";

const baseAmountInput = document.getElementById("js-base-amount-input");
const termInput = document.getElementById("js-term-input");
const rateInput = document.getElementById("js-rate-input");

const repaymentType = document.getElementById("repaymenttype");
const interestType = document.getElementById("intresttype");
const radioInputs = document.querySelectorAll(".radio_input");

const form = document.getElementById("form");
const clearAll = document.querySelector(".clearAll-btn");

const addCheck = (event) =>
  event.target.parentNode.classList.add("active-input");
const removeCheck = (event) =>
  event.target.parentNode.classList.remove("active-input");

  const resultTab = document.querySelector(".result");
  const rightEmptySection = document.querySelector(".right-empty-section");
  const rightResultSection = document.querySelector(".right-result-section")


const elementArray = [baseAmountInput, termInput, rateInput];
const checkpointArray = [repaymentType, interestType];

// baseAmountInput.addEventListener("focusin", event=>addCheck(event))
// baseAmountInput.addEventListener("focusout",event=>removeCheck(event))
// termInput.addEventListener("focusin",event=> addCheck(event))
// termInput.addEventListener("focusout",event=>removeCheck(event))
// rateInput.addEventListener("focusin",event=>addCheck(event))
// rateInput.addEventListener("focusout",event=>removeCheck(event))

elementArray.forEach((element) =>
  element.addEventListener("focusin", (event) => addCheck(event))
);
elementArray.forEach((element) =>
  element.addEventListener("focusout", (event) => removeCheck(event))
);

// Function to handle radio button selection
radioInputs.forEach((input) => {
  input.addEventListener("change", () => {
    if (input.value === "repayment") {
      repaymentType.classList.add("active-check");
      interestType.classList.remove("active-check");
    } else if (input.value === "intrest-only") {
      interestType.classList.add("active-check");
      repaymentType.classList.remove("active-check");
    }
  });
});

//removing all custom error alerts on Clear All
clearAll.addEventListener("click", () => {
  checkpointArray.forEach((element) =>
    element.classList.remove("active-check")
  );
  elementArray.forEach((element) =>
    element.parentNode.classList.remove("error-input")
  );
  document
    .querySelectorAll(".alert")
    .forEach((alert) => alert.classList.add("dissapear"));
    
    //switching right tab to empty
    resultTab.classList.remove("justify-start")
    rightEmptySection.classList.remove("dissapear")
    rightResultSection.classList.add("dissapear")  
  });

for (const element of elementArray) {
  element.addEventListener("keyup", (event) => {
    const alertElement =
      event.target.parentNode.parentNode.querySelector(".alert");
    const parentElemnt = event.target.parentNode;
    const alertMessage = "Enter numbers only";
    if (isNumberic(String(element.value)) || element.value.length == 0) {
      alertElement.innerText = "This field is required";
      alertElement.classList.add("dissapear");
      parentElemnt.classList.remove("error-input");
      // element.value = parseFloat(element.value).toLocaleString()
    } else {
      alertElement.innerText = alertMessage;
      alertElement.classList.remove("dissapear");
      parentElemnt.classList.add("error-input");
    }
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("entered flag.1");

  let errorHandled = false;
  console.log("processing flag.2");

  if (!errorHandled) {
    console.log("handeling error flag.3");

    let foundError = false;

    //handeling errors...
    elementArray.forEach((event) => {
      console.log("checking input fields flag.4");

      const parentElement = event.parentNode;
      const errorElement = parentElement.parentNode.lastChild.previousSibling;

      if (event.value.length <= 0) {
        console.log("input field error found flag.5");
        parentElement.classList.add("error-input");
        errorElement.classList.remove("dissapear");
        foundError = true;
      } else {
        console.log("no input filed error flag.6 ");
        event.parentNode.classList.remove("error-input");
        errorElement.classList.add("dissapear");
      }
    });

    const radioAlert =
      document.querySelector(".radio").lastChild.previousSibling;
    try {
      const val = document.querySelector(
        'input[name="mortagetype"]:checked'
      ).value;
      console.log("no checkbox error flag.7");
      radioAlert.classList.add("dissapear");
    } catch (e) {
      console.log("checkbox error found flag.8 ");
      radioAlert.classList.remove("dissapear");
      console.log("stopping further process as error is found...");
      return;
    }
    console.log("all test completed");

    if (foundError) {
      console.log("Stopping further process as error is found...");
      return;
    }

    // switching right tab to result
    resultTab.classList.add("justify-start")
    rightEmptySection.classList.add("dissapear")
    rightResultSection.classList.remove("dissapear")
  }

  const resultValueMessage = document.getElementById("result-value-message")
  const actualAmount = document.getElementById("actual-amount")
  const totalAmount = document.getElementById("total-amount")


  const amount = Number(baseAmountInput.value);
  const term = Number(termInput.value);
  const rate = Number(rateInput.value);
  const type = document.querySelector(
    'input[name="mortagetype"]:checked'
  ).value;
  let result = mortgagePayments(amount, term, rate)
  console.log(result)

  if (type == "repayment"){
    actualAmount.innerText = `£${parseFloat((result.repayment).toFixed(2)).toLocaleString()}`
  }else if (type == "intrest-only"){
    actualAmount.innerText = `£${parseFloat((result.intrestOnly).toFixed(2)).toLocaleString()}`
  }
  totalAmount.innerText = `£${parseFloat((result.repayOverTerm).toFixed(2)).toLocaleString()}` 
});