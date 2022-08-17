// Location Global Variables
var home = document.getElementById("home");
var scores = document.getElementById("scores");
var homeButton = document.getElementById("homeButton");

// Timer Global Variables
var websiteCountdown = document.getElementById("time");

// Scoreboard Global Variables
var initialInput = document.querySelector("#initial-text");
var scoreForm = document.querySelector("#score-form");
var scoreList = document.querySelector("#score-list");
var topScoreSpan = document.querySelector("#top-score");
var todos = [];

// Countdown Timer
var myTimer;
   function clock() {
     myTimer = setInterval(myClock, 1000);
     var c = 5;

     function myClock() {
       websiteCountdown.innerHTML = --c;
       if (c == 0) {
         clearInterval(myTimer);
         websiteCountdown.innerHTML = "Finished";
       }
     }
   }

function gotoHome() {
  home.style.display = "block";
  scores.style.display = "none";
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

    scoreList.appendChild(li);
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
