var topScores = []
let time = questions.length * 15;
let timerId = document.querySelector('#timer');
let currentQuestionIndex = 0;
// Dom elements
let startBtn = document.querySelector('#start');
let questionsElement = document.querySelector('#questions');
let timerElement = document.querySelector('#time');
let questionChoices = document.querySelector('#choices');
let nextScreen = document.getElementById("end-screen")
var quizTimer;
// Start the quiz
function startQuiz() {
  let startScreen = document.querySelector("#start-screen");
  startScreen.classList.add("hide");
  questionsElement.classList.remove("hide");
  quizTimer = setInterval(function () {
    if (time <= 0) {
    }
    time--;
    document.getElementById('timer').innerHTML = time
    if (time === 0) {
      clearInterval(quizTimer)
    }
  }, 1000);
}
function getCurrentQuestions() {
  if (currentQuestionIndex > questions.length - 1) {
    clearInterval(quizTimer)
    endScreen();
  } else {
    questionChoices.textContent = "";
    let currentQuestion = questions[currentQuestionIndex];
    console.log(currentQuestion);
    let titleElement = document.querySelector("#question-title");
    console.log(titleElement)
    titleElement.textContent = currentQuestion.title
    for (let i = 0; i < currentQuestion.choice.length; i++) {
      let choices = document.createElement("button");
      choices.classList.add("choice")
      choices.setAttribute("value", currentQuestion.choice[i]);
      choices.textContent = i + 1 + ". " + currentQuestion.choice[i];
      questionChoices.appendChild(choices)
      choices.addEventListener("click", function (event) {
        var guess = event.target.value
        let answer = currentQuestion.answer
        let rightWrong = document.querySelector("#right-wrong")
        if (guess === answer) {
          rightWrong.textContent = "correct"
          //if someguess right answer it will say correct show message after 
          //half a sec go to next next question 
        } else {
          rightWrong.textContent = "you'r a idot";
          time -= 10;
          //the wrong answer is picked it will say false time should
          //go down if wrong
        }
        currentQuestionIndex++;
        getCurrentQuestions();
      })
    }
  }
}
function endScreen() {
  questionsElement.classList.add("hide")
  nextScreen.classList.remove("hide")
  console.log(time);
  document.getElementById("final-score").textContent = time;
}
document.getElementById('submit').addEventListener("click", function () {
  console.log(document.getElementById("initials").value)
  console.log(document.getElementById("final-score").textContent)
  var currentUser = {};
  currentUser.initials = document.getElementById("initials").value
  currentUser.score = document.getElementById("final-score").textContent
  topScores.push(currentUser)
  localStorage.setItem("highscores", JSON.stringify(topScores))
})

// Show quiz questions
startBtn.addEventListener("click", startQuiz);
getCurrentQuestions();