function saveToLocalStorage(task) {
    let tasks = getFromLocalStorage();
    tasks.push(task);
    localStorage.setItem('Task', JSON.stringify(tasks));
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
    tasks = tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
    localStorage.setItem('Task', JSON.stringify(tasks));
}

export { saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage, updateInLocalStorage }