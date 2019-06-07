class Question {
  constructor(question, answers, correct) {
    this.question = question;
    this.answers = answers;
    this.correct = correct;
    this.getCorrectIndex = function() {
      return this.answers.indexOf(correct);
    };
  }
}

const questions = [
  new Question(
    "This is a test question",
    ["test answer 1", "test answer 2", "test answer 3", "test answer 4"],
    "test answer 2"
  ),
  new Question(
    "This is a test question",
    ["test answer 1", "test answer 2", "test answer 3", "test answer 4"],
    "test answer 4"
  ),
  new Question(
    "This is a test question",
    ["test answer 1", "test answer 2", "test answer 3", "test answer 4"],
    "test answer 2"
  ),
  new Question(
    "This is a test question",
    ["test answer 1", "test answer 2", "test answer 3", "test answer 4"],
    "test answer 1"
  )
];

function populate() {}
