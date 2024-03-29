const b = document.querySelector(".ldBar");
const bar = new ldBar(b);
let intervalID;
//declare question class
class Question {
  constructor(prompt, choices, answer) {
    this.prompt = prompt;
    this.choices = choices;
    this.answer = answer;
  }

  //check correct guess
  checkAnswer(guess) {
    return guess === this.answer;
  }
}

//Declare quiz class

class Quiz {
  constructor(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
  }

  // return current question's index
  getQIndex = () => {
    return this.questions[this.questionIndex];
  };

  // check if quiz has ended
  quizOver = () => {
    return this.questionIndex >= this.questions.length;
  };

  // handle current guess
  handleGuess = guess => {
    if (this.getQIndex().checkAnswer(guess)) {
      this.score++;
      this.questionIndex++;
      addContent();
      // set conditional so timeout doesn't run twice
    } else if (guess === "") {
      this.questionIndex++;
      addContent();
      // set conditional for wrong guess with message
    } else {
      const el = document.createElement("p");
      el.classList.add("message");
      el.appendChild(
        document.createTextNode(
          `Sorry! "${myQuiz.getQIndex().answer}" was the correct answer.`
        )
      );
      document.querySelector(".main").appendChild(el);
      // set timeout before incrementing question index and moving to next question
      setTimeout(() => {
        this.questionIndex++;
        addContent();
      }, 1250);
    }
  };

  resetGame = () => {
    this.questionIndex = 0;
    // show timer display
    document.querySelector(".quarter").style.display = "";
    // add question + main divs back into DOM
    document.querySelector(
      ".container-main"
    ).innerHTML = `<div id="questionText">
          <h3 class="question"></h3>
        </div><div class="main"></div>`;
    // remove reset button
    document
      .querySelector(".content")
      .removeChild(document.querySelector("#resetDiv"));
    addContent();
  };
}

// declare array of questions using question constructor

const questions = [
  new Question(
    "What did Apple just announce at WWDC 2019?",
    ["a new iPhone", "a new iPad mini", "a new monitor stand", "VR glasses"],
    "a new monitor stand"
  ),
  new Question(
    "Which version of Windows is better?",
    ["XP", "ME", "2000", "Vista"],
    "XP"
  ),
  new Question("Mac or PC?", ["Mac", "PC", "Mac", "PC"], "Mac"),
  new Question(
    "What was the world's first web browser?",
    ["WorldWideWeb", "NeXT", "Mosaic", "Netscape"],
    "WorldWideWeb"
  ),
  new Question(
    "How do you pronounce .gif?",
    ["Gif with a hard G sound", "Jif with a soft G sound", "Either", "Neither"],
    "Gif with a hard G sound"
  ),
  new Question(
    "What was youTube's initial purpose?",
    [
      "An aggregator for videos",
      "A napster-clone",
      "An early netflix",
      "A video dating app"
    ],
    "A video dating app"
  ),
  new Question(
    "What is spearphishing?",
    [
      "A form of fishing",
      "spam phone calls",
      "spam snail mail",
      "targeted email spam"
    ],
    "targeted email spam"
  ),
  new Question(
    "What bad password may have once been used for U.S. Nuclear Missiles?",
    ["password", "1234567", "00000000", "america"],
    "00000000"
  ),
  new Question(
    "Why was Amazon changed from it's original name of Cadabra?",
    [
      "Jeff Bezos didn't like Harry Potter",
      "A comes first in the alphabet",
      "Many books are made in Brazil",
      "Jeff Bezos always loved the Amazon Rainforest"
    ],
    "A comes first in the alphabet"
  ),
  new Question(
    "Which is the strongest password?",
    [
      "Password!1",
      "asldghlkh29629",
      "book phone chair pencil battery",
      "Ag%712G3*"
    ],
    "book phone chair pencil battery"
  )
];
// create new Quiz object using questions array as argument
const myQuiz = new Quiz(questions);

// set eventlistener to run addContent when DOM is fully loaded
document.addEventListener("DOMContentLoaded", addContent);

function addContent() {
  // check if quiz has ended and append results + reset button
  if (myQuiz.quizOver()) {
    bar.set(100);
    getResults();
    const resetBtn = document.createElement("button");
    const resetDiv = document.createElement("div");
    resetBtn.textContent = "Reset Game";
    resetDiv.style.display = "flex";
    resetDiv.style.justifyContent = "center";
    resetDiv.style.alignItems = "center";
    resetDiv.id = "resetDiv";
    resetBtn.addEventListener("click", myQuiz.resetGame);
    resetDiv.appendChild(resetBtn);
    document.querySelector(".content").appendChild(resetDiv);
  } else {
    // update status bar
    bar.set((myQuiz.questionIndex / myQuiz.questions.length) * 100);
    // write question to document
    // clear all intervals -- I know this is bad practice but I was stuck in interval hell --
    for (i = 0; i < 100; i++) {
      window.clearInterval(i);
    }
    const questionText = document.querySelector(".question");
    questionText.textContent = myQuiz.getQIndex().prompt;
    // handle timer reset
    const choiceDiv = document.querySelector(".main");
    while (choiceDiv.firstChild) {
      choiceDiv.removeChild(choiceDiv.firstChild);
    }
    // write choices to document
    const choices = myQuiz.getQIndex().choices;
    // iterate through choices and write each to document with proper id + class
    choices.forEach((choice, i) => {
      //write choices to doc
      const ltrs = ["A: ", "B: ", "C: ", "D: "];
      const el = document.createElement("button");
      el.classList.add("choice");
      el.id = "choice" + i;
      el.appendChild(document.createTextNode(ltrs[i] + choice));
      choiceDiv.appendChild(el);
      guess(`#choice${i}`, choice);
    });
    // set interval for timer countdown
    let sec = 10;
    intervalID = setInterval(() => {
      document.getElementById("timing").textContent = sec;
      sec--;
      // check if countdown is over
      if (sec < 0) {
        clearInterval(intervalID);
        // create time up message and append to DOM
        const el = document.createElement("p");
        el.classList.add("message");
        el.appendChild(
          document.createTextNode(
            `Time's up! "${myQuiz.getQIndex().answer}" was the correct answer.`
          )
        );
        document.querySelector(".main").appendChild(el);
        // wait before moving to next question
        setTimeout(() => {
          myQuiz.handleGuess("");
        }, 1250);
      }
    }, 1000);
  }
}
// declare guess function for adding event listeners to each button
function guess(id, guess) {
  const btn = document.querySelector(id);
  btn.addEventListener("click", () => {
    clearInterval(intervalID);
    myQuiz.handleGuess(guess);
  });
}

// handle endgame
function getResults() {
  document.querySelector(".quarter").style.display = "none";
  document.querySelector(
    ".container-main"
  ).innerHTML = `<div class="is-finished">
  <h1>
    Result</h1> <h2>${myQuiz.score} / ${
    myQuiz.questions.length
  }</h2><hr><br><h3>Would you like to play again?</h3>
  </div>`;
}
