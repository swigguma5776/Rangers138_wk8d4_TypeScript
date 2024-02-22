import {v4 as uuidv4} from 'uuid'; // 'as' keyword when importing modules just renames it

//internal imports
import {Category, Managing} from './types'; 


//our Task class
export class Task {
    
    private _id: string;
    
    constructor(
        public name: string,
        public description: string,
        public deadline: Date,
        public category: Category
    ){
        this._id = uuidv4(); 
    }
    
    get id(): string {
        return this._id
    }
}


//our Task Manager Class
export class TaskManager implements Managing<Task | string> {
    
    public tasks: Task[] = []
    
    public addTask(task: Task): void {
        this.tasks.push(task);
        this.updateTaskList(); 
    }
    
    public removeTask(taskId: string): void {
        
        // find the taskIndex based on the taskId
        const index = this.tasks.findIndex( (task) => task.id === taskId ) //loops through tasks list 'for task in tasks' once we hit an id that matches return index
        
        if (index !== -1) {
            this.tasks.splice(index, 1)
        }
        // add update UI after task was removed
        this.updateTaskList(); 
        
    }
    
    private updateTaskList() {
        
        const container = document.getElementById('tasks') as HTMLElement;
        
        
        // clear any existing list
        container.innerHTML = ""; 
        
        
        // loop through our tasks list and create an html element for each
        this.tasks.forEach( task => {
            
            //make an html task card
            const taskCard = `
            
                <div class="card mb-3 rounded">
                    <div class="card-body">
                        <h5 class="card-title">Title: ${task.name}</h5>
                        <p class="card-text">Description: ${task.description}</p>
                        <p class="card-text">Deadline: ${task.deadline}</p>
                        <p class="card-text">Category: ${task.category}</p>
                        <button type="submit" class="btn btn-danger btn-sm" data-task=${task.id}>Remove</button>
                    </div>
                </div>
            `
            
            // Append the task card to our HTML variable
            container.insertAdjacentHTML('beforeend', taskCard)
            
        });
        
        // Adding an event listener to my removal button
        let allButtons = container.querySelectorAll('.btn-danger') //a list of all mybuttons even if there is just 1
        
        // this is adding an eventListener to every single Remove button
        allButtons.forEach( button => {
            button.addEventListener('click', () => {
                // grab the id
                const taskId = button.getAttribute('data-task'); 
                if (taskId) {
                    this.removeTask(taskId);
                }
            })
        })
    }
    
}