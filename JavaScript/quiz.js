const startButton = document.getElementById("start-button");
const questionContainerElement = document.getElementById("question-container")
const questionElement = document.querySelector("#question");
const answerButtons = document.querySelector("#answer-buttons")
const nextButton = document.getElementById("next-button");

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame)
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    setNextQuestion();
})

function startGame() {
    startButton.classList.add("hide") // Hides the start button by adding hide class
    shuffledQuestions = questions.sort(()=>Math.random()-0.5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove("hide") // Removes hide from the class list so the questions appear
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
    
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("button");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body) // Correct or wrong class removed from body when going to next question
    nextButton.classList.add("hide");
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(event) {
    const selectedButton = event.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtons.children).forEach(button=> {
        setStatusClass(button, button.dataset.correct);
    })
    if (shuffledQuestions.length > currentQuestionIndex+1) {
        nextButton.classList.remove("hide");
    }
    else {
        startButton.innerText = "Restart"; // Inner text can replace innerHTML
        startButton.classList.remove("hide");
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add("correct");
    }
    else {
        element.classList.add("wrong");
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
}

const questions = [
    {question: "What is 2+2?",
    answers: [
        {text: "4", correct: true},
        {text: "22", correct: false},
        {text: "33", correct: false}
    ]},
    {question: "What is 4+4?",
    answers: [
        {text: "6", correct: false},
        {text: "7", correct: false},
        {text: "8", correct: true},
        {text: "9", correct: false}
    ]},
    {question: "What is 8+8?",
    answers: [
        {text: "8", correct: true},
        {text: "16", correct: true},
        {text: "32", correct: false},
        {text: "44", correct: false}
    ]}    
]