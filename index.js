// Get DOM
const title = document.querySelector("#title");
const todoList = document.querySelector("#todoList");
const todoInput = document.querySelector("#typeTask");
const addTodo = document.querySelector(".todoForm");

const tasks = [];
const allTasks = document.querySelector("li");

const searchInput = document.querySelector("#searchInput");

const completeBanner = document.querySelector(".allDone");

// define variables
let array = [];
let labels;
let icons;
let isComplete = true;

// Build out function
function addList(e) {
  e.preventDefault();
  const text = todoInput.value;
  const newTask = {
    text,
    done: false,
  };
  tasks.push(newTask);
  createNewLi(newTask.text);
  console.log(this);
  this.reset();
}

// Edit task
// function editTask(e) {
//   if (e.keyCode === 13) {
//     console.log("Enter");
//   }
// }

// Delete task (done)
function taskDone() {
  const done = this.parentNode;
  const doneText = this.parentNode.querySelector("span").textContent;
  confirm("Are you sure you've done this task?");
  todoList.removeChild(done);
  for (let i = 0; i < array.length; i++) {
    if (array[i] == doneText) array.splice(i, 1);
  }
  checkAllDoneOrNot(array);
}

function checkAllDoneOrNot(array) {
  if (array.length != undefined) {
    isComplete = false;
    completeBanner.classList.remove("show");
  }
  if (isComplete || array.length === 0) {
    console.log("it works");
    completeBanner.classList.add("show");
  }
}

// Create new li (task)
function createNewLi(task) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const icon = document.createElement("i");
  span.textContent = task;
  if (span.textContent == "") {
    alert("Error! Enter your task correctly!");
    return;
  }
  span.contentEditable = true;
  span.classList.add("highlight");
  icon.classList.add("far");
  icon.classList.add("fa-trash-alt");
  li.append(span);
  li.append(icon);
  todoList.append(li);
  updateList(task);
  checkAllDoneOrNot(array);
}

function getMatches(val, remainTasks) {
  return remainTasks.filter((task) => {
    const regex = new RegExp(val, "gi");
    return task.match(regex);
  });
}

function updateList(task) {
  array.push(task);
  addIconsTaskDone();
}

function addSpanEditTask() {
  const labels = document.querySelectorAll("li");
  labels.forEach((task) => task.addEventListener("keyup", editTask));
}

function addIconsTaskDone() {
  const icons2 = document.querySelectorAll(".fa-trash-alt");
  icons2.forEach((icon) => icon.addEventListener("click", taskDone));
}

function displayAnswers() {
  const val = this.value;
  const searchResult = getMatches(val, array);

  console.log(searchResult);

  const newHtml = searchResult
    .map((task) => {
      const regex = new RegExp(this.value, "gi");
      const taskName = task.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      return `
      <li>
        <span class="highlight" contenteditable="true">${taskName}</span>
        <i class="far fa-trash-alt"></i>
      </li>
    `;
    })
    .join("");
  todoList.innerHTML = newHtml;
  addIconsTaskDone();
  checkAllDoneOrNot(array);
}

// Hook up the event
addTodo.addEventListener("submit", addList);

searchInput.addEventListener("change", displayAnswers);
searchInput.addEventListener("keyup", displayAnswers);

window.addEventListener("DOMContentLoaded", checkAllDoneOrNot);
