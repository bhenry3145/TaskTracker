function saveToLocalStorage(task){

    let nameArr = getFromLocalStorage();

    if (nameArr.includes(task)){
        return;
    }
    
    nameArr.push(task);
    localStorage.setItem('Task', JSON.stringify(nameArr));

}

function getFromLocalStorage(){
    let localStorageData = localStorage.getItem('Task');

    if (localStorageData == null){
        return [];
    }

    return JSON.parse(localStorageData);

}

function removeFromLocalStorage(task){
    let localStorageData = getFromLocalStorage();

    let nameIndex = localStorageData.indexOf(task);

    localStorageData.splice(nameIndex, 1);

    localStorage.setItem('Task', JSON.stringify(localStorageData));

}

function updateInLocalStorage(updatedTask) {
    let tasks = getFromLocalStorage();
    tasks = tasks.map(task => task.name === updatedTask.name && task.description === updatedTask.description && task.dueDate === updatedTask.dueDate ? updatedTask : task);
    localStorage.setItem('Task', JSON.stringify(tasks));
}

export { saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage, updateInLocalStorage }