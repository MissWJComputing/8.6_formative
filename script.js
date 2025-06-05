const questions = [
  {
    question: "What Python function asks the user to type something?",
    answers: ["input", "input()"],
    concept: "inputs",
    image: "images/q1.png"
  },
  {
    question: "What symbol is used to assign a value to a variable?",
    answers: ["=","equals"],
    concept: "assignment",
    image: "images/q2.png"
  },
  {
    question: "What function do you use to display something on screen?",
    answers: ["print", "print()"],
    concept: "outputs",
    image: "images/q3.png"
  },
  {
    question: "Is AnsfordAcademy snake or camel case?",
    answers: ["camel", "camel case"],
    concept: "variables",
    image: "images/q4.png"
  },
  {
    question: "What keyword starts a decision in Python?",
    answers: ["if"],
    concept: "selection",
    image: "images/q5.png"
  },
  {
    question: "What does this code output if the user enters 10?",
    answers: ["too young"],
    concept: "if-else",
    image: "images/q6.png"
  },
  {
    question: "What will this code output?",
    answers: ["hello nigel"],
    concept: "string concatenation",
    image: "images/q7.png"
  },
  {
    question: "What does this code output if the user types 5?",
    answers: ["7", "seven"],
    concept: "input conversion",
    image: "images/q8.png"
  },
  {
    question: "What is missing from this code?",
    answers: ["comma",",","a comma","plus","a plus","+","plus symbol"],
    concept: "syntax",
    image: "images/q9.png"
  },
  {
    question: "What keyword is used to check a second condition in an if statement?",
    answers: ["elif","else if"],
    concept: "elif logic",
    image: "images/q10.png"
  }
];

const conceptWWW = {
  inputs: "You understand how to get input from a user using input().",
  assignment: "You understand how to assign values to variables using =.",
  outputs: "You know how to show information using print().",
  variables: "You understand the rules for naming variables correctly.",
  selection: "You understand how to use if statements to make decisions.",
  "if-else": "You can follow the logic of if-else conditions.",
  "string concatenation": "You understand how to combine strings using commas or +.",
  "input conversion": "You understand how to convert input to integers using int().",
  syntax: "You understand the importance of using correct syntax in Python.",
  "elif logic": "You understand how to extend decisions using elif."
};

const conceptEBI = {
  inputs: "Go back and check how to ask users for input using input().",
  assignment: "Revise how to assign values to variables using the = symbol.",
  outputs: "Practise how to display messages and data using print().",
  variables: "Revisit the rules for naming variables – remember snake and camel!",
  selection: "Review how to use if to make a program behave differently.",
  "if-else": "Practise how if and else are used to decide between two options.",
  "string concatenation": "Check how to combine strings and variables when printing.",
  "input conversion": "Revise how to use int() to convert input to a number.",
  syntax: "Check the punctuation used in print() and other commands.",
  "elif logic": "Look at how elif adds extra conditions to if statements."
};

const challengeTasks = {
  inputs: "CHALLENGE: Write a program that asks for your name and prints a greeting.",
  assignment: "CHALLENGE: Assign your favourite colour to a variable called colour and print it.",
  outputs: "CHALLENGE: Use print() to display your name and age on one line.",
  variables: "CHALLENGE: Make a variable for your pet's name and print a sentence using it.",
  selection: "CHALLENGE: Ask the user’s age and print 'Teenager' if they are 13 or older.",
  "if-else": "CHALLENGE: Ask the user to enter a number. Print if it's even or odd using if/else.",
  "string concatenation": "CHALLENGE: Ask for a name and hobby, and print: 'Ava enjoys dancing.'",
  "input conversion": "CHALLENGE: Ask for a number and print the number multiplied by 3.",
  syntax: "CHALLENGE: Fix this line: print('Hello' name)",
  "elif logic": "CHALLENGE: Ask the user to choose red, blue, or green. Print a message for each using if, elif, else."
};

let currentQuestion = 0;
let score = 0;
let correctConcepts = [];
let incorrectConcepts = [];

const questionText = document.getElementById("question-text");
const answerInput = document.getElementById("answer-input");
const submitBtn = document.getElementById("submit-btn");
const feedback = document.getElementById("feedback");
const questionImage = document.getElementById("question-image");
const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");
const scoreDisplay = document.getElementById("score");
const wwwList = document.getElementById("www-list");
const ebiList = document.getElementById("ebi-list");
const challengeList = document.getElementById("challenge-list");

function loadQuestion() {
  const q = questions[currentQuestion];
  questionText.textContent = `Q${currentQuestion + 1}: ${q.question}`;
  answerInput.value = "";
  feedback.textContent = "";
  questionImage.src = q.image || "";
}

submitBtn.addEventListener("click", () => {
  const q = questions[currentQuestion];
  const userAnswer = answerInput.value.trim().toLowerCase();

  if (q.answers.some(ans => userAnswer === ans.toLowerCase())) {
    feedback.textContent = "Correct!";
    score++;
    if (!correctConcepts.includes(q.concept)) correctConcepts.push(q.concept);
  } else {
    feedback.textContent = `Incorrect. The correct answer was: ${q.answers[0]}`;
    if (!incorrectConcepts.includes(q.concept)) incorrectConcepts.push(q.concept);
  }

  currentQuestion++;
  if (currentQuestion < questions.length) {
    setTimeout(() => loadQuestion(), 1000);
  } else {
    setTimeout(() => showResults(), 1000);
  }
});

function showResults() {
  quizContainer.style.display = "none";
  resultContainer.style.display = "block";
  scoreDisplay.textContent = `You got ${score} out of ${questions.length}.`;

  (correctConcepts.length > 0 ? correctConcepts.slice(0, 3) : ["none"]).forEach(concept => {
    const li = document.createElement("li");
    li.textContent = conceptWWW[concept] || "You gave it a go! Keep practising all the topics.";
    wwwList.appendChild(li);
  });

  (incorrectConcepts.length > 0 ? incorrectConcepts.slice(0, 3) : ["none"]).forEach(concept => {
    const li = document.createElement("li");
    li.textContent = conceptEBI[concept] || "Excellent work – you got everything right!";
    ebiList.appendChild(li);
  });

  if (incorrectConcepts.length > 0) {
    incorrectConcepts.slice(0, 2).forEach(concept => {
      const li = document.createElement("li");
      li.textContent = challengeTasks[concept];
      challengeList.appendChild(li);
    });
  } else {
    const li = document.createElement("li");
    li.textContent = "You got full marks – try creating your own quiz!";
    challengeList.appendChild(li);
  }
}

loadQuestion();
