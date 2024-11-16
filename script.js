document.addEventListener("DOMContentLoaded", () => {
  const inputToDo = document.getElementById("todo-input");
  const addTaskBtn = document.getElementById("add-task-btn");
  const listToDo = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  function Render(tasks){
    listToDo.innerHTML=""
    tasks.forEach(task => {
      renderTask(task);
    });
  }
  Render(tasks);

  addTaskBtn.addEventListener("click", () => {
    const todoText = inputToDo.value.trim();

    const newTask = {
      id: Date.now(),
      text: todoText,
      is_completed: false,
    };

    if (todoText === "") return;

    tasks.push(newTask);
    saveTask();
    inputToDo.value = ""; //clear input field
    Render(tasks);
  });

  function renderTask(task){
    let list_item = document.createElement("li");
    list_item.innerHTML=`<span>🖊️${task.text}</span><button>Delete</button>`
    list_item.addEventListener('click',()=>{
      list_item.classList.toggle("completed")
    })
    listToDo.appendChild(list_item);
    list_item.querySelector('button').addEventListener('click',(event)=>{
      event.stopPropagation();
      tasks=tasks.filter(t=>{
        t.id!==task.id;
      })
      list_item.remove();
      saveTask();
    })
  }

  function saveTask() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});