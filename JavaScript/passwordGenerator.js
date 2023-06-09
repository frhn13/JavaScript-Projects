const characterAmountRange = document.querySelector("#characterAmountRange")
const characterAmountNumber = document.getElementById("characterAmountNumber");
const form = document.getElementById("passwordGenerator")
const passwordDisplay = document.getElementById("passwordDisplay")

const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90); // Makes array of uppercase characters
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122); // Makes array of uppercase characters
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57);
const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47).concat(arrayFromLowToHigh(58, 64)).concat(arrayFromLowToHigh(91, 96)).concat(arrayFromLowToHigh(123, 126));

characterAmountNumber.addEventListener("input", syncCharacterAmount);
characterAmountRange.addEventListener("input", syncCharacterAmount);

function syncCharacterAmount(event) { // Function sets value of input as the same for text box and slider
    const value = event.target.value
    characterAmountNumber.value = value
    characterAmountRange = value
}

form.addEventListener("submit", e => {
    e.preventDefault() // Prevents form from being  submitted
    const characterAmount = characterAmountNumber.value;
    const includeUppercase = document.getElementById("includeUppercase").checked;
    const includeNumbers = document.getElementById("includeNumbers").checked;
    const includeSymbols = document.getElementById("includeSymbols").checked;
    const password = generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols)
    passwordDisplay.textContent = password;    
})

function generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols) {
    String.fromCharCode(65) // Converts numbers into corresponding ASCII values
    let charCodes = LOWERCASE_CHAR_CODES;
    if (includeNumbers) charCodes = charCodes.concat(NUMBER_CHAR_CODES); // Adds numbers to list if numbers option selected
    if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES);
    if (includeSymbols) charCodes = charCodes.concat(SYMBOL_CHAR_CODES);
    const passwordCharacters = [];
    for (let x=0; x<characterAmount; x++) {
        const characterCode = charCodes[Math.floor(Math.random()*charCodes.length)] // Generates random number from list
        passwordCharacters.push(String.fromCharCode(characterCode)); // Converts number to ASCII value
    }
    return passwordCharacters.join("")  // Returns the password
}

function arrayFromLowToHigh(low, high) {
    const array = []
    for (let i=low; i<=high; i++) {
        array.push(i);
    }
    return array;
}