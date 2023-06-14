
var items = [];//array for to-do-s
var count = 0;//COUNTER FOR ID

addItem = () => {//ADD ITEM FROM FORM FUNCTION
    let todo = document.getElementById("inp").value;
    let priorityGet = document.getElementById("priority").value;
    let deadline = document.getElementById("inp1").value
    let label = document.getElementById("inp2").value
    let order
    if(priorityGet === 'High') order = 0
    else if(priorityGet === 'Medium') order = 1
    else order = 2
    if(todo && priorityGet){//CHECK IF NOT EMPTY

        var item = {//new object to be added in array
            id: count,
            description: todo,
            priority: priorityGet,
            dead : deadline,
            lbl : label,
            ord : order
        }

        items.push(item);//push in main array
        items.sort(function(a,b){return a.ord-b.ord})
        document.getElementById("inp").value = "";//CLEAR FIELD
        document.getElementById("inp1").value = "";
        document.getElementById("inp2").value = "";
        document.getElementById("priority").value = "";
        // console.log(items);

        displayList(items);

        count++;
    }
    else alert("Type something");//no null values
    
}

//DISPLAYING ALL THE TO_DO-s
displayList = list => {
    //FIRST, REMOVE ALL PREVIOUS ELEMENTS
    let remove = document.getElementById("todos");
    while (remove.hasChildNodes()) {
        remove.removeChild(remove.firstChild);
    }

    changeInfo(list);

    list.map( elem => {
        let tag = document.createElement("li");//create the li element of the list

        let text = document.createTextNode(elem.description);//the description of the to-do
        tag.appendChild(text);

        let span = document.createElement("SPAN");//the delete button
        span.setAttribute("class","close");
        span.setAttribute("onclick", `deleteCurrent(${elem.id})`)//using onclick function
        text = document.createTextNode("X");
        span.appendChild(text);
        tag.appendChild(span);

        let br = document.createElement("hr");//for separation
        tag.appendChild(br);

        text = document.createTextNode(`Deadline:${elem.dead}`);//element priority display
        tag.appendChild(text);
        tag.appendChild( document.createTextNode( '\u00A0\u00A0' ) );
        text = document.createTextNode(`Priority:${elem.priority}`);//element priority display
        tag.appendChild(text);
        tag.appendChild( document.createTextNode( '\u00A0\u00A0' ) );
        text = document.createTextNode(`Label:${elem.lbl}`);//element priority display
        tag.appendChild(text);

        document.getElementById("todos").appendChild(tag);//append all the info of the list element 
    })
}

//get the current index from the id
currentIndex = id => {
    let checkIndex = el => el.id === id;
    let currentId = items.findIndex(checkIndex);
    return currentId;
}


//DELETE ITEM FROM LIST WITH FUNCTION ONCLICK
deleteCurrent = id => {
    //delete from array
    items.splice(currentIndex(id), 1);
    displayList(items);
}

//change the counter of to-do-s that is displayed
changeInfo = nr => {
    document.getElementById("inf").innerHTML = nr.length;//change innerHTML to display number
}


