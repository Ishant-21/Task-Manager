let Clicktoadd=  document.querySelector('.hero-button');

let toggleAddNewTask=()=>{
    document.querySelector('.add-new-task').classList.toggle("is-hidden")
    Clicktoadd.remove();
    document.querySelector(".hero-title").remove()
}

Clicktoadd.addEventListener('click',toggleAddNewTask);


let task= document.getElementById("task")
let day=document.getElementById("day")
let month=document.getElementById("month")
let year=document.getElementById("year")
let add= document.querySelector(".add-button")
let tasklist=document.getElementById("tasks-list")

let taskData=[]
    
let taskInput=(tasktitle,lastdate)=>{
    
    if(tasktitle===""){
        alert("please enter some task")
        return;
    }
    const taskObject= {
        id:Date.now(),
        taskvalue:tasktitle,
        duedate:lastdate,
        completed:false
    }
    taskData.push(taskObject)
    let newtask= document.createElement('li');
    newtask.classList.add("single-task-item")
    newtask.innerHTML= `
         <article class="task-left">
                            <input type="checkbox" name="check-task" class="check-task">
                            <span>${tasktitle}</span>
                        </article>
                        <article class="task-right">
                            <span class="due-date-container">${lastdate}</span>  
                            <div class="edit-button-container">
                                <button type="button" class="edit-button"><img src="/icons/edit-icon.png" class="edit-icon"></button>
                            </div>
                            <div class="delete-button-container">
                                <button type="button" class="delete-button"><img src="/icons/delete-icon.png" class="delete-icon"></button>
                            </div>
                            
                                
                        </article>
        `
    tasklist.append(newtask)
    
}

add.addEventListener('click',()=>{taskInput(task.value,`${day.value} ${month.value} ${year.value}`)})

