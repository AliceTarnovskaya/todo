const input = document.querySelector('.input__search'),
    button = document.querySelector('.button'),
    form = document.querySelector('.form'),
    result = document.querySelector('.result');

// localStorage 
let tasks = [];
if (localStorage.tasks) {
    tasks = JSON.parse(localStorage.tasks);
}

function createTaskNode(taskText) {
    let newTask = document.createElement('p');
    newTask.classList.add('result__item');
    newTask.innerHTML = `<input type="checkbox" id="done"><span class="text">${taskText}</span> <span class="edit"></span><span class="delete"></span>`;
    result.prepend(newTask);
    input.value = '';

    checkedAsDone(newTask);
    deleteTask(newTask);
    editTask(newTask);
}

function checkedAsDone(createdTask) {
    const checkbox = createdTask.querySelector("#done");

    checkbox.addEventListener("click", () => {
        if (checkbox.checked) {
            checkbox.parentElement.style.textDecoration = "line-through";
            checkbox.parentElement.style.color = "#4f555e";

            result.appendChild(createdTask);
        } else {
            checkbox.parentElement.style.textDecoration = "none";
            checkbox.parentElement.style.color = "#e0e0e0";
            result.prepend(createdTask)
        }
    });
}

function deleteTask(createdTask) {
    const deletedElement = createdTask.querySelector('.delete');

    deletedElement.addEventListener('click', () => {
        deletedElement.parentElement.remove();
    });

}

function editTask(createdTask) {
    const editElement = createdTask.querySelector('.edit');
    editElement.addEventListener('click', () => {
        const newForm = document.createElement('form'),
            newInput = document.createElement('input'),
            newButton = document.createElement('button'),
            text = createdTask.querySelector('.text');
        newForm.classList.add('subform');
        newInput.classList.add('input__edit');
        newButton.innerText = 'Save';
        newForm.appendChild(newInput);
        newForm.appendChild(newButton);
        createdTask.append(newForm);
        // tasks.forEach((i) =>{
        newForm.addEventListener('submit', (e) => {
            e.preventDefault();
            tasks.forEach((i) => {
                tasks.splice(i, 1);
            });
            text.innerText = newInput.value;
            tasks.push(newInput.value);
            localStorage.tasks = JSON.stringify(tasks);

            // localStorage.removeItem(newForm);
            newForm.reset();
            createdTask.removeChild(newForm);


        });
        // })

    });
}

for (let task of tasks) {
    createTaskNode(task);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    tasks.push(input.value);
    localStorage.tasks = JSON.stringify(tasks);
    createTaskNode(input.value);
});