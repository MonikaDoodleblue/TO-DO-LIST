let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let taskdate = document.getElementById("taskdate");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
});

let formValidation = () => {
    try {
        if (textInput.value === "") {
            console.log("failure");
            msg.innerHTML = "Task cannot be blank";
        }
        else {
            console.log("success");
            msg.innerHTML = "success";
            acceptData();
        }
    } catch (e) {
        console.log(e)
    }
};

let data = [];

let acceptData = () => {
    data.push({
        text: textInput.value,
        date: dateInput.value,
        description: textarea.value,
        task: taskdate.value,
    });

    localStorage.setItem("data", JSON.stringify(data));

    console.log(data);
    createTasks();
};

let createTasks = () => {
    try {
        tasks.innerHTML = "";
        data.map((x) => {
            display();
            return (tasks.innerHTML += `
    <div id=${x}>
          <span class="fw-bold">${x.text}</span>
          <span class="small text-secondary">${x.task}</span>
          <p>${x.description}</p>
          <span class="small text-secondary">${x.date}</span>

          <span class = "options">
            <i onClick = "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onClick = "deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
            <i onClick = "display(this);" class = "fas fs-time-alt"></i>
          </span>
    </div>
    `);

        });
        resetForm();

    } catch (e) {
        console.log(e);
    }
};

let deleteTask = (e) => {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
};

let display = () => {
    document.getElementById('tasks').innerText = Date();
}

let editTask = (e) => {
    let selectedTask = e.parentElement.parentElement;

    textInput.value = selectedTask.children[0].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;
    taskdate.value = selectedTask.children[1].innerHTML;
    dateInput.value = selectedTask.children[3].innerHTML;

    deleteTask(e);
};

let resetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    taskdate.value = "";
    textarea.value = "";
};

(() => {
    data = JSON.parse(localStorage.getItem("data")) || []
    console.log(data);
    createTasks();
})();
