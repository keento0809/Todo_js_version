// Get DOM
const title = document.querySelector("#title");
const todoList = document.querySelector("#todoList");
const todoInput = document.querySelector("#typeTask");
const addTodo = document.querySelector(".todoForm");
// const childNode = document.querySelector("#todoList > li");

const tasks = [];
const allTasks = document.querySelector("li");

const searchInput = document.querySelector("#searchInput");
// const remainTasks = document.querySelectorAll("li");

// Build out function
function addList(e) {
  e.preventDefault();
  const text = todoInput.value;
  const newTask = {
    text,
    done: false,
  };
  tasks.push(newTask);
  // createList(tasks, todoList);
  // localStorage.setItem("tasks", JSON.stringify(tasks));
  // this.reset;
  // console.log(tasks);
  createNewLi(newTask.text);
  todoInput.value = "";
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
  console.log(this);
  console.log(e);
  alert("Are you sure you've done this task?");
  todoList.removeChild(this);
}

function createNewLi(task) {
  const li = document.createElement("li");
  li.textContent = task;
  todoList.append(li);
}

function getMatches(val, remainTasks) {
  return remainTasks.filter((task) => {
    const regex = new RegExp(val, "gi");
    return task.match(regex);
  });
}

let array = [];

function updateList() {
  array.push(this.value);
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
todoInput.addEventListener("change", updateList);

// todoList.addEventListener("click", taskDone);

searchInput.addEventListener("change", displayAnswers);
searchInput.addEventListener("keyup", displayAnswers);

// createList(tasks, todoList);
