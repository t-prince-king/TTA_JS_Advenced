let tasks = ["Buy milk","Clean the room","Go to the gym"];
let completeTask=[];

const displayTasks = () => {
    let taskDisplay = document.querySelector('#taskDisplay');
    taskDisplay.innerHTML = '';
    tasks.forEach((task, index) => {
    const taskItem = document.createElement('li');
    taskItem.classList.add('bg-blue-200', 'p-2', 'm-2', 'rounded-lg','flex','justify-between','list-none');
    
    const taskText = document.createElement('span');

    taskText.textContent = task;
     taskItem.appendChild(taskText);

     const taskLinks = document.createElement('div');
     taskLinks.classList.add('task-links');

     //creat the update and delet 
     const donelink = document.createElement('a');
     donelink.href = '#';
     donelink.textContent = 'done';
     donelink.textContent = 'mark as done 🎨';
     donelink.classList.add('text-green-500', 'mr-4');
     donelink.addEventListener('click', () => markAsdone(index));
     taskLinks.appendChild(donelink);
     
 
     

     
     const updateButton = document.createElement('a');
     updateButton.href = '#';
     updateButton.textContent = '🔔';
     updateButton.classList.add('text-blue-500' , 'mr-4');
     updateButton.addEventListener('click', () => editTask(index));
     taskLinks.appendChild(updateButton);

     const deleteButton = document.createElement('a');
     deleteButton.href = '#';
     deleteButton.textContent = '🗑';
     deleteButton.classList.add('text-red-500');
     deleteButton.addEventListener('click', () => deleteTask(index));
    taskLinks.appendChild(deleteButton);
    
 
    taskItem.appendChild(taskLinks);

    // taskItem.textContent = task;
    taskDisplay.appendChild(taskItem);
    })
}

const saveTaskToLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
    localStorage.setItem('completedTasks',JSON.stringify(completedTasks))
}

const addTask = () => {
    const newTaskInput = document.querySelector('#newTask');
    const newTask = newTaskInput.value;

    if (newTask.trim() !== ""){
       tasks.push(newTask);
       newTaskInput.value = "";
       saveTaskToLocalStorage();
       displayTasks();
    }
    else{
        alert('Please enter a task');
    }
}


const editTask = (index) => {
    const updatedTask = prompt("Update your task", tasks[index]);
    if(updatedTask && updatedTask.trim() !== ""){
        tasks[index] = updatedTask;
        displayTasks();
    }
    else{

    }
}

const markAsdone = (index) =>{
   const task = tasks.splice(index,1) [0];
   completeTask.push(tasks);
   saveTaskToLocalStorage();
   displayTasks();
   displaycompletedTasks();
}

const  displaycompleteTask = () => {
    const completeTaskSection = document.querySelector('#completeTask');
    const completeTaskDisplay =document.querySelector('#completedTaskDisplay');
    completeTaskDisplay.innerHTML ='';

    if (completeTask.length > 0) {
        completeTaskSection.classList.remove('hidden');
    } else {
        completeTaskSection.classList.add('hidden');
    }

    completeTask.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('bg-blue-200', 'text-gray-200', 'p-2', 'rounded-lg','flex','justify-between', 'lg:w-[60%]', 'w-[90%]', 'm-auto', 'my-2');
        
        const taskText = document.createElement('span');
        taskText.textContent = task;
        taskText.classList.add('line-through');
        taskItem.appendChild(taskText);

        const taskLinks = document.createElement('div');
        taskLinks.classList.add('task-links');


        const gooBackButton = document.createElement('a');
        gooBackButton.href = '#';
        gooBackButton.textContent = '📲';
        gooBackButton.classList.add('text-red-500');
        gooBackButton.addEventListener('click', () => gooBackButtonCompletedTask(index));
         taskLinks.appendChild(gooBackButton);
       
        taskItem.appendChild(taskLinks);
        completedTaskDisplay.appendChild(taskItem);
        
       
    })
}


const deleteTask = (index) => {
  if(confirm('Are you sure you want to delete this task you fuc?')){
tasks.splice(index, 1);
saveTaskToLocalStorage();
displayTasks();  
} 
}

const addTaskButton = document.querySelector('#addTaskButton');
addTaskButton.addEventListener("click", addTask);



const loadTasksFromStorage = () =>{
const taskStored = localStorage.getItem('tasks');
const storedcompletedTasks = localStorage.getItem('completedTasks');
if (taskStored) {
    tasks = JSON.parse(taskStored);
    displayTasks();
}

if (storedcompletedTasks) {
    completedTasks = JSON.parse(storedcompletedTasks);
    displaycompletedTasks();
    displayTasks();
}

}
const addtaskButton = document.querySelector('#addtaskButton');
addtaskButton.addEventListener('click', addTask);
loadTasksFromStorage();
// displayTasks();