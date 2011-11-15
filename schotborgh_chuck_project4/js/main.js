    /* 
     Chuck Schotborgh Visual Frameworks 11/2011 project 4
     Mobile Development
     Full Sail University
    */

window.addEventListener("DOMContentLoaded", function(){
    //Passing the element values within the addtitem doc
    function $(x){
        var theElement = document.getElementById(x);
        return theElement;
    }
    //Looping to set  and create the value catagories within the addtitem doc
    function makeCats(){
        var formTag = document.getElementsByTagName("form"),
        selectLi = $("select"),
        makeSelect = document.createElement("select");
        makeSelect.setAttribute("id", "groups");
        for(var i=0, j=contactGroups.length; i < j; i++ ){
        var makeOption = document.createElement("option");
        var optText = contactGroups[i];
        makeOption.setAttribute("value", contactGroups [i]);
        makeOption.innerHTML = optText;
        makeSelect.appendChild(makeOption);
        }
        selectLi.appendChild(makeSelect);
    }
    //Looping to find what has been selected in radio buttons
    function getSelectedRadio(){
        var radios = document.forms[0].sex;
        for(var i=0; i<radios.length; i++){
        if(radios[i].checked){
            sexValue = radios[i].value;
        }
        }
    }
    //Looping to find what has been selected in Checkbox for favorite.
    function setCheckboxValue(){
        if($('fav').checked){
        favoriteValue = $('fav').value;
        } else{
        favoriteValue = "No";
        }
    }
    //Switching controls in the within the additem doc turning the hidden elements on
        function toggleControls(n){
        switch(n){
            case "on":
                $('contactForm').style.display = "none";
                $('clear').style.display = "inline";
                $('displayLink').style.display = "none";
                $('addNew').style.display = "inline";
                break;
            case "off":
                $('contactForm').style.display = "block";
                $('clear').style.display = "inline";
                $('displayLink').style.display = "inline";
                $('addNew').style.display = "none";
                $('items').style.display = "none";
                break;
            default:
                return false;
            }
    }
    
    function storeData(key){
        //if no key this,then new item will need a new key
        if(!key){
            var id                  = Math.floor(Math.random()*100000001);
        }else{
            //Set the id to the existing key, use the passing key form the edit submitevent handler
            //the key is passed to the validate function, then passed to here into the store Data function.
            id = key;
        }
        getSelectedRadio();
        getSelectedRadio();
            var item              = {};
                item.group        = [" Default Response Choice of Friend:", $('groups').value];
                item.fname        = ["First Name of Friend:", $('fname').value];
                item.lname        = ["Last Name of Friend:", $('lname').value];
                item.email        = ["Email of Friend::", $('email').value];
                item.sex          = ["Gender Option Style :", sexValue];
                item.favorite     = ["Posted to Friend Online:", favoriteValue ];      
                item.iq           = ["Friend Gauge:", $('iq').value];
                item.date         = ["Date:", $('date').value];
                item.notes        = ["My Forgiveness Message:", $('notes').value];
            localStorage.setItem(id, JSON.stringify(item));
            alert("Contact Saved!");
        }
    //Getting the Local Storage Data via the Key
    function getData(){
        toggleControls("on");
        if(localStorage.length === 0){
            alert("There is no data in the Local Storage.");
        }
        var makeDiv = document.createElement('div');
        makeDiv.setAttribute("id", "items");
        var makeList = document.createElement('ul');
        makeDiv.appendChild(makeList);
        document.body.appendChild(makeDiv);
        $('items').style.display = "block";
        for(var i=0, len=localStorage.length; i<len;i++){
            var makeli = document.createElement('li');
            var linksLi = document.createElement('li');
            makeList.appendChild(makeli);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            //Parsing the data to post to the InnerHTML for storage.
            var obj = JSON.parse(value);
            var makeSubList = document.createElement('ul');
            makeli.appendChild(makeSubList);
            for(var n in obj){
            var makeSubli = document.createElement('li');
            makeSubList.appendChild(makeSubli);
            var optSubText = obj[n][0]+" "+obj[n][1];
            makeSubli.innerHTML = optSubText;
            makeSubList.appendChild(linksLi);
            }
            makeItemLinks(localStorage.key(i), linksLi);
        }
    }
    function makeItemLinks(key, linksLi){
        var editLink = document.createElement('a');
        editLink.href = "#";
        editLink.key = key;
        var editText = "Edit Contact";
        editLink.addEventListener("click", editItem);
        editLink.innerHTML = editText;
        linksLi.appendChild(editLink);
        
        var breakTag =document.createElement('br');
        linksLi.appendChild(breakTag);
        
        var deleteLink = document.createElement('a');
        deleteLink.href = "#";
        deleteLink.key = key;
        var deleteText = "Delete Contact";
        deleteLink.addEventListener("click", editItem);
        deleteLink.innerHTML = deleteText;
        linksLi.appendChild(deleteLink);
    }
    
    function editItem(){
        //Item local storage item data grab
        var value = localStorage.getItem(this.key);
        var item = JSON.parse(value);
        
        //Show the form
        toggleControls("off");
        
        //Pop the form fields with current localStorage values
        $('groups').value = item.group[1];
        $('fname').value = item.fname[1];
        $('lname').value = item.lname[1];
        $('email').value = item.email[1];
        var radios = document. forms[0].sex;
        for(var i=0; i<radios.length; i++){
            if(radios[i].value == "Male" && item.sex[1] =="Male"){
            radios[i].setAttribute("checked", "checked");
        }else if(radios[i].value == "Female" && item.sex[1] =="Female"){
            radios[i].setAttribute("checked", "checked");
        }
    }
    if (item.favorite [1] == "Yes"){
        $('fav').setAttribute("checked","checked");
        }    
        $('iq').value = item.iq[1];
        $('date').value = item.date[1];
        $('notes').value = item.notes[1];
        
        //remove "save contact" button form init listener
        save.removeEventListener("click", storeData);
        
        //Change Begin button value to Edit Forgiveness
        $('submit').value = "Edit Forgiveness Plan";
        var editSubmit =$('submit');
        
        //save the key value when we sve the data we edited
        editSubmit.addEventListener("click", validate);
        editSubmit.key = this.key;
    }
    function clearLocal(){
        if (localStorage.length === 0){
            alert("There is no data to clear.");
        }else{
            localStorage.clear();
            alert ("all contacts are deleted");
            window.location.reload();
            return false;
        }
    }
        function validate(e){
            //define the elements to check
            var getGroup = $('groups');
            var getFname = $('fname');
            var getLname = $('lname');
            var getEmail = $('email');
            
            //Reset Error Messages
            errMsg.innerHTML = "";
                getGroup.style.border = "1px solid Black";
                getFname.style.border = "1px solid Black";
                getLname.style.border = "1px solid Black";
                getEmail.style.border = "1px solid Black";
                
            // Get Error Messages
            var messageAry = [];
            
            // Group Validation
            if(getGroup.value ==="--Current State of Mind--"){
                var groupError = "Please choose a group.";
                getGroup.style.border = "1px solid red";
                messageAry.push(groupError);
                }
            // First Name Validation
            if(getFname.value === ""){
                var fNameError = "Please choose a first name.";
                getFname.style.border = "1px solid red";
                messageAry.push(fNameError);
            }
            // Last Name Validation
            if(getLname.value === ""){
                var lNameError = "Please choose a last name.";
                getLname.style.border = "1px solid red";
                messageAry.push(lNameError);
            }
            // Email Validation
            var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if(!(re.exec(getEmail.value))){
                var emailError = "Please enter a valid email address.";
                getEmail.style.border = "1px solid red";
                messageAry.push(emailError);
            }
            
            //if there were errors display screen
            if (messageAry.length >= 1){
            for(var i=0, j=messageAry.length; i < j; i++){
                var txt = document.createElement('li');
                txt.innerHTML = messageAry[i];
                errMsg.appendChild (txt);
            }
             e.preventDefault();
            return false;
            }else{
            // If all is OK, save our data! Send key value
            //Remember the passing of this key 
            storeData(this.key); 
        }
    }
    /*Variable defaults*/
    var contactGroups = ["--add Forgiveness Gesture--",
                         "How can I make it up to you?",
                         "I need a spanking!",
                         "You can slap me now!",
                         "Please accept these flowers!",
                         "Feed me to the sharks!",
                         "Go ahead sock me!",
                         "Holding a I'm sorry sign!",
                         "I'm sorry sign in a teddy!",
                         "It was my fault!",
                         "I'll buy the beer!",
                         "Let's break bread!",
                         "I'm such a dufus!",
                         "I'm such an idiot!",
                         "I suck! Please forgive me!",
                         "I'm such a loser!",
                         "Please forgive me!",
                         "Can I buy you Lunch!",
                         "I'm such a Donkey!",
                         "Just fart in my face Already!"
                         ],
    sexValue,
    favoriteValue = "No",
    errMsg = $('errors')
    ;
    makeCats();
     
    var displaylink = $('displayLink');
    displayLink.addEventListener("click", getData);
    var clearLink = $('clear');
    clearLink.addEventListener("click", clearLocal);
    var save = $('submit');
    save.addEventListener("click", validate);
});
