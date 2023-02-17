let count = 0;
let isListMade = false;
const space = document.createTextNode("\u00A0");
// let isDone = false; // To check if task is done or not (for strike or strike remove)

function getItem(id){
    console.log(id); // id, type attributes can be passed to a function called in the element/tag's scope, just like how the id attribute is passed to the getItem function (for demonstration)

    let item = document.getElementById("item").value; 
    console.log(item);
    if (item == ""){
        nonull();
    }else{
        document.getElementById("item").value = null; // To clear out the textarea after submission

        // Creating Unordered List element (only one time)
        if (isListMade == false){
            const div = document.getElementById("div2");
            const udList = document.createElement("ul");
            udList.setAttribute("id", "todo");
            div.appendChild(udList);
            
            document.getElementById("div2_1").style.display = 'none';
            // Remove "No Tasks Available" div after inserting task

            isListMade = true;       
        }
        const udList = document.getElementById("todo");
        // Creating list elements and appending
            const list = document.createElement("li");
        // Setting attributes for each list element
            list.setAttribute("id", "li-" + count);
            list.setAttribute("data-is-done", false);
            //console.log(list.dataset.isDone);
        // Creating text node (innerHTML value) for each list element 
            const node = document.createTextNode(item);
            list.appendChild(node);


        // Creating a done button to stroke completed tasks
            const done = document.createElement("button");
            done.setAttribute("id", count);
            done.setAttribute("title", "Task Done");
            done.setAttribute("class", "b2 done");
            done.setAttribute("onclick", "taskDone(id)");
            const done_icon = document.createElement("i");
            done_icon.setAttribute("class", "fa fa-check");
            done.appendChild(done_icon);
            list.appendChild(done);


        // Creating button elements for each enlisted items
            const cross = document.createElement("button");
            cross.setAttribute("id", count);
            cross.setAttribute("title", "Delete Task");
            cross.setAttribute("class", "b2 cross");

            // Adding onclick event attribute to button
                cross.setAttribute("onclick", "closeTask(id)");

            // Imported a button library from font-awesome and created element i (icon)
                const check_icon = document.createElement("i");
                check_icon.setAttribute("class" , "fa fa-close");
                cross.appendChild(check_icon);
                list.appendChild(cross);

        // Appending li elements into the ordered list
            
            udList.appendChild(list);
            count++;
            console.log(count);
    } 
}

function clearItem(){
    // let ct = count - 1;
    const div = document.getElementById("div2");
    const udList = document.getElementById("todo");
    // for(let i = 0 ; i < count ; i++){
    //     const list = document.getElementById("li-" + i);
    //     udList.removeChild(list);
    // }
    // count = 0;
    // ct = 0;
    div.removeChild(udList);
    console.log("ToDo List Cleared!");
    isListMade = false;
    count = 0;
    document.getElementById("div2_1").style.display = 'block';
    // Show the "No Tasks Availabe" div after clearing all tasks
    
}
    
function closeTask(list_num){
    if (count == 1){
        clearItem();
        console.log(count);
    }else{
        const udList = document.getElementById("todo");
        const list = document.getElementById("li-" + list_num);
        udList.removeChild(list);
        count--;
        console.log(count);
    }
}

// To add custom attributes in HTML DOM, we use the format "data-[attribute-name]" inside the element under the element p.

// To access the custon user defined attribute, we make use of the "dataset" property. Say one attribute is defined as data-date-of-birth (the dashes after data converts the name into camelCase), then to use it in javascipt, we use the format: p.dataset.dateOfBirth

function taskDone(list_num){
    const list = document.getElementById("li-" + list_num);
    console.log(list);
    if (list.dataset.isDone == "false"){
        list.setAttribute("class", "strike");
        list.dataset.isDone = true;
        console.log(list.dataset.isDone);
    }else{
        list.setAttribute("class", "noStrike");  
        list.dataset.isDone = false; 
        console.log(list.dataset.isDone);
    }
    
}

function nonull(){
    alert("Please enter an item!");
}

document.getElementById("item").addEventListener("keypress", function(KeyboardEvent){
    if(KeyboardEvent.code == "Enter"){
        getItem();
    }
});