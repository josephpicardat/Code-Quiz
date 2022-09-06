// Location Global Variables
var home = document.getElementById("home");
var scores = document.getElementById("scores");
var homeButton = document.getElementById("homeButton");
var highscoreButton =  document.getElementById("highscore");
var questionsBlock = document.getElementById("questions");
var isItRight =  document.getElementById("isItRight");

// Timer Global Variables
var websiteCountdown = document.getElementById("time");
var counterValue = 30;

// Question Global Variables
var startBtn = document.getElementById("startButton");
var questionInput = document.getElementById("quizQuestion");
var answer1 = document.getElementById("answer1");
var answer2 = document.getElementById("answer2");
var answer3 = document.getElementById("answer3");
var answer4 = document.getElementById("answer4");
var answerBtn = document.getElementsByClassName("answers");

// Scoreboard Global Variables
var initialInput = document.querySelector("#initial-text");
var scoreForm = document.querySelector("#score-form");
var scoreList = document.querySelector("#score-list");
var topScoreSpan = document.querySelector("#top-score");
var arrayScores = [];

// Important Global Variables
var totalScore = 0;
var questionNumber = 0;
var i = 0;

// Countdown Timer
var myTimer;
function clock() {
  myTimer = setInterval(myClock, 1000);

  // Local function that displays the time and marks whether time is up or not
  function myClock() {
    websiteCountdown.innerHTML = --counterValue;

    if (counterValue <= 0) {
      clearInterval(myTimer);
      websiteCountdown.innerHTML = "Finished";
      displayQuestions(5);
    }
  }
}

// questions object
var questions = [{
  question: "A very useful tool used during development and debugging for printing content to the debugger is:",
  answers: ["Javascript", "terminal/bash", "for loops", "console.log"],
  correctAnswer: "console.log"
  },
  {
  question: "String values must be enclosed within ____ when being assigned to variables.",
  answers: ["commas", "curly brackets", "quotes", "parentheses"],
  correctAnswer: "quotes"
  },
  {
  question: "Arrays in JavaScript can be used to store _____.",
  answers: ["numbers and strings", "other arrays", "booleans", "all of the above"],
  correctAnswer: "all of the above"
  },
  {
  question: "The condition in an if /else statement is enclosed within _____.",
  answers: ["quotes", "curly brackets", "parentheses", "square brackets"],
  correctAnswer: "parentheses"
  },
  {
    question: "Commonly used data types DO NOT include:",
    answers: ["strings", "booleans", "alerts", "numbers"],
    correctAnswer: "alerts"
    }
];

// Start the Quiz
function startQuiz() {
  home.style.display = "none";
  scores.style.display = "none";
  questionsBlock.style.display = "block";
  homeButton.style.visibility = "hidden";
  highscoreButton.style.visibility = "hidden";
  displayQuestions(i);
  answerChoice();
}

var correct;
function answerChoice() {
  
  // Calculates correct and wrong anwsers
  for(let j = 0; j < answerBtn.length; j++) {
    (function(index) {
      answerBtn[index].addEventListener("click", function() {
        // Decideds if the anwser clicked is equal to the correct anwser
        if(questions[i].answers[index] === questions[i].correctAnswer && i <= 4) {
          totalScore++;
          i++
          isItRight.style.display = "flex";
          isItRight.innerHTML = "Correct!"
          displayQuestions(i);

        } else {
          totalScore;
          i++
          console.log(i);
          isItRight.style.display = "flex";
          isItRight.innerHTML = "Wrong!"
          counterValue -= 5;
          displayQuestions(i);
        }
       })
    })(j);
  }
}

// Display question funtion
function displayQuestions(i) {
  if (i<=4) {
    questionInput.innerHTML = questions[i].question;
    answer1.innerHTML = questions[i].answers[0];
    answer2.innerHTML = questions[i].answers[1];
    answer3.innerHTML = questions[i].answers[2];
    answer4.innerHTML = questions[i].answers[3];

    console.log(i);
  }
  else {
    clearInterval(myTimer)
    questionNumber = 0;
    console.log("Finished");
    console.log("Total Score: ", totalScore);
    gottoScores();
  }
}

// Go to home
function gotoHome() {
  home.style.display = "flex";
  scores.style.display = "none";
  questionsBlock.style.display = "none";
  homeButton.style.visibility = "visible";
  highscoreButton.style.visibility = "visible";
  isItRight.style.display = "none";
}

// Go to Highscores
function gottoScores() {
  home.style.display = "none";
  scores.style.display = "block";
  questionsBlock.style.display = "none";
  homeButton.style.visibility = "visible";
  highscoreButton.style.visibility = "visible";
  isItRight.style.display = "none";

  // Displays Final score
  topScoreSpan.innerHTML = totalScore;
}

// Renders scores from local storage
function renderScore() {
  scoreList.innerHTML = "";
  
  for (var k = 0; k < arrayScores.length; k++) {
    var varScores = arrayScores[k];

    var li = document.createElement("li");
    li.textContent = varScores;
    li.setAttribute("data-index", k);

    scoreList.insertBefore(li, scoreList.firstChild);
  }
}

// Retrieves scores and gets json value to be used
function init() {
  var storedScores = JSON.parse(localStorage.getItem("arrayScores"));
  if (storedScores !== null) {
    arrayScores = storedScores;
  }
  renderScore();
}

// stores scores in local storage
function storeScores() {
  localStorage.setItem("arrayScores", JSON.stringify(arrayScores));
}

// when you hit "enter" for your initial's it outputs your initial plus your score for the quiz.
scoreForm.addEventListener("submit", function(event) {
  event.preventDefault();
  const space = ": ";
  initialInput.value = `${initialInput.value}${space}${totalScore}`;
  var scoresText = initialInput.value.trim();
  if (scoresText === "") {
    return;
  }
  arrayScores.push(scoresText);
  initialInput.value = "";
 
  // Sends score + initial to be stored to local storage
  storeScores();
  // Sends score + initial to be rendered
  renderScore();
});

// Calls init() to get values from local storage
init();

// Start/Destination Functions
  startBtn.addEventListener("click", startQuiz);

  // Sends to homescreen, but also resets the values to start the quiz
  homeButton.addEventListener("click", gotoHome);
  homeButton.addEventListener("click", function(e) {
    location.reload();  
  }, false);

  // Goes to scores screen
  highscoreButton.addEventListener("click",gottoScores);