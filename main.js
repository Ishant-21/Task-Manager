//Hero Title and Button logic

let Clicktoadd=  document.querySelector('.hero-button');

let toggleAddNewTask=()=>{
    document.querySelector('.add-new-task').classList.toggle("is-hidden")
    Clicktoadd.remove();
    document.querySelector(".hero-title").remove()
}

Clicktoadd.addEventListener('click',toggleAddNewTask);

//Header Date
let weekdays=['Sunday', 'Monday','tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ]
let monthnames=['January','February','March','April','May','June','July','August','September','October','November','December']
let today = new Date()
let date=`${weekdays[today.getDay()]}, ${today.getDate()} ${monthnames[today.getMonth()]} ${today.getFullYear()}`
document.querySelector(".header-right").innerText=`${date}`

//variables declaration for Edit button

let taskID = null
let editbtn;
let currentTask;
let currentID;
let currentduedate;
//Task Input form logic

let task= document.getElementById("task")
let day=document.getElementById("day")
let month=document.getElementById("month")
let year=document.getElementById("year")
let add= document.querySelector(".add-button")
let cancel= document.querySelector('.cancel-button')
let tasklist=document.getElementById("tasks-list")


for(let i=1;i<=31;i++){
    let dayoption=document.createElement('option');
    dayoption.setAttribute('value',i)
    dayoption.innerHTML=i
    day.append(dayoption)
}



monthnames.forEach((value,index)=>{
    let monthoption=document.createElement('option')
    monthoption.setAttribute('value',index+1)
    monthoption.innerHTML=value
    month.append(monthoption)
})

for(let i=today.getFullYear();i<(today.getFullYear()+5);i++){
    let yearoption=document.createElement('option')
    yearoption.setAttribute('value',i)
    yearoption.innerHTML=i
    year.append(yearoption)
}

let daySelect=(mon)=>{
    day.innerHTML=` <option value="" disabled selected>Day</option> `
    if(mon===4 || mon===6 || mon===9 || mon===11){
        for(let i=1;i<=30;i++){
            let dayoption=document.createElement('option');
            dayoption.setAttribute('value',i)
            dayoption.innerHTML=i
            day.append(dayoption)
    }
        
    }
    else if(mon===2){
        for(let i=1;i<=29;i++){
            let dayoption=document.createElement('option');
            dayoption.setAttribute('value',i)
            dayoption.innerHTML=i
            day.append(dayoption)
        }
    }
    else{
        for(let i=1;i<=31;i++){
            let dayoption=document.createElement('option');
            dayoption.setAttribute('value',i)
            dayoption.innerHTML=i
            day.append(dayoption)
        }
    }

}

month.addEventListener('change',()=>{daySelect(Number(month.value))})

let taskData=[]

    
let taskInput=(tasktitle,dueday,duemonth,dueyear)=>{
    emptyFieldValidation();
    if(task.value && day.value && month.value && year.value ){
    let taskObject= {
        id:Date.now(),
        taskvalue:tasktitle,
        duedate:{
            d:dueday,
            m:duemonth,
            y:dueyear
        },
        completed:false
    }
    taskData.push(taskObject)
    let newtask= document.createElement('li');
    newtask.setAttribute('id',taskObject.id)
    newtask.classList.add("single-task-item")
    newtask.innerHTML= `
        <article class="task-left">
                            <input type="checkbox" name="check-task" class="check-task" >
                            <span>${taskObject.taskvalue}</span>
                        </article>
                        <article class="task-right">
                            <span class="due-date-container">${taskObject.duedate.d} - ${taskObject.duedate.m} - ${taskObject.duedate.y}</span>  
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
}
let taskListHandler=(e)=>{
    if(e.target.closest(".edit-button")){
        let li= e.target.closest('li')
        let id=Number(li.id)
        let taskObject=taskData.find(obj=>obj.id===id)
        if (!taskObject) return;
        if(taskObject.completed===true) {
            alert("Completed tasks cannot be edited")
            return
        }

        currentID=taskObject.id
        currentTask=taskObject.taskvalue
        currentduedate={
            currentday:taskObject.duedate.d,
            currentmonth:taskObject.duedate.m,
            currentyear:taskObject.duedate.y
        }
        editTask();
        changeAdd();
    }

    if(e.target.closest(".delete-button")){
        let li = e.target.closest('li')
        let id = Number(li.id)
        taskData=taskData.filter(element=>element.id !== id )
        li.remove()
    }

    if(e.target.closest(".check-task")){
        
        let li=e.target.closest('li')
        let id= Number(li.id)
        let taskObject = taskData.find(element=>element.id===id)
        taskObject.completed=true   
        li.classList.add("task-completed")
        e.target.remove()

        
    }    
}

tasklist.addEventListener('click',(e)=>{taskListHandler(e)})


//+ADD --> Update appearance of add button
let changeAdd =()=>{
    add.innerText='Update'
    add.classList.remove('add-button')
    add.classList.add('update-button')
}

add.addEventListener('click',()=>{
    add.innerText="+ Add"
    add.classList.remove("update-button")
    add.classList.add("add-button")
    if(taskID===null){
        taskInput(task.value, day.value, month.value, year.value)
        clearform();

    }
    else{
        updateTask(task.value, day.value, month.value, year.value);
        taskID =null;
        clearform();

    }
})
    

      
    
//cancel-button function
let clearform=()=>{
    task.value=""
    year.value=""
    month.value=""
    day.value=""
}
//cancel button listener
cancel.addEventListener('click',clearform)

//edit button logic
let editTask=()=>{
    taskID=currentID
    task.value=currentTask
    year.value=currentduedate.currentyear
    month.value=currentduedate.currentmonth
    daySelect(Number(month.value))
    day.value=currentduedate.currentday 
}

let updateTask=(tasktitle,dueday,duemonth,dueyear)=>{
    emptyFieldValidation()
        
    if(task.value && day.value && month.value && year.value ){
    let currentElement= document.getElementById(taskID)
    let currentTaskObject=taskData.find(obj=>obj.id===taskID)
    if (!currentTaskObject) return;
    currentTaskObject.taskvalue=tasktitle
    currentTaskObject.duedate={
            d:dueday,
            m:duemonth,
            y:dueyear
        }

    currentElement.innerHTML=""
    currentElement.innerHTML= `
        <article class="task-left">
                            <input type="checkbox" name="check-task" class="check-task">
                            <span>${currentTaskObject.taskvalue}</span>
                        </article>
                        <article class="task-right">
                            <span class="due-date-container">${currentTaskObject.duedate.d} - ${currentTaskObject.duedate.m} - ${currentTaskObject.duedate.y}</span>  
                            <div class="edit-button-container">
                                <button type="button" class="edit-button"><img src="/icons/edit-icon.png" class="edit-icon"></button>
                            </div>
                            <div class="delete-button-container">
                                <button type="button" class="delete-button"><img src="/icons/delete-icon.png" class="delete-icon"></button>
                            </div>
                            
                                
                        </article>
        `
    }
    
}

let emptyFieldValidation=()=>{
    if(!task.value){
        alert("please enter some task")
        return  false
    }
    if(!day.value || !month.value || !year.value){
        alert("Please enter Due date for your task")
        return false
    } 

}


//Filter tasks logic 
let allTasks=document.querySelector(".filter-all")
let completedTasks=document.querySelector(".filter-completed")
let activeTasks=document.querySelector(".filter-active")

document.querySelector(".filter-tasks").addEventListener('click',(e)=>{

        if(e.target===allTasks){
            allTasks.classList.add("filter-buttons-toggle-hover")
            activeTasks.classList.remove("filter-buttons-toggle-hover")
            completedTasks.classList.remove("filter-buttons-toggle-hover")
            console.log("all tasks")
            

            taskData.map((obj)=>{
            let li = document.getElementById(obj.id)
            console.log(obj.id);
            
            li.classList.remove("is-hidden")
        })


        }

        if(e.target===completedTasks){
            allTasks.classList.remove("filter-buttons-toggle-hover")
            activeTasks.classList.remove("filter-buttons-toggle-hover")
            completedTasks.classList.add("filter-buttons-toggle-hover")
            console.log("completed tasks")


        taskData.map((obj)=>{
            let li = document.getElementById(obj.id)
            if(!(obj.completed == true)){
                console.log(obj.id);
                li.classList.add("is-hidden")

            }
            else{
                li.classList.remove("is-hidden")
            }
           
        })

        }

        if(e.target===activeTasks){
            allTasks.classList.remove("filter-buttons-toggle-hover")
            activeTasks.classList.add("filter-buttons-toggle-hover")
            completedTasks.classList.remove("filter-buttons-toggle-hover")
            console.log("active tasks")

            taskData.map((obj)=>{
                let li = document.getElementById(obj.id)
            if(!(obj.completed == false)){
                console.log(obj.id);
                li.classList.add("is-hidden")

            }
            else{
                li.classList.remove("is-hidden")
            }
           
        })
            

        }


    })