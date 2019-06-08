const answerText = document.querySelectorAll(".answer");
const questionText = document.querySelector("#questionText");
const b = document.querySelector(".ldBar");
const bar = new ldBar(b);

let questionIndex = 0;
let correct = 0;
let incorrect = 0;

class Question {
  constructor(question, choices, answer) {
    this.question = question;
    this.choices = choices;
    this.answer = answer;
    this.getCorrectIndex = function() {
      return this.choices.indexOf(answer);
    };
  }
}

const questions = [
  new Question(
    "This is test question 1",
    ["test answer 1", "test answer 2", "test answer 3", "test answer 4"],
    "test answer 2"
  ),
  new Question(
    "This is test question 2",
    ["test answer 1", "test answer 2", "test answer 3", "test answer 4"],
    "test answer 4"
  ),
  new Question(
    "This is test question 3",
    ["test answer 1", "test answer 2", "test answer 3", "test answer 4"],
    "test answer 2"
  ),
  new Question(
    "This is test question 4",
    ["test answer 1", "test answer 2", "test answer 3", "test answer 4"],
    "test answer 1"
  ),
  new Question(
    "This is test question 5",
    ["test answer 1", "test answer 2", "test answer 3", "test answer 4"],
    "test answer 1"
  ),
  new Question(
    "This is test question 6",
    ["test answer 1", "test answer 2", "test answer 3", "test answer 4"],
    "test answer 1"
  )
];

document.addEventListener(
  "DOMContentLoaded",
  populate(questions[questionIndex])
);

function populate(question) {
  if (questionIndex > 0) {
    answerText.forEach(choice =>
      choice.removeEventListener("click", handleClick(e))
    );
  }
  bar.set(((questionIndex + 1) / questions.length) * 100);
  console.log(`questionIndex: ${questionIndex}`);
  questionText.textContent = question.question;
  answerText.forEach((choice, index) => {
    choice.textContent = question.choices[index];
    choice.addEventListener("click", handleClick(e));
  });
}

function handleNext() {
  populate(questions[questionIndex]);
}

function handleEnd() {
  questionText.textContent = `Quiz Over. You had ${correct} answers correct and ${incorrect} answers incorrect.`;
}

function handleClick(e) {
  if (e.target.textContent === question.answer) {
    correct++;
    console.log(`Correct: ${correct}`);
  } else {
    incorrect++;
    console.log(`Incorrect: ${incorrect}`);
  }
  questionIndex++;
  if (questionIndex / questions.length !== 1) {
    handleNext();
  } else {
    handleEnd();
  }
}
