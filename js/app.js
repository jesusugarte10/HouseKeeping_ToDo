//Select the elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//classes name
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//Variables
let LIST =[]
    , id =0;

//get item from localstorage
let data = localStorage.getItem("TODO");

//check if data is not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.lenght; //set the id to the last one in the list 
    loadList(LIST);
}else{
    //if data is not empty
    LIST = [];
    id =0;
}

//load items to the user interface
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

//clear the local storage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

//Show todays date
const options = {weekday : "long", month:"short", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//add to do fucniton
function addToDo(ToDo, id, done, trash){

    if(trash){ return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `<li class="item">
                    <i class= "fa ${DONE} co" job="complete" id=${id}></i>
                    <p class="text ${LINE}">${ToDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id=${id}></i>
                </li>
                `;
    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}

//Only Grab Numbers
function checkPattern(elem) {
    if(!elem.value.match('^' + elem.getAttribute('pattern') + '$')) {
      alert('Please match the format');
    }
  }   

//add an item to the list user the enter key
document.addEventListener("keyup", function(event){
    if(event.keyCode == 13){

        const toDo = "UW-"+input.value;
        if(toDo){
            addToDo(toDo, id, false, false);

            LIST.push({
                name :toDo,
                id : id,
                done: false,
                trash: false
            })
            LIST.sort();
            //add item to local storage (this code must be added where the list array is updated)
            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
        }
        input.value = "";
    }
});

//complete to do
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

//remove to do
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

//target the items created dinamically
list.addEventListener("click", function(event){
    const element = event.target; // return the clicked element inside list
    const elementJob = element.attributes.job.value; //complete or delete

    if(elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }

    //add item to local storage (this code must be added where the list array is updated)
    localStorage.setItem("TODO", JSON.stringify(LIST));
});