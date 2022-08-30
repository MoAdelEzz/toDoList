
let additionBtn = document.getElementById('addBtn');
let delBtn = document.getElementById('deleteBtn');
let Tasks = document.getElementsByClassName('task');
let taskCnt = 0;

let CurrentDay = new Date().getUTCDate();
let CurrentMonth = new Date().getUTCMonth();
let CurrentYear = new Date().getUTCFullYear();


let Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


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

//===========================================================================================

let betweenZeroTwo = function (x = "")
{
    return ( x == "Numpad0" || x == "Numpad1" || x == "Numpad2") || ( x == "Digit0" || x == "Digit1" || x == "Digit2");
}

let isDigit = function(x = "")
{
    let A = ( x == "Numpad0" || x == "Numpad1" || x == "Numpad2" || x == "Numpad3" ||  x == "Numpad4" || x == "Numpad5" || x == "Numpad6" || x == "Numpad7" || x == "Numpad8" || x == "Numpad9")
    let B = ( x == "Digit0" || x == "Digit1" || x == "Digit2" || x == "Digit3" ||  x == "Digit4" || x == "Digit5" || x == "Digit6" || x == "Digit7" || x == "Digit8" || x == "Digit9")
    return A||B;
}

let isMinutesFirst = function(x = "")
{
    let A = ( x == "Numpad0" || x == "Numpad1" || x == "Numpad2" || x == "Numpad3" ||  x == "Numpad4" || x == "Numpad5");
    let B = ( x == "Digit0" || x == "Digit1" || x == "Digit2" || x == "Digit3" ||  x == "Digit4" || x == "Digit5");
    return A||B;
}

let toNum = function(key = "")
{
    switch (key)
    {
        case "Numpad0" : case "Digit0" : return "0";
        case "Numpad1" : case "Digit1" : return "1";
        case "Numpad2" : case "Digit2" : return "2";
        case "Numpad3" : case "Digit3" : return "3";
        case "Numpad4" : case "Digit4" : return "4";
        case "Numpad5" : case "Digit5" : return "5";
        case "Numpad6" : case "Digit6" : return "6";
        case "Numpad7" : case "Digit7" : return "7";
        case "Numpad8" : case "Digit8" : return "8";
        case "Numpad9" : case "Digit9" : return "9";
    }
}


//===========================================================================================
document.addEventListener('keydown', (e)=>{

    if (e.target.classList.contains('time'))
    {
        
        let x = e.target.value;
        
    
        if (x.length == 0 && betweenZeroTwo(e.code))
        {
            return;
        }

        if (x.length == 1)
        {
            if ( (x[0] >= "0" && x[0] <= "1") && isDigit(e.code))
            {
                x += toNum(e.code);
                x += ":";
                e.target.value = x;
                e.preventDefault();
            }

            if (x[0] == "2" && (e.key >= "0" && e.key <= "3"))
            {
                x += toNum(e.code);
                x += ":";
                e.target.value = x;
                e.preventDefault();
            }
        }

        if (x.length == 3 && isMinutesFirst(e.code))
        {
            return;
        }

        if (x.length == 4 && isDigit(e.code))
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
        if (e.target.value.length == 5 && e.target.placeholder[2] == ":")
        {
            console.log("entered");
            e.target.placeholder = e.target.value;
            sortByDate();
            e.target.disabled = true;
        }
        else
        {
            e.target.placeholder = "00:00";
            e.target.value = ""; 
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






