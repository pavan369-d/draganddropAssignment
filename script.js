const form = document.getElementById("todo-form");
const input = document.getElementById("input");
const todoLane = document.querySelectorAll(".todo-box");
const todoList = document.getElementById('todo-list');
const allTodos = document.querySelectorAll('p');
const ongoing = document.querySelector('#ongoing');
const progressTasks = document.querySelector('.ongoing');
const done = document.querySelector('.done');
const todo = document.querySelectorAll('.todo');
let newTask;
const todoTask = [];
const proTask = [];
const doneTask = [];
loadTasks();
form.addEventListener("submit", (e) => {
  e.preventDefault();
 
  const value = input.value;

  if (!value) return;

  newTask = document.createElement("p");
  newTask.classList.add("todo");
  newTask.setAttribute("draggable", "true");
  newTask.innerText = value;

  newTask.addEventListener("dragstart", () => {
    newTask.classList.add("is-dragging");
  });

  newTask.addEventListener("dragend", () => {
    newTask.classList.remove("is-dragging");
  });

  todoList.appendChild(newTask);
  todoTask.push(newTask);
  input.value = "";
  saveTasks();

}); 
const draggables = document.querySelectorAll(".todo");
const droppables = document.querySelectorAll(".todo-box");

draggables.forEach((task) => {
  task.addEventListener("dragstart", () => {
    task.classList.add("is-dragging");
  });
  task.addEventListener("dragend", () => {
    task.classList.remove("is-dragging");
  });
  saveTasks();
});

droppables.forEach((zone) => {
  zone.addEventListener("dragover", (e) => {
    e.preventDefault();

    const bottomTask = insertAboveTask(zone, e.clientY);
    const curTask = document.querySelector(".is-dragging");
    
    if (!bottomTask) {
      zone.appendChild(curTask);
    } else {
      zone.insertBefore(curTask, bottomTask);
    }
  });
});

const insertAboveTask = (zone, mouseY) => {
  const els = zone.querySelectorAll(".task:not(.is-dragging)");

  let closestTask = null;
  let closestOffset = Number.NEGATIVE_INFINITY;

  els.forEach((task) => {
    const { top } = task.getBoundingClientRect();

    const offset = mouseY - top;

    if (offset < 0 && offset > closestOffset) {
      closestOffset = offset;
      closestTask = task;
    }
  });

  return closestTask;
};


function saveTasks() {
    const openTasks = [];
    const progTasks = [];
    const doneTasks = [];
  
    document.querySelectorAll('#todo-list .todo').forEach(item => {
      openTasks.push(item.textContent);
    });
  
    document.querySelectorAll('#ongoing .todo').forEach(item => {
      progTasks.push(item.textContent);
    });
  
    document.querySelectorAll('#done .todo').forEach(item => {
      doneTasks.push(item.textContent);
    });
  
    localStorage.setItem('openTasks', JSON.stringify(openTasks));
    localStorage.setItem('progTasks', JSON.stringify(progTasks));
    localStorage.setItem('doneTasks', JSON.stringify(doneTasks));
  }
  
  function loadTasks() {
    const openTasks = JSON.parse(localStorage.getItem('openTasks')) || [];
    const progTasks = JSON.parse(localStorage.getItem('progTasks')) || [];
    const doneTasks = JSON.parse(localStorage.getItem('doneTasks')) || [];
  
    openTasks.forEach((item) => {
      const loadedP = document.createElement('p');
      loadedP.textContent = item;
      loadedP.classList.add("todo");
      loadedP.setAttribute("draggable", "true");
      todoList.appendChild(loadedP);
  
      loadedP.addEventListener("dragstart", () => {
        loadedP.classList.add("is-dragging");
        document.querySelector('#ongoing').appendChild(loadedP);
      });
  
      loadedP.addEventListener("dragend", () => {
        loadedP.classList.remove("is-dragging");
      });
  
     
    });

   
  
    progTasks.forEach((item) => {
      const loadedP = document.createElement('p');
      loadedP.textContent = item;
      loadedP.classList.add("todo");
      loadedP.setAttribute("draggable", "true");
  
      loadedP.addEventListener("dragstart", () => {
        loadedP.classList.add("is-dragging");
      });
  
      loadedP.addEventListener("dragend", () => {
        loadedP.classList.remove("is-dragging");
      });
  
      ongoing.appendChild(loadedP);
    });
  
    doneTasks.forEach((item) => {
      const loadedP = document.createElement('p');
      loadedP.textContent = item;
      loadedP.classList.add("todo");
      loadedP.setAttribute("draggable", "true");
  
      loadedP.addEventListener("dragstart", () => {
        loadedP.classList.add("is-dragging");
      });
  
      loadedP.addEventListener("dragend", () => {
        loadedP.classList.remove("is-dragging");
      });
  
      done.appendChild(loadedP);
    });
  }







