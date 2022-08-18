// Location Global Variables
var home = document.getElementById("home");
var scores = document.getElementById("scores");
var homeButton = document.getElementById("homeButton");
var highscoreButton =  document.getElementById("highscore");

// Timer Global Variables
var websiteCountdown = document.getElementById("time");
var counterValue = 60

// Scoreboard Global Variables
var initialInput = document.querySelector("#initial-text");
var scoreForm = document.querySelector("#score-form");
var scoreList = document.querySelector("#score-list");
var topScoreSpan = document.querySelector("#top-score");
var todos = [];

// 

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
questions = [{
  question: "A very useful tool used during development and debugging for printing content to the debugger is:",
  choices: ["Javascript", "terminal/bash", "for loops", "console.log"],
  correctAnswer: "console.log"
  },
  {
  question: "String values must be enclosed within ____ when being assigned to variables.",
  choices: ["commas", "curly brackets", "quotes", "parentheses"],
  correctAnswer: "quotes"
  },
  {
  question: "Arrays in JavaScript can be used to store _____.",
  choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
  correctAnswer: "all of the above"
  },
  {
  question: "The condition in an if /else statement is enclosed within _____.",
  choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
  correctAnswer: "parentheses"
  },
  {
    question: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    correctAnswer: "parentheses"
    }
];

// Start the Quiz
function startQuiz() {
  home.style.display = "none";
  scores.style.display = "none";
  questions.style.display = "block";
  homeButton.style.visibility = "hidden";
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
homeButton.addEventListener("click",gotoHome);
highscoreButton.addEventListener("click",gottoScores);
