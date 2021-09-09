const input = document.querySelector('.input__search'),
    button = document.querySelector('.button'),
    form = document.querySelector('.form'),
    result = document.querySelector('.result');


form.addEventListener('submit', (e) => {
    e.preventDefault();
    let newTask = document.createElement('p');
    newTask.classList.add('itemText');
    newTask.innerHTML = `<input type="checkbox" id="done"><span class="text">${input.value}</span> <span class="delete"></span> <span class="edit"></span>`;
    result.prepend(newTask);
    input.value = '';

    const checkbox = newTask.querySelector("#done");

    checkbox.addEventListener("click", () => {
        if (checkbox.checked) {
            checkbox.parentElement.style.textDecoration = "line-through";
            result.appendChild(newTask);
        } else {
            checkbox.parentElement.style.textDecoration = "none";
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