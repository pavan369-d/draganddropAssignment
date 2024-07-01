const form = document.getElementById("todo-form");
const input = document.getElementById("input");
const todoLane = document.getElementById("todo-box");
const todoList = document.getElementById('todo-list');
const allTodos = document.querySelectorAll('p');
const ongoing = document.querySelector('.ongoing');
const done = document.querySelector('.done');
let newTask;
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



// function saveTasks(){
//     const openTasks = [];
//     const progressTasks = [];
//     const doneTasks = [];

//    allTodos.forEach(item=>{
//     openTasks.push(item.textContent);
//    })
//    openTasks.push(newTask.textContent);
// //    console.log(openTasks);
//    Array.from(done).forEach(item=>console.log(item))

//    localStorage.setItem('openTasks',JSON.stringify(openTasks));

// }

function saveTasks() {
    const openTasks = [];
    const tasks = todoList.querySelectorAll('.todo');
    
    tasks.forEach(item => {
      openTasks.push(item.textContent);
    });
   console.log(ongoing);
   
    localStorage.setItem('openTasks', JSON.stringify(openTasks));
  }

function loadTasks(){
    const loadedTasks = JSON.parse(localStorage.getItem('openTasks')) || [];

//    console.log(loadedTasks);
   loadedTasks.forEach((item)=>{
    const loadedP = document.createElement('p');
    loadedP.textContent=item;
   
    loadedP.classList.add("todo");
  loadedP.setAttribute("draggable", "true");
 

  loadedP.addEventListener("dragstart", () => {
    loadedP.classList.add("is-dragging");
  });

  loadedP.addEventListener("dragend", () => {
    loadedP.classList.remove("is-dragging");
  });

  todoList.appendChild(loadedP);


   })
}



