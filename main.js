let Clicktoadd=  document.querySelector('.hero-button');

let toggleAddNewTask=()=>{
    document.querySelector('.add-new-task').classList.toggle("is-hidden")
    Clicktoadd.remove();
    document.querySelector(".hero-title").remove()
}

Clicktoadd.addEventListener('click',toggleAddNewTask);