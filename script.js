const API_URL = "https://my-json-server.typicode.com/luis0952/AppTrello";
/**/ 
axios
  .get(`${API_URL}/tasks`)//Este tasks es el nombre del objeto en Db.json
  .then((res)=>showAllTasks(res.data))
  .catch((err) => console.error(err));

// Filtramos toda la información que recibimos de la API y la mapeamos
 const showAllTasks = (data) => {
   data.map((task) => createTodo(task));
};
/**/

const todos=document.querySelectorAll(".todo");
const all_status=document.querySelectorAll(".status")
let draggableTodo=null; //porque no se sabe que elemento se va a arrastrar

todos.forEach((todo)=>{
    todo.addEventListener("dragstart", dragStart);
    todo.addEventListener("dragend",dragEnd)
});

function dragStart(){
    draggableTodo=this;
    console.log("dragStart");
}

function dragEnd(){
    draggableTodo=null;
    console.log("dragEnd");
}

all_status.forEach((status)=>{
    status.addEventListener("dragover", dragOver);
    status.addEventListener("dragenter", dragEnter);
    status.addEventListener("dragleave", dragLeave);
    status.addEventListener("drop",dragDrop);
});

function dragOver(e){
    e.preventDefault();
    //console.log("dragEnd");
}

function dragEnter(){
    this.style.border="1px dashed #ccc";
    console.log("dragEnter");
}

function dragLeave(){
    this.style.border="none";
    console.log("dragLeave");
}

function dragDrop(){
    this.style.border="none";
    this.appendChild(draggableTodo);
    console.log("Dropped");
}

const btns = document.querySelectorAll("[data-target-modal]");
const close_modals = document.querySelectorAll(".close-modal");
const overlay = document.getElementById("overlay");

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(btn.dataset.targetModal).classList.add("active");
    overlay.classList.add("active");
  });
});

close_modals.forEach((btn) => {
  btn.addEventListener("click", () => {
    const modal = btn.closest(".modal");
    modal.classList.remove("active");
    overlay.classList.remove("active");
  });
});

window.onclick = (event) => {
  if (event.target == overlay) {
    const modals = document.querySelectorAll(".modal");
    modals.forEach((modal) => modal.classList.remove("active"));
    overlay.classList.remove("active");
  }
};

/* create todo  */
const todo_submit = document.getElementById("todo_submit");

todo_submit.addEventListener("click", createTodo);

  

function createTodo() {
  const todo_div = document.createElement("article");
  //const label_resp=document.createElement("div")
  const input_val = document.getElementById("todo_input").value;
  const input_responsable=document.getElementById("input_resp").value;
  const txt = document.createTextNode(input_val);
  const txt_responsable=document.createTextNode(input_responsable);

  //crear titulo
    const Title_task=document.createElement("h3");
    Title_task.classList.add("title__task");
    
  //fin crear titulo


  todo_div.append(txt, `\n`, txt_responsable);
  //Title_task.appendChild(txt_responsable)
  //label_resp.appendChild(txt_responsable);
  todo_div.classList.add("todo");
  todo_div.setAttribute("draggable", "true");
  Title_task.classList.add("todo")
  Title_task.setAttribute("dragabble","true");
  // label_resp.classList.add("todo")
  // label_resp.setAttribute("draggable","true");

  /* create span */
  const span = document.createElement("span");
  const span_txt = document.createTextNode("\u00D7");
  span.classList.add("close");
  span.appendChild(span_txt);

  todo_div.appendChild(span);

  no_status.appendChild(todo_div);

  span.addEventListener("click", () => {
    span.parentElement.style.display = "none";
  });
  //   console.log(todo_div);

  todo_div.addEventListener("dragstart", dragStart);
  todo_div.addEventListener("dragend", dragEnd);

  document.getElementById("todo_input").value = "";
  document.getElementById("input_resp").value="";
  todo_form.classList.remove("active");
  overlay.classList.remove("active");
}

const close_btns = document.querySelectorAll(".close");

close_btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.parentElement.style.display = "none";
  });
});