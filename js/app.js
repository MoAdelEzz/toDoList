
let additionBtn = document.getElementById('addBtn');
let delBtn = document.getElementById('deleteBtn');
let Tasks = document.getElementsByClassName('task');
let taskCnt = 0;

let CurrentDay = new Date().getUTCDate();
let CurrentMonth = new Date().getUTCMonth();
let CurrentYear = new Date().getUTCFullYear();


let Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

console.log(CurrentDay);
console.log(CurrentMonth);
console.log(CurrentYear);

let DateContainer = document.getElementsByClassName('dateContainer')[0].getElementsByTagName('h1')[0];
DateContainer.innerText = CurrentDay + " " + Months[CurrentMonth] + ", " + CurrentYear;

//============================================================================================
function Getdate(s = "")
{
    let x = 0,y = 0;
    
    x = parseInt(s.substring(0,2));
    y = parseInt(s.substring(3,5));

    return (x * 60) + y;
}


let sortByDate = ()=>
{
    let Dates = document.getElementsByClassName('time');

    let Orders = [];

    for (let i = 0 ; i < Dates.length ; i++)
    {
        Orders.push(i+1);

    }   

    for (let i = 0 ; i < Dates.length ; i++)
    {
        for (let j = i + 1 ; j < Dates.length ; j++)
        {
            let x = 0, y = 0;

            x = Getdate(Dates[i].placeholder);
            y = Getdate(Dates[j].placeholder);

            console.log(x);
            console.log(y);

            if (x > y)
            {
                let z = Orders[i];
                Orders[i] = Orders[j];
                Orders[j] = z;

            }
            
        }
    }

    for (let i = 0 ; i < Dates.length ; i++)
    {
        Dates[i].parentElement.style.order = Orders[i];
    }  

}
//============================================================================================


let createNewTask = ()=>
{
    taskCnt++;

    let Container = document.getElementById('taskCont');

    Container.innerHTML +=
    `            
    <div class="task" id="Task-${taskCnt}">
    <input type="text" class="time" placeholder="00:00">
    <input type="text" class="title BlackPlaceHolder" placeholder="Title Here ....">
    <div class="deleteIcon" role="button" id = "deleteBtn"><img src="./images/delete.png" class="deleteIcon"></div>
    </div>
    `
    let Inputs = Container.getElementsByClassName('task')[taskCnt - 1].getElementsByTagName('input');

    Inputs[0].setSelectionRange(0,1);
    Inputs[0].focus();
}

//============================================================================================

document.addEventListener('click', function(e){


    if(e.target.classList.contains('Add'))
    {
        createNewTask();
    }

    if (e.target.classList.contains('deleteIcon'))
    {
        if (window.confirm("Are you sure you want to delete this task ? "))
        {
            let x = e.target;
            x.parentElement.parentElement.style.animationName = "animateDelete";
            setTimeout(()=>{x.parentElement.parentElement.remove()},1000);
        }
    }

    if (e.target.classList.contains('title'))
    {
        e.target.disabled = false;
        e.target.value = e.target.placeholder
    }

}
);

//============================================================================================
document.addEventListener('keydown', (e)=>{

    if (e.target.classList.contains('time'))
    {
        
        let x = e.target.value;
    
        if (x.length == 0 && (e.key == "1" || e.key == "0" || e.key == "2") )
        {
            return;
        }

        if (x.length == 1)
        {
            if ((x[0] == "1" || x[0] == "0") && (e.key >= "0" && e.key <= "9"))
            {
                x += e.key;
                x += ":";
                e.target.value = x;
                e.preventDefault();
            }

            if (x[0] == "2" && (e.key >= "0" && e.key <= "3"))
            {
                x += e.key;
                x += ":";
                e.target.value = x;
                e.preventDefault();
            }
        }

        if (x.length == 3 && (e.key >= "0" && e.key <= "5"))
        {
            return;
        }

        if (x.length == 4 && (e.key >= "0" && e.key <= "9"))
        {
            e.target.value += e.key;
            e.target.placeholder = e.target.value;   
            e.target.disabled = true;

            let y = e.target.parentElement.getElementsByClassName('title')[0];
            y.focus();


            sortByDate();

            e.preventDefault();
    
        }

        e.preventDefault();

    }

    if (e.target.classList.contains('title'))
    {
        if (e.target.value.length == 20 && e.key != "Backspace" && e.key != "Shift" && e.key != "ArrowRight" && e.key != "ArrowLeft" )
        {
            e.preventDefault();
        }
    }
});


document.addEventListener('focusout', (e)=>
{

    if (e.target.classList.contains('time'))
    {
        if (e.target.value.legnth == 5)
        {
            e.target.placeholder = e.target.value;
            e.target.disabled = true;

            let y = e.target.parentElement.getElementsByClassName('title')[0];
            y.focus();

        }
        else
        {
            e.target.focus();
        }
    }

    if (e.target.classList.contains('title'))
    {
        if (e.target.value.length > 0)
        {
            e.target.placeholder = e.target.value;
        }
        e.target.disabled = true;
    }
});









