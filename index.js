// Get DOM
const title = document.querySelector("#title");
const todoList = document.querySelector("#todoList");
const todoInput = document.querySelector("#typeTask");
const addTodo = document.querySelector(".todoForm");

const tasks = [];
const allTasks = document.querySelector("li");

const searchInput = document.querySelector("#searchInput");

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
  const newText = this.querySelector("label").textContent;
  console.log(newText);
}

// Delete task (done)
function taskDone() {
  alert("Are you sure you've done this task?");
  todoList.removeChild(this);
}

// Create new li (task)
function createNewLi(task) {
  const li = document.createElement("li");
  const label = document.createElement("label");
  label.textContent = task;
  label.contentEditable = true;
  li.append(label);
  todoList.append(li);
  // console.log(tasks);
  updateList(task);
}

function getMatches(val, remainTasks) {
  return remainTasks.filter((task) => {
    const regex = new RegExp(val, "gi");
    return task.match(regex);
  });
}

let array = [];
let labels;

function updateList(task) {
  array.push(task);
  // console.log(array);
  labels = document.querySelectorAll("li");
  /* Temporary comment out */
  // labels.forEach((task) => task.addEventListener("click", taskDone));
  labels.forEach((task) => task.addEventListener("input", editTask));
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
        <label for="task${this.index}">${taskName}</span>
      </li>
    `;
    })
    .join("");
  todoList.innerHTML = newHtml;
}

// Hook up the event
addTodo.addEventListener("submit", addList);
// todoInput.addEventListener("change", updateList);

searchInput.addEventListener("change", displayAnswers);
searchInput.addEventListener("keyup", displayAnswers);
