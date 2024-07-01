const draggables = document.querySelectorAll(".todo");
const droppables = document.querySelectorAll(".todo-box");
const todoForm = document.querySelector("#todo-form");
const taskInput = document.querySelector("#input");
const tasklane = document.querySelector("#todo-list");

loadTasks();
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = taskInput.value; 
    if (value) { 
      const newTask = document.createElement("p");
      newTask.classList.add("todo");
      newTask.setAttribute("draggable", "true");
      newTask.innerText = value;
      console.log(newTask.innerText);
  
      newTask.addEventListener("dragstart", () => {
        newTask.classList.add("is-dragging");
      });
      newTask.addEventListener("dragend", () => {
        newTask.classList.remove("is-dragging");
      });
      tasklane.appendChild(newTask);
      taskInput.value = "";
      saveTasks();
    } else {
     
      alert("Enter Todo Task");
    }
  });

draggables.forEach((task) => {
  task.addEventListener("dragstart", () => {
    task.classList.add("is-dragging");
  });
  task.addEventListener("dragend", () => {
    task.classList.remove("is-dragging");
  });
});

droppables.forEach((zone) => {
  zone.addEventListener("dragover", (e) => {
    e.preventDefault();
    const curTask = document.querySelector(".is-dragging");
    zone.appendChild(curTask);
    saveTasks();
  });
});



function saveTasks() {
  const tasks = [];
  droppables.forEach((zone) => {
    const zoneId = zone.id;
    
    const taskTexts = Array.from(zone.querySelectorAll(".todo")).map(
      (task) => task.innerText
    );
    tasks.push({ zoneId, taskTexts });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    const tasks = JSON.parse(savedTasks);
    tasks.forEach(({ zoneId, taskTexts }) => {
      const zone = document.getElementById(zoneId);
      taskTexts.forEach((text) => {
        const task = document.createElement("p");
        task.classList.add("todo");
        task.setAttribute("draggable", "true");
        task.innerText = text;

        task.addEventListener("dragstart", () => {
          task.classList.add("is-dragging");
        });
        task.addEventListener("dragend", () => {
          task.classList.remove("is-dragging");
        });

        zone.appendChild(task);
      });
    });
  }
}





