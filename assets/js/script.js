// Timer Global Varaibles
var websiteCountdown = document.getElementById("time");

// scoreboard Global Variables
var todoInput = document.querySelector("#todo-text");
var todoForm = document.querySelector("#todo-form");
var todoList = document.querySelector("#todo-list");
var todoCountSpan = document.querySelector("#todo-count");
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



function renderTodos() {
  todoList.innerHTML = "";
  todoCountSpan.textContent = todos.length;
  
  for (var i = 0; i < todos.length; i++) {
    var todo = todos[i];

    var li = document.createElement("li");
    li.textContent = todo;
    li.setAttribute("data-index", i);

    todoList.appendChild(li);
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
todoForm.addEventListener("submit", function(event) {
  event.preventDefault();
  var todoText = todoInput.value.trim();
  if (todoText === "") {
    return;
  }
  todos.push(todoText);
  todoInput.value = "";
 
  storeTodos();
  renderTodos();
});

todoList.addEventListener("click", function(event) {
  var element = event.target;
  if (element.matches("button") === true) {
    var index = element.parentElement.getAttribute("data-index");
    todos.splice(index, 1);
    storeTodos();
    renderTodos();
  }
});

init();
