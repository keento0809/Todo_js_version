// Get DOM
const title = document.querySelector("#title");
const todoList = document.querySelector("#todoList");
const todoInput = document.querySelector("[type=text]");
const todoForm = document.querySelector(".todoForm");
const addButton = document.querySelector("#submit");

// Build out function
function addList(e) {
  e.preventDefault();
  const newTask = todoInput.value;
  createNewLi(newTask);
}

function createNewLi(task) {
  const li = document.createElement("li");
  li.textContent = task;
  todoList.append(li);
}

// Hook up the event
todoForm.addEventListener("submit", addList);
// todoInput.addEventListener("change", addList);
