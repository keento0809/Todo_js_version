// Get DOM
const title = document.querySelector("#title");
const todoList = document.querySelector("#todoList");
const todoInput = document.querySelector("#typeTask");
const addTodo = document.querySelector(".todoForm");

const tasks = [];
const allTasks = document.querySelector("li");

const searchInput = document.querySelector("#searchInput");

// const deleteIcon = document.querySelectorAll(".fa-trash-alt");

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
  todoInput.value = "";
}

// Edit task
function editTask(e) {
  console.log(e);
  if (e.keyCode === 13) {
    console.log("Enter");
  }
  // const newText = this.querySelector("label").textContent;
  // console.log(newText);
}

// Delete task (done)
function taskDone() {
  // console.log(this.parentNode.querySelector("span").textContent);
  const done = this.parentNode;
  const doneText = this.parentNode.querySelector("span").textContent;
  console.log(doneText);
  confirm("Are you sure you've done this task?");
  todoList.removeChild(done);
  for (let i = 0; i < array.length; i++) {
    if (array[i] == doneText) array.splice(i, 1);
  }
  // allDoneNotification(array);
}

function allDoneNotification(array) {
  const complete = document.createElement("h2");
  complete.textContent = "All tasks done!";

  if (array.length === 0) {
    todoList.append(complete);
  } else if (array.length >= 1) {
    todoList.removeChild(complete);
  }
}

// Create new li (task)
function createNewLi(task) {
  // allDoneNotification(array);
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
  console.log(array.length);
}

function getMatches(val, remainTasks) {
  return remainTasks.filter((task) => {
    const regex = new RegExp(val, "gi");
    return task.match(regex);
  });
}

let array = [];
let labels;
let icons;

function updateList(task) {
  array.push(task);
  console.log(array.length);
  // labels = document.querySelectorAll("li");
  // icons = document.querySelectorAll(".fa-trash-alt");
  /* Temporary comment out */
  // labels.forEach((task) => task.addEventListener("keyup", editTask));
  // icons.forEach((icon) => icon.addEventListener("click", taskDone));
  addSpanEditTask();
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
        <span class="highlight">${taskName}</span>
        <i class="far fa-trash-alt"></i>
      </li>
    `;
    })
    .join("");
  todoList.innerHTML = newHtml;
  addIconsTaskDone();
}

// Hook up the event
addTodo.addEventListener("submit", addList);
// todoInput.addEventListener("change", updateList);

searchInput.addEventListener("change", displayAnswers);
searchInput.addEventListener("keyup", displayAnswers);
