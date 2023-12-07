const todos = JSON.parse(localStorage.getItem("todos")) || [];

window.addEventListener("load", () => {
  printPreviousTodos();
  getTodoCount();
});


function printPreviousTodos() {
  const activeTodoSection = document.querySelector(".active-todo");
  const completeTodoSection = document.querySelector(".complete-todo");

  for (let i = 0; i < todos.length; i++) {
    const todoItem = createTodoItem(todos[i]);

    if (todos[i].completed) {
      completeTodoSection.appendChild(todoItem);
      todoItem.querySelector("input[type='checkbox']").checked = true;
    } else {
      activeTodoSection.appendChild(todoItem);
    }
  }
}

function addTodo() {
  let inputField = document.getElementById("new");
  let inputValue = inputField.value.trim();

  if (!inputValue) {
    alert("Enter a to-do item!");
    return;
  }

  let todo = {
    text: inputValue,
    completed: false,
  };

  todos.push(todo);
  let todoItem = createTodoItem(todo);
  let activeTodoSection = document.querySelector(".active-todo");
  activeTodoSection.appendChild(todoItem);
  inputField.value = "";
  saveTodos();
  console.log(JSON.stringify(todos));
  getTodoCount();
}

function createTodoItem(todo) {
  let todoItem = document.createElement("div");
  todoItem.className = "todo-item";
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", toggleComplete);
  todoItem.appendChild(checkbox);

  let todoText = document.createElement("span");
  todoText.textContent = todo.text;
  todoItem.appendChild(todoText);

  let editBtn = document.createElement("button");
  editBtn.className = "editBtn";
  editBtn.innerHTML = '<i class="fa fa-pencil"></i> Edit';
  editBtn.addEventListener("click", editTodo);
  todoItem.appendChild(editBtn);

  let deleteBtn = document.createElement("button");
  deleteBtn.className = "deleteBtn";
  deleteBtn.innerHTML = '<i class="fa fa-trash"></i> Delete';
  deleteBtn.addEventListener("click", deleteTodo);
  todoItem.appendChild(deleteBtn);

  return todoItem;
}

function toggleComplete() {
  let todoItem = this.parentNode;
  let todo = getTodoByElement(todoItem);

  if (todo.completed) {
    todo.completed = false;
    let activeTodoSection = document.querySelector(".active-todo");
    activeTodoSection.appendChild(todoItem);
  } else {
    todo.completed = true;
    let completeTodoSection = document.querySelector(".complete-todo");
    completeTodoSection.appendChild(todoItem);
  }

  saveTodos();
  getTodoCount();
}

function editTodo() {
  let todoItem = this.parentNode;
  let todoText = todoItem.querySelector("span");
  let todo = getTodoByElement(todoItem);
  let newText = prompt("Edit to-do item:", todo.text);

  if (newText.trim()) {
    todo.text = newText.trim();
    todoText.textContent = newText.trim();
  }
  saveTodos();
}

function deleteTodo() {
  let todoItem = this.parentNode;
  let todo = getTodoByElement(todoItem);
  let parent = todoItem.parentNode;
  parent.removeChild(todoItem);
  todos.splice(todos.indexOf(todo), 1);
  getTodoCount();
  saveTodos();
}

function getTodoByElement(todoItem) {
  let todoText = todoItem.querySelector("span");
  let text = todoText.textContent;

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].text === text) {
      return todos[i];
    }
  }

  return null;
}

function getTodoCount() {
  let activeCount = 0;
  let completedCount = 0;

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].completed) {
      completedCount++;
    } else {
      activeCount++;
    }
  }
  document.getElementById("total").textContent = `Total Todos: ${todos.length}`;
  document.getElementById(
    "active"
  ).textContent = `Active Todos: ${activeCount}`;
  document.getElementById(
    "completed"
  ).textContent = `Completed Todos: ${completedCount}`;
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}
