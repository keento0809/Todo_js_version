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
// test localStorage
let array = JSON.parse(localStorage.getItem("array"));
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
  if (newTask.text == "") {
    alert("Error! Enter your task correctly!");
    return;
  }
  checkArray(array);
  updateList(newTask.text);
  // test
  localStorage.setItem("array", JSON.stringify(array));
  populateList(array);
  addIconsTaskDone();
  this.reset();
}

// Delete task (done)
function taskDone() {
  const done = this.parentNode;
  const doneText = this.parentNode.querySelector("span").textContent;
  confirm("Are you sure you've done this task?");
  todoList.removeChild(done);
  for (let i = 0; i < array.length; i++) {
    if (array[i] == doneText) array.splice(i, 1);
  }
  // test localStorage
  localStorage.setItem("array", JSON.stringify(array));
  checkAllDoneOrNot(array);
}

// Check all tasks are done or not
function checkAllDoneOrNot(array) {
  checkArray(array);
  if (array.length != undefined) {
    isComplete = false;
    completeBanner.classList.remove("show");
  }
  if (isComplete || array.length === 0) {
    completeBanner.classList.add("show");
  }
}

function checkArray(array) {
  if (array.length == 0) {
    array = [];
    return array;
  } else {
    array = JSON.parse(localStorage.getItem("array"));
    return array;
  }
}

// display array
function populateList(array) {
  checkArray(array);
  checkAllDoneOrNot(array);
  todoList.innerHTML = array
    .map((task) => {
      return `
      <li>
        <span class="highlight" contenteditable="true">${task}</span>
        <i class="far fa-trash-alt"></i>
      </li>
    `;
    })
    .join("");
  addIconsTaskDone();
}

function getMatches(val, remainTasks) {
  return remainTasks.filter((task) => {
    const regex = new RegExp(val, "gi");
    return task.match(regex);
  });
}

function updateList(task) {
  array.push(task);
}

function addIconsTaskDone() {
  const icons2 = document.querySelectorAll(".fa-trash-alt");
  icons2.forEach((icon) => icon.addEventListener("click", taskDone));
}

function displayAnswers() {
  const val = this.value;
  checkArray(array);
  const searchResult = getMatches(val, array);

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

console.log(array.length);
checkArray(array);
populateList(array);
