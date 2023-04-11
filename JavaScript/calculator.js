class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }
    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1); // Slices final digit from the number
    }
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes(".")) return; // Won't add > 1 decimal point to answer
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand==="") return; // Won't replace previous operand if nothing written in new operand
        if (this.previousOperand!=="") { 
            this.compute(); //Performs operation on current and previous operand when function called if both aren't empty
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    compute() {
        let computation;
        const previous = parseFloat(this.previousOperand); // Converts inputs to floats before operations are done on them
        const current = parseFloat(this.currentOperand);
        if (isNaN(previous) || isNaN(current)) return; // Ends computation if either aren't filled in
        switch(this.operation) {
            case "+":
                computation = previous+current;
                break;
            case "-":
                computation = previous-current;
                break;
            case "*":
                computation = previous*current;
                break;
            case "/":
                computation = previous/current;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = "";
    }

    getDisplayNumber(number) {
        const floatNumber = parseFloat(number);
        if (isNaN(floatNumber)) return "";
        return floatNumber.toLocaleString("en");
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`
        }
        else {
            this.previousOperandTextElement.innerText = "";
        }
    }
}

const numberButtons = document.querySelectorAll("[data-number]") // Gets all number elements
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButtons = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector("[data-previous-operand]");
const currentOperandTextElement = document.querySelector("[data-current-operand]");

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);
numberButtons.forEach(button => {
    button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
    });
});
operationButtons.forEach(button => {
    button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
    });
});

equalsButtons.addEventListener("click", () => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
})