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
    
let taskInput=(tasktitle,lastdate)=>{
    
    if(tasktitle===""){
        alert("please enter some task")
        return;
    }
    if(!day.value || !month.value || !year.value){
        alert("Please enter Due date for your task")
        return
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

add.addEventListener('click',()=>{taskInput(task.value,`${day.value} - ${month.value} - ${year.value}`)})

let clearform=()=>{
    task.value=""
    year.value=""
    month.value=""
    day.value=""
}

cancel.addEventListener('click',clearform)

