// Get DOM
const title = document.querySelector("#title");
const todoList = document.querySelector("#todoList");
const todoInput = document.querySelector("[type=text]");
const addTodo = document.querySelector(".todoForm");

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
// const checks = document.querySelectorAll("[data-index]");
// console.log(checks);

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
        <span>
          <input type="checkbox" data-index=${i} id="task${i}" ${
        task.done ? "checked" : ""
      }/>
        </span>
        </li>`;
    })
    .join("");
}

function taskDone(e) {
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

// Hook up the event
addTodo.addEventListener("submit", addList);
todoList.addEventListener("click", taskDone);

createList(tasks, todoList);
