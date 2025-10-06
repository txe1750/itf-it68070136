const account = document.getElementById("account");
const cash = document.getElementById("cash");
const operationType = document.getElementById("operationType");
const amountInput = document.getElementById("amount");
const statusBox = document.querySelector(".status-box");

function operation() {
    let accVal = parseInt(account.value);
    let cashVal = parseInt(cash.value);
    let amount = parseInt(amountInput.value);
    let op = operationType.value;

    if (isNaN(amount) || amount <= 0) {
        error(0);
        return;
    }
    if (op === "deposit") {
        if (cashVal >= amount) {
            accVal += amount;
            cashVal -= amount;
        } else {
            error(1);
            return;
        }
    } else if (op === "withdraw") {
        if (accVal >= amount) {
            accVal -= amount;
            cashVal += amount;
        } else {
            error(2);
            return;
        }
    }
    account.value = accVal;
    cash.value = cashVal;

    const newLog = document.createElement("div");
    newLog.textContent = `${op.toUpperCase()} ${amount} => Account: ${accVal}, Cash: ${cashVal}`;
    statusBox.appendChild(newLog);
    amountInput.value = "";
}

function error(e) {
    const newLog = document.createElement("div");
    if (e == 0) {
        newLog.textContent = "Error, Please enter amount again";
    } else if (e == 1) {
        newLog.textContent = "Couldn't deposit entered balance.";
    } else if (e == 2) {
        newLog.textContent = "Couldn't withdraw entered balance.";
    }
    statusBox.appendChild(newLog);
}

const changeBtn = document.querySelector(".box1 button");
changeBtn.addEventListener("click", () => {
    account.removeAttribute("readonly");
    cash.removeAttribute("readonly");
    const newLog = document.createElement("div");
    newLog.textContent = "Now you can edit account and cash";
    statusBox.appendChild(newLog);
});

function convert() {
    const inputBalance = document.getElementById("input-balance");
    const outputBalance = document.getElementById("output-balance");
    const type = document.getElementById("convert-type");

    let inputValue = parseFloat(inputBalance.value);
    if (isNaN(inputValue)) inputValue = 0;

    const inputCurrency = type.value.toLowerCase();
    const rate = 32.43;
    if (inputCurrency === "usd") {
        outputBalance.value = (inputValue * rate).toFixed(2);
    } else if (inputCurrency === "thb") {
        outputBalance.value = (inputValue / rate).toFixed(2);
    }
}
