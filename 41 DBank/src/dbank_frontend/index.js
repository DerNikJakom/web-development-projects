import { dbank_backend } from "../declarations/dbank_backend";

console.log("===== inside index.js =====");

window.addEventListener("load", async function () {
  const currentAmount = await dbank_backend.checkBalance();
  update();

  //console.log("finished loading site");
});

document
  .querySelector("form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    //console.log("form submitted");

    const button = event.target.querySelector("#submit-btn");
    const topUpElement = document.getElementById("input-amount");
    const withdrawElement = document.getElementById("withdrawal-amount");

    const inputAmount = parseFloat(topUpElement.value);
    const outputAmount = parseFloat(withdrawElement.value);

    button.setAttribute("disabled", true);

    if (topUpElement.value.length != 0) {
      await dbank_backend.topUp(inputAmount);
    } else if (withdrawElement.value.length != 0) {
      await dbank_backend.withdraw(outputAmount);
    }

    await dbank_backend.compound();

    update();

    // reset frontend
    topUpElement.value = "";
    withdrawElement.value = "";
    button.removeAttribute("disabled");
  });

async function update() {
  const currentAmount = await dbank_backend.checkBalance();
  document.getElementById("value").innerHTML =
    Math.round(currentAmount * 100) / 100;
}
