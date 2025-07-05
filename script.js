let myArray = [];

function displayFullList(){
  // get the element with the myList id & set the inner html to ""
  // create a for-loop and loop through myArray
  // call displaySingleListItem() function & pass each array item as an argument
  document.getElementById("myList").innerHTML = "";
  let parentDiv = document.createElement("div");
  parentDiv.classList.add("container");
  document.getElementById("myList").appendChild(parentDiv);
  for (let each of myArray){
     displaySingleListItem(each);
  }
  const draggables = document.querySelectorAll(".draggable");
  for (let each of draggables){
    each.addEventListener('dragstart',()=>{
      each.classList.add('dragging')
    })
    each.addEventListener('dragend',()=>{
      each.classList.remove('dragging')
      displayFullList();
    })
  }
  const containers = document.querySelectorAll(".container");
  for (let each of containers){
    each.addEventListener('dragover',e=>{
      e.preventDefault();
      const draggable = document.querySelector('.dragging');
      each.appendChild(draggable);
      const newArray = document.querySelectorAll(".draggable");
      myArray = []
      for(let each of newArray){
        myArray.push(each.getAttribute("data-name"))
      }
      localStorage.savedList = myArray;
    })
  }
}

function addListItem(someText){
  // push someText into myArray
  // save myArray in localStorage.savedList
  // call displaySingleListItem() function & pass someText as an argument
  myArray.push(someText);
  localStorage.savedList = myArray;
  displayFullList();
}

function loadFromLocalStorage(){  
  // if localStorage.savedList is undefined then return
  if (localStorage.savedList == undefined){
    return
  }
  // if localStorage.savedList is not undefined then do these 3 lines of code...
  let tempString = localStorage.savedList;
  myArray = tempString.split(",");
  displayFullList();
}

function displaySingleListItem(someText){
  let parentDiv = document.createElement("div");
  parentDiv.classList.add("container");
  let node = document.createElement("div"); //
  node.innerHTML = someText;
  node.classList.add("draggable");
  node.setAttribute('draggable', true);
  node.setAttribute('data-name', someText);
  let button = document.createElement("button");
  button.innerHTML = 'X';
  button.onclick = function(){
    removeListItem(someText);
  }
  node.appendChild(button);
  parentDiv.appendChild(node);
  document.getElementById("myList").appendChild(parentDiv);
}

function removeListItem(someText){
  myArray.splice(myArray.indexOf(someText),1);
  localStorage.savedList = myArray;
  displayFullList();
}