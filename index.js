// Get DOM
const title = document.querySelector("#title");
const todoList = document.querySelector("#todoList");
const todoInput = document.querySelector("#typeTask");
const addTodo = document.querySelector(".todoForm");

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const allTasks = document.querySelector("li");

const searchInput = document.querySelector("#searchInput");
const remainTasks = document.querySelectorAll("li");

console.log(remainTasks);

// Build out function
function addList(e) {
  e.preventDefault();
  const text = todoInput.value;
  const newTask = {
    text,
    done: false,
  };
  tasks.push(newTask);
  createList(tasks, todoList);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  this.reset;
  console.log(tasks);
  // createNewLi(text);
  // todoInput.value = "";
}

function createList(lists = [], todoList) {
  todoList.innerHTML = lists
    .map((task, i) => {
      return `
        <li>
        <label for="task${i}">${task.text}</label>
          <input type="checkbox" data-index=${i} id="task${i}" ${
        task.done ? "checked" : ""
      }/>
        </li>`;
    })
    .join("");
}

function taskDone(e) {
  console.log(e.target);
  // skip this unless it's an input
  if (!e.target.matches("input")) return;
  const el = e.target;
  const index = el.dataset.index;
  tasks[index].done = !tasks[index].done;
  alert("Are you sure you've done this task?");
  localStorage.setItem("tasks", JSON.stringify(tasks));
  createList(tasks, todoList);
}

function createNewLi(task) {
  const li = document.createElement("li");
  li.textContent = task;
  todoList.append(li);
}

function getMatches(wordOnInput, remainTasks) {
  return remainTasks.filter((task) => {
    const regex = new RegExp(wordOnInput, "gi");
    return task.match(regex);
  });
}

function displayAnswers() {
  const matches = getMatches(this.value, remainTasks);
  const newHtml = matches
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
todoList.addEventListener("click", taskDone);

searchInput.addEventListener("change", displayAnswers);
searchInput.addEventListener("keyup", displayAnswers);

createList(tasks, todoList);
