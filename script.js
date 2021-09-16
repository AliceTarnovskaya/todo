const input = document.querySelector('.input__search'),
    button = document.querySelector('.button'),
    form = document.querySelector('.form'),
    result = document.querySelector('.result');

// localStorage 
let tasks = [];
if (localStorage.tasks) {
    tasks = JSON.parse(localStorage.tasks);
}

for (let task of tasks) {
    let newTask = document.createElement('p');
    newTask.classList.add('result__item');
    newTask.innerText = task;
    result.prepend(newTask);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let newTask = document.createElement('p');

    tasks.push(input.value);
    localStorage.tasks = JSON.stringify(tasks);

    newTask.classList.add('result__item');
    // task = input.value;
    newTask.innerHTML = `<input type="checkbox" id="done"><span class="text">${input.value}</span> <span class="edit"></span><span class="delete"></span>`;
    result.prepend(newTask);
    input.value = '';

    const checkbox = newTask.querySelector("#done");

    checkbox.addEventListener("click", () => {
        if (checkbox.checked) {
            checkbox.parentElement.style.textDecoration = "line-through";
            checkbox.parentElement.style.color = "#4f555e";

            result.appendChild(newTask);
        } else {
            checkbox.parentElement.style.textDecoration = "none";
            checkbox.parentElement.style.color = "#e0e0e0";
            result.prepend(newTask)
        }
    });

    const deletedElement = newTask.querySelector('.delete');

    deletedElement.addEventListener('click', () => {
        deletedElement.parentElement.remove();
    });

    const editElement = newTask.querySelector('.edit');
    editElement.addEventListener('click', () => {
        const newForm = document.createElement('form'),
            newInput = document.createElement('input'),
            newButton = document.createElement('button'),
            text = newTask.querySelector('.text');
        newForm.classList.add('subform');
        newInput.classList.add('input__edit');
        newButton.innerText = 'Save';
        newForm.appendChild(newInput);
        newForm.appendChild(newButton);
        newTask.append(newForm);


        newForm.addEventListener('submit', (e) => {
            e.preventDefault();
            text.innerText = newInput.value;
            newForm.reset();
            newTask.removeChild(newForm);
        });
    });
});