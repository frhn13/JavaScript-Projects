const submitButton = document.querySelector("#myButton");
const task = document.querySelector("#textToDo");
const tasksList = document.querySelector("#tasksList");
const clearButton = document.querySelector("#clearButton")
const removeItemButton = document.querySelector("#removeTaskButton");

submitButton.addEventListener("click", () => {
    const taskText = task.value;
    console.log(taskText);
    if (taskText != "") { 
        const listItem = document.createElement("li");
        listItem.setAttribute("id", taskText); // Sets id of item in list to what is written in
        listItem.textContent = taskText;
        tasksList.appendChild(listItem);

    }
});

clearButton.addEventListener("click", () => {
    if (tasksList.hasChildNodes) {
        while (tasksList.hasChildNodes) {
            tasksList.removeChild(tasksList.firstChild);
        }
    }
});

removeItemButton.addEventListener("click", () => {
    let removedId = document.getElementById(task.value);
    tasksList.removeChild(removedId);
});