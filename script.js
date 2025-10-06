const account = document.getElementById("account");
const cash = document.getElementById("cash");
const operationType = document.getElementById("operationType");
const amountInput = document.getElementById("amount");
const amountError = document.getElementById("amountError");
const statusBox = document.querySelector(".status-box");

function operation() {
    let accVal = parseInt(account.value);
    let cashVal = parseInt(cash.value);
    let amount = parseInt(amountInput.value);
    let op = operationType.value;

    amountError.innerText = "";
    amountInput.style.border = "1px solid #ccc";

    if (isNaN(amount) || amount <= 0) {
        const newLog = document.createElement("div");
        newLog.textContent = "Error";
        statusBox.appendChild(newLog);
        return;
    }
    if (op === "deposit") {
        if (cashVal >= amount) {
            accVal += amount;
            cashVal -= amount;
        } else {
            const newLog = document.createElement("div");
            newLog.textContent = "Error";
            statusBox.appendChild(newLog);
            return;
        }
    } else if (op === "withdraw") {
        if (accVal >= amount) {
            accVal -= amount;
            cashVal += amount;
        } else {
            const newLog = document.createElement("div");
            newLog.textContent = "Error";
            statusBox.appendChild(newLog);
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

// --------------------- ปุ่ม Change ----------------------
const changeBtn = document.querySelector(".box button");
changeBtn.addEventListener("click", () => {
    account.removeAttribute("readonly");
    cash.removeAttribute("readonly");
    account.style.border = "1px solid green";
    cash.style.border = "1px solid green";

    const newLog = document.createElement("div");
    newLog.textContent = "Now you can edit account and cash manually!";
    statusBox.appendChild(newLog);
});

// --------------------- Currency Converter ----------------------
const convertBtn = document.querySelectorAll(".box button")[2];
convertBtn.addEventListener("click", () => {
    const inputBalance = document.querySelectorAll(".box input")[2];
    const outputBalance = document.querySelectorAll(".box input")[3];
    const inputCurrency = document.querySelectorAll(".box select")[1].value;

    let inputValue = parseFloat(inputBalance.value);
    let rate = 36; // 1 USD = 36 THB
    if (inputCurrency === "USD") {
        outputBalance.value = (inputValue * rate).toFixed(2) + " THB";
    } else if (inputCurrency === "THB") {
        outputBalance.value = (inputValue / rate).toFixed(2) + " USD";
    }
});
