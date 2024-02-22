//internal imports
import { Category } from './types';
import { Task, TaskManager } from './TaskManager';

// Grab our form so we can put an eventListener on it
let taskForm = document.getElementById('taskForm') as HTMLFormElement; //using type alias to define our type

// instantiate the Task Manager
const taskManager = new TaskManager()

taskForm.addEventListener('submit', (event) => {
    event.preventDefault(); //Prevents the default behavior for our event
    
    
    // Grabbing all of our form data
    // whole html page is our document object. 
    const taskNameInput = document.getElementById('taskName') as HTMLInputElement; 
    const descriptionInput = document.getElementById('description') as HTMLInputElement; 
    const deadlineInput = document.getElementById('deadline') as HTMLInputElement; 
    const categoryInput = document.getElementById('category') as HTMLInputElement; 
    
    
    // grab the values
    let taskName = taskNameInput.value;
    let description = descriptionInput.value;
    let deadline = new Date(deadlineInput.value);
    let category = categoryInput.value;
    
    console.log(taskName, description, deadline, category);
    
    //Come back & add capabilities to add Tasks & store them to our TaskManager
    const newTask = new Task(taskName, description, deadline, category as Category);
    
    taskManager.addTask(newTask);
    
    taskForm.reset(); 
   
})