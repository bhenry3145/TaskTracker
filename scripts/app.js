import { saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage, updateInLocalStorage} from './localStorage.js';
const addTaskBtn = document.getElementById('addTaskBtn');
const closeAdd = document.getElementById('closeAdd');
const add = document.getElementById('add');
const addCardBtn = document.getElementById('addCardBtn');
const toDo = document.getElementById('toDo');
const inProgress = document.getElementById('inProgress');
const completed = document.getElementById('completed');
const nameInput = document.getElementById('nameInput');
const descriptionInput = document.getElementById('descriptionInput');
const dateInput = document.getElementById('dateInput');
const lowPriority = document.getElementById('lowPriority');
const mediumPriority = document.getElementById('mediumPriority');
const highPriority = document.getElementById('highPriority');

addTaskBtn.addEventListener('click', () => {
    add.classList.toggle('hidden');
})

closeAdd.addEventListener('click', () => {
    add.classList.toggle('hidden');
})

addCardBtn.addEventListener('click', () => {
    const task = {
        id: Date.now(),
        name: nameInput.value,
        description: descriptionInput.value,
        dueDate: dateInput.value,
        priority: lowPriority.checked ? "Low" : mediumPriority.checked ? "Medium" : "High",
        status: 'toDo'
    };

    saveToLocalStorage(task);
    renderTask(task);

    nameInput.value = '';
    descriptionInput.value = '';
    dateInput.value = '';
    lowPriority.checked = false;
    mediumPriority.checked = false;
    highPriority.checked = false;

    add.classList.toggle('hidden');
});

const renderTask = async (task) => {
    let card = document.createElement("div");
    card.classList.add("card", "p-3", "mb-3");

    let removeBtn = document.createElement("button");
    removeBtn.textContent = "REMOVE";
    removeBtn.classList.add("btn", "btn-danger", "float-end");
    removeBtn.addEventListener("click", function() {
        card.remove();
        removeFromLocalStorage(task);
    });

    let editBtn = document.createElement("button");
    editBtn.textContent = "EDIT";
    editBtn.classList.add("btn", "btn-warning", "float-end", "my-2");
    editBtn.addEventListener("click", function() {
        editTask(task, card, title, description, dueDate);
    });

    let title = document.createElement("h2");
    title.textContent = task.name;

    let description = document.createElement("p");
    description.classList.add("text-2xl");
    description.textContent = task.description;

    let dueDate = document.createElement("p");
    dueDate.classList.add("text-2xl");
    dueDate.textContent = "Due Date: " + task.dueDate;

    let priority = document.createElement("p");
    priority.classList.add("text-2xl");
    priority.textContent = "Priority Status: " + task.priority;

    let changeStatusDropdown = document.createElement("div");
    changeStatusDropdown.classList.add("dropdown");

    let changeStatusBtn = document.createElement("button");
    changeStatusBtn.classList.add("btn", "btn-secondary", "dropdown-toggle");
    changeStatusBtn.setAttribute("type", "button");
    changeStatusBtn.setAttribute("data-bs-toggle", "dropdown");
    changeStatusBtn.textContent = "Change Status";

    let changeStatusMenu = document.createElement("ul");
    changeStatusMenu.classList.add("dropdown-menu");

    let toDoOption = document.createElement("li");
    let toDoLink = document.createElement("a");
    toDoLink.classList.add("dropdown-item");
    toDoLink.textContent = "TO-DO";
    toDoLink.addEventListener("click", function() {
        toDo.appendChild(card);
        task.status = 'toDo';
        updateInLocalStorage(task);
    });
    toDoOption.appendChild(toDoLink);

    let inProgressOption = document.createElement("li");
    let inProgressLink = document.createElement("a");
    inProgressLink.classList.add("dropdown-item");
    inProgressLink.textContent = "IN PROGRESS";
    inProgressLink.addEventListener("click", function() {
        inProgress.appendChild(card);
        task.status = 'inProgress';
        updateInLocalStorage(task);
    });
    inProgressOption.appendChild(inProgressLink);

    let completedOption = document.createElement("li");
    let completedLink = document.createElement("a");
    completedLink.classList.add("dropdown-item");
    completedLink.textContent = "COMPLETED";
    completedLink.addEventListener("click", function() {
        completed.appendChild(card);
        task.status = 'completed';
        updateInLocalStorage(task);
    });
    completedOption.appendChild(completedLink);

    changeStatusMenu.appendChild(toDoOption);
    changeStatusMenu.appendChild(inProgressOption);
    changeStatusMenu.appendChild(completedOption);

    changeStatusDropdown.appendChild(changeStatusBtn);
    changeStatusDropdown.appendChild(changeStatusMenu);

    let changePriorityDropdown = document.createElement("div");
    changePriorityDropdown.classList.add("dropdown");

    let changePriorityBtn = document.createElement("button");
    changePriorityBtn.classList.add("btn", "btn-secondary", "dropdown-toggle", "m-2");
    changePriorityBtn.setAttribute("type", "button");
    changePriorityBtn.setAttribute("data-bs-toggle", "dropdown");
    changePriorityBtn.textContent = "Change Priority";

    let changePriorityMenu = document.createElement("ul");
    changePriorityMenu.classList.add("dropdown-menu");

    let lowPriorityOption = document.createElement("li");
    let lowPriorityLink = document.createElement("a");
    lowPriorityLink.classList.add("dropdown-item");
    lowPriorityLink.textContent = "Low";
    lowPriorityLink.addEventListener("click", function() {
        task.priority = 'Low';
        priority.textContent = "Priority Status: " + task.priority;
        updateInLocalStorage(task);
    });
    lowPriorityOption.appendChild(lowPriorityLink);

    let mediumPriorityOption = document.createElement("li");
    let mediumPriorityLink = document.createElement("a");
    mediumPriorityLink.classList.add("dropdown-item");
    mediumPriorityLink.textContent = "Medium";
    mediumPriorityLink.addEventListener("click", function() {
        task.priority = 'Medium';
        priority.textContent = "Priority Status: " + task.priority;
        updateInLocalStorage(task);
    });
    mediumPriorityOption.appendChild(mediumPriorityLink);

    let highPriorityOption = document.createElement("li");
    let highPriorityLink = document.createElement("a");
    highPriorityLink.classList.add("dropdown-item");
    highPriorityLink.textContent = "High";
    highPriorityLink.addEventListener("click", function() {
        task.priority = 'High';
        priority.textContent = "Priority Status: " + task.priority;
        updateInLocalStorage(task);
    });
    highPriorityOption.appendChild(highPriorityLink);

    changePriorityMenu.appendChild(lowPriorityOption);
    changePriorityMenu.appendChild(mediumPriorityOption);
    changePriorityMenu.appendChild(highPriorityOption);

    changePriorityDropdown.appendChild(changePriorityBtn);
    changePriorityDropdown.appendChild(changePriorityMenu);

    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(dueDate);
    card.appendChild(priority);
    card.appendChild(changeStatusDropdown);
    card.appendChild(changePriorityDropdown);
    card.appendChild(editBtn);
    card.appendChild(removeBtn);

    if (task.status === 'toDo') {
        toDo.appendChild(card);
    } else if (task.status === 'inProgress') {
        inProgress.appendChild(card);
    } else if (task.status === 'completed') {
        completed.appendChild(card);
    }
}

const editTask = async (task, card, title, description, dueDate) => {
    if (card.querySelector('.edit-form')) {
        return;
    }

    let editForm = document.createElement("div");
    editForm.classList.add("edit-form");

    let nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.value = task.name;
    nameInput.classList.add("form-control", "my-2");

    let descriptionInput = document.createElement("input");
    descriptionInput.type = "text";
    descriptionInput.value = task.description;
    descriptionInput.classList.add("form-control", "mb-2");

    let dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.value = task.dueDate;
    dateInput.classList.add("form-control", "mb-2");

    let saveBtn = document.createElement("button");
    saveBtn.textContent = "SAVE";
    saveBtn.classList.add("btn", "btn-success", "mb-2");
    saveBtn.addEventListener("click", function() {
        task.name = nameInput.value;
        task.description = descriptionInput.value;
        task.dueDate = dateInput.value;
        updateInLocalStorage(task);
        title.textContent = task.name;
        description.textContent = task.description;
        dueDate.textContent = "Due Date: " + task.dueDate;
        editForm.remove();
    });

    let cancelBtn = document.createElement("button");
    cancelBtn.textContent = "CANCEL";
    cancelBtn.classList.add("btn", "btn-secondary", "mb-2", "ms-2");
    cancelBtn.addEventListener("click", function() {
        editForm.remove();
    });

    editForm.appendChild(nameInput);
    editForm.appendChild(descriptionInput);
    editForm.appendChild(dateInput);
    editForm.appendChild(saveBtn);
    editForm.appendChild(cancelBtn);

    card.appendChild(editForm);
}

const initializeApp = async () => {
    let tasks = getFromLocalStorage();
    tasks.forEach(task => renderTask(task));
}

initializeApp();