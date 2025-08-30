let taskInput = document.getElementById("taskInput");
let addTaskBtn = document.getElementById("addTaskBtn");
let taskList = document.getElementById("taskList");

document.addEventListener("DOMContentLoaded", loadTasks);

addTaskBtn.addEventListener("click", addTask);

function addTask() {
  let taskText = taskInput.value.trim();
  if(taskText === "") 
    return alert("please add your task here...");

  let li = createTaskElement(taskText);
  taskList.appendChild(li);

  saveTasks();
  taskInput.value = "";
}

function createTaskElement(text){ 
let li = document.createElement("li");
li.textContent = text;

li.addEventListener("click", () => {
  li.classList.toggle("completed");
  saveTasks();
});

let deleteBtn = document.createElement("button");
deleteBtn.textContent = "Delete";
deleteBtn.classList.add("deleteBtn");
deleteBtn.addEventListener("click", (e)=> {
e.stopPropagation();
li.remove();
saveTasks();
});
li.appendChild(deleteBtn);
return li;
}

function saveTasks() {
  let tasks = [];
  document.querySelectorAll("taskList li").forEach((li) => {
    tasks.push({ text: li.firstChild.textContent, completed: li.classList.contains("completed")});
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    let li = createTaskElement(task.text);
    if(task.completed) li.classList.add("completed");
    taskList.appendChild(li);
  });
}