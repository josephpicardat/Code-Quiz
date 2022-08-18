// Location Global Variables
var home = document.getElementById("home");
var scores = document.getElementById("scores");
var homeButton = document.getElementById("homeButton");
var highscoreButton =  document.getElementById("highscore");
var questionsBlock = document.getElementById("questions");

// Timer Global Variables
var websiteCountdown = document.getElementById("time");
var counterValue = 60

// Question Global Variables
var startBtn = document.getElementById("startButton");
var questionInput = document.getElementById("quizQuestion");
var answer1 = document.getElementById("answer1");
var answer2 = document.getElementById("answer2");
var answer3 = document.getElementById("answer3");
var answer4 = document.getElementById("answer4");

// Scoreboard Global Variables
var initialInput = document.querySelector("#initial-text");
var scoreForm = document.querySelector("#score-form");
var scoreList = document.querySelector("#score-list");
var topScoreSpan = document.querySelector("#top-score");
var todos = [];

// Important Global Variables
var totalScore = 0;
var questionNumber = 0;
var i = 0;

// Countdown Timer
var myTimer;
   function clock() {
     myTimer = setInterval(myClock, 1000);

     function myClock() {
       websiteCountdown.innerHTML = --counterValue;
       if (counterValue <= 0) {
         clearInterval(myTimer);
         websiteCountdown.innerHTML = "Finished";
       }
     }
   }

  //  function timer() {
  //   var timer = setInterval(function(){
  //       counterValue -= 1;
  //       $("#timer-value").html(counterValue)
    
  //       if (counterValue <= 0) {
  //           clearInterval(timer)
  //           displayScore()
  //       }
  //   },1000)
  //   }

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
    correctAnswer: "parentheses"
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
}

function displayQuestions(i) {
  if (i<5) {
    questionInput.innerHTML = questions[i].question;
    answer1.innerHTML = questions[i].answers[0];
    answer2.innerHTML = questions[i].answers[1];
    answer3.innerHTML = questions[i].answers[2];
    answer4.innerHTML = questions[i].answers[3];


  }
  else {
    clearInterval(myTimer)
    counterValue = 0;
    gottoScores();
  }
}

// Go to home
function gotoHome() {
  home.style.display = "flex";
  scores.style.display = "none";
  // questions.style.display = "none";
  homeButton.style.visibility = "visibile";
}

// Go to Highscores
function gottoScores() {
  home.style.display = "none";
  scores.style.display = "block";
  // questions.style.display = "none";
  homeButton.style.visibility = "visibile";
}

function renderTodos() {
  scoreList.innerHTML = "";
  topScoreSpan.textContent = todos.length;
  
  for (var i = 0; i < todos.length; i++) {
    var todo = todos[i];

    var li = document.createElement("li");
    li.textContent = todo;
    li.setAttribute("data-index", i);

    scoreList.insertBefore(li, scoreList.firstChild);
  }
}

function init() {
  var storedTodos = JSON.parse(localStorage.getItem("todos"));
  if (storedTodos !== null) {
    todos = storedTodos;
  }
  renderTodos();
}

function storeTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}
scoreForm.addEventListener("submit", function(event) {
  event.preventDefault();
  var todoText = initialInput.value.trim();
  if (todoText === "") {
    return;
  }
  todos.push(todoText);
  initialInput.value = "";
 
  storeTodos();
  renderTodos();
});

scoreList.addEventListener("click", function(event) {
  var element = event.target;
  if (element.matches("button") === true) {
    var index = element.parentElement.getAttribute("data-index");
    todos.splice(index, 1);
    storeTodos();
    renderTodos();
  }
});

init();

// Start/Destination Functions
startBtn.addEventListener("click", startQuiz);
homeButton.addEventListener("click",gotoHome);
highscoreButton.addEventListener("click",gottoScores);