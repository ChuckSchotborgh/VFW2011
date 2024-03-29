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
                $('contactForm').style.display = "block";
                $('clear').style.display = "inline";
                $('displayLink').style.display = "inline";
                $('addNew').style.display = "inline";
                $('items').style.display = "none";
                break;
            case "off":
                $('contactForm').style.display = "none";
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
                item.group        = ["Gesture Request Sent:", $('groups').value];
                item.fname        = ["Name of FRIEND:", $('fname').value];
                item.lname        = ["Last Name of FRIEND:", $('lname').value];
                item.email        = ["Email of FRIEND:", $('email').value];
                item.sex          = ["Gesture Post Type:", sexValue];
                item.favorite     = ["Posted to Social Network:", favoriteValue ];      
                item.iq           = ["Emotional Gauge:", $('iq').value];
                item.date         = ["Date Sent:", $('date').value];
                item.notes        = ["My Posted Message is:", $('notes').value];
            localStorage.setItem(id, JSON.stringify(item));
            alert("Contact Saved!");
        }
    //Getting the Local Storage Data via the Key
    function getData(){
        toggleControls("on");
        if(localStorage.length === 0){
            autoFillData();
            alert("There is no data in the Local Storage so default data was added.");
        }
        var makeDiv = document.createElement('div');
        makeDiv.setAttribute("id", "items");
        var makeList = document.createElement('li');
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
            //Function for getting image
            getImage(obj.group[1], makeSubList);
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
    function getImage (catName, makeSubList){
        var imageLi = document.createElement('li');
        makeSubList.appendChild(imageLi);
        var newImg = document.createElement('img');
        var setSrc = newImg.setAttribute("src","images/"+ catName +".png");
        imageLi.appendChild(newImg);
        
    }
    
    //JSON Object
    function autoFillData(){
        var json = {
            "contact1": {
                "group":["Gesture Request Sent:", "PinHead"],
                "fname":["Name of FRIEND:", "James"],
                "lname":["Last Name of FRIEND:", "Matthews"],
                "email":["Email of FRIEND:", "James@James.com"],
                "sex":["Gesture Post Type:", "Male"],
                "favorite":["Posted to Social Network:", "no"],
                "iq":["Emotional Gauge:", "75"],
                "date":["Date Sent:", "2011-11-12"],
                "notes":["My Posted Message is:", "I'm such a PinHead!"]
            },
            "contact2": {
                "group":["Gesture Request Sent:", "Donkey"],
                "fname":["Name of FRIEND:", "Josiah"],
                "lname":["Last Name of FRIEND:", "Schotborgh"],
                "email":["Email of FRIEND:", "Jo@Jo.com"],
                "sex":["Gesture Post Type:", "Male"],
                "favorite":["Posted to Social Network:", "no"],
                "iq":["Emotional Gauge:", "21"],
                "date":["Date Sent:", "2011-11-12"],
                "notes":["My Posted Message is:", "I'm such a Donkey!"]
            },
            "contact3": {
                "group":["Gesture Request Sent:", "Dork"],
                "fname":["Name of FRIEND:", "Hannah"],
                "lname":["Last Name of FRIEND:", "Schotborgh"],
                "email":["Email of FRIEND:", "Hannah@Hannah.com"],
                "sex":["Gesture Post Type:", "Female"],
                "favorite":["Posted to Social Network:", "no"],
                "iq":["Emotional Gauge:", "45"],
                "date":["Date Sent:", "2011-11-12"],
                "notes":["My Posted Message is:", "I'm such a Dork!"]
            },
            "contact4": {
                "group":["Gesture Request Sent:", "ButtHead"],
                "fname":["Name of FRIEND:", "Garrett"],
                "lname":["Last Name of FRIEND:", "Schotborgh"],
                "email":["Email of FRIEND:", "Garrett@Garrett.com"],
                "sex":["Gesture Post Type:", "Male"],
                "favorite":["Posted to Social Network:", "no"],
                "iq":["Emotional Gauge:", "56"],
                "date":["Date Sent:", "2011-11-12"],
                "notes":["My Posted Message is:", "I'm such a ButtHead!"]
                        },
            "contact5": {
                "group":["Gesture Request Sent:", "MonkeySpanker"],
                "fname":["Name of FRIEND:", "Ethan"],
                "lname":["Last Name of FRIEND:", "Schotborgh"],
                "email":["Email of FRIEND:", "Ethan@Ethan.com"],
                "sex":["Gesture Post Type:", "Male"],
                "favorite":["Posted to Social Network:", "no"],
                "iq":["Emotional Gauge:", "78"],
                "date":["Date Sent:", "2011-11-12"],
                "notes":["My Posted Message is:", "I'm such a MonkeySpanker!"]
            },
            "contact6": {
                "group":["Gesture Request Sent:", "LoLo"],
                "fname":["Name of FRIEND:", "Judah"],
                "lname":["Last Name of FRIEND:", "Schotborgh"],
                "email":["Email of FRIEND:", "Judah@Judah.com"],
                "sex":["Gesture Post Type:", "Male"],
                "favorite":["Posted to Social Network:", "no"],
                "iq":["Emotional Gauge:", "34"],
                "date":["Date Sent:", "2011-11-12"],
                "notes":["My Posted Message is:", "I'm such a LoLo!"]
            },
            "contact7": {
                "group":["Gesture Request Sent:", "Catonk"],
                "fname":["Name of FRIEND:", "Anika"],
                "lname":["Last Name of FRIEND:", "Schotborgh"],
                "email":["Email of FRIEND:", "Anika@Anika.com"],
                "sex":["Gesture Post Type:", "Female"],
                "favorite":["Posted to Social Network:", "no"],
                "iq":["Emotional Gauge:", "56"],
                "date":["Date Sent:", "2011-11-12"],
                "notes":["My Posted Message is:", "I'm such a Catonk!"]
                        },
            "contact8": {
                "group":["Gesture Request Sent:", "Dorfus"],
                "fname":["Name of FRIEND:", "Midnight"],
                "lname":["Last Name of FRIEND:", "Schotborgh"],
                "email":["Email of FRIEND:", "Midnight@Midnight.com"],
                "sex":["Gesture Post Type:", "Male"],
                "favorite":["Posted to Social Network:", "no"],
                "iq":["Emotional Gauge:", "65"],
                "date":["Date Sent:", "2011-11-12"],
                "notes":["My Posted Message is:", "I'm such a Dorfus!"]
            },
            "contact9": {
                "group":["Gesture Request Sent:", "LooneyToon"],
                "fname":["Name of FRIEND:", "Deborah"],
                "lname":["Last Name of FRIEND:", "Schotborgh"],
                "email":["Email of FRIEND:", "Deborah@Deborah.com"],
                "sex":["Gesture Post Type:", "Female"],
                "favorite":["Posted to Social Network:", "no"],
                "iq":["Emotional Gauge:", "26"],
                "date":["Date Sent:", "2011-11-12"],
                "notes":["My Posted Message is:", "I'm such a LooneyToon!"]
            },
            "contact10": {
                "group":["Gesture Request Sent:", "Ditwad"],
                "fname":["Name of FRIEND:", "Erica"],
                "lname":["Last Name of FRIEND:", "Moojen"],
                "email":["Email of FRIEND:", "Erica@Erica.com"],
                "sex":["Gesture Post Type:", "Female"],
                "favorite":["Posted to Social Network:", "no"],
                "iq":["Emotional Gauge:", "46"],
                "date":["Date Sent:", "2011-11-12"],
                "notes":["My Posted Message is:", "I'm such a Ditwad!"]
                        },
            "contact11": {
                "group":["Gesture Request Sent:", "Dweeb"],
                "fname":["Name of FRIEND:", "Joel"],
                "lname":["Last Name of FRIEND:", "Moojen"],
                "email":["Email of FRIEND:", "Joel@Joel.com"],
                "sex":["Gesture Post Type:", "Male"],
                "favorite":["Posted to Social Network:", "no"],
                "iq":["Emotional Gauge:", "98"],
                "date":["Date Sent:", "2011-11-12"],
                "notes":["My Posted Message is:", "I'm such a Dweeb!"]
            },
            "contact12": {
                "group":["Gesture Request Sent:", "Kook"],
                "fname":["Name of FRIEND:", "Ron"],
                "lname":["Last Name of FRIEND:", "Moojen"],
                "email":["Email of FRIEND:", "Ron@Ron.com"],
                "sex":["Gesture Post Type:", "Male"],
                "favorite":["Posted to Social Network:", "no"],
                "iq":["Emotional Gauge:", "70"],
                "date":["Date Sent:", "2011-11-12"],
                "notes":["My Posted Message is:", "I'm such a Kook!"]
            },
            "contact13": {
                "group":["Gesture Request Sent:", "Minkey"],
                "fname":["Name of FRIEND:", "Josiah"],
                "lname":["Last Name of FRIEND:", "Schotborgh"],
                "email":["Email of FRIEND:", "Jo@Jo.com"],
                "sex":["Gesture Post Type:", "Male"],
                "favorite":["Posted to Social Network:", "no"],
                "iq":["Emotional Gauge:", "12"],
                "date":["Date Sent:", "2011-11-12"],
                "notes":["My Posted Message is:", "I'm such a Minkey!"]
                        },
            "contact14": {
                "group":["Gesture Request Sent:", "PotatoHead"],
                "fname":["Name of FRIEND:", "Dave"],
                "lname":["Last Name of FRIEND:", "Mandagie"],
                "email":["Email of FRIEND:", "Dave@Dave.com"],
                "sex":["Gesture Post Type:", "Male"],
                "favorite":["Posted to Social Network:", "no"],
                "iq":["Emotional Gauge:", "12"],
                "date":["Date Sent:", "2011-11-12"],
                "notes":["My Posted Message is:", "I'm such a PotatoHead!"]
            },
            "contact15": {
                "group":["Gesture Request Sent:", "DingleBerry"],
                "fname":["Name of FRIEND:", "Matthew"],
                "lname":["Last Name of FRIEND:", "Moojen"],
                "email":["Email of FRIEND:", "Matthew@Matthew.com"],
                "sex":["Gesture Post Type:", "Male"],
                "favorite":["Posted to Social Network:", "no"],
                "iq":["Emotional Gauge:", "34"],
                "date":["Date Sent:", "2011-11-12"],
                "notes":["My Posted Message is:", "I'm such a DingleBerry!"]
            },
            "contact16": {
                "group":["Gesture Request Sent:", "Dufus"],
                "fname":["Name of FRIEND:", "Danny"],
                "lname":["Last Name of FRIEND:", "Mandagie"],
                "email":["Email of FRIEND:", "Danny@Danny.com"],
                "sex":["Gesture Post Type:", "Male"],
                "favorite":["Posted to Social Network:", "no"],
                "iq":["Emotional Gauge:", "54"],
                "date":["Date Sent:", "2011-11-12"],
                "notes":["My Posted Message is:", "I'm such a Dufus!"]
                        },
            "contact17": {
                "group":["Gesture Request Sent:", "NumbSkull"],
                "fname":["Name of FRIEND:", "Michael"],
                "lname":["Last Name of FRIEND:", "Moojen"],
                "email":["Email of FRIEND:", "Michael@Jo.com"],
                "sex":["Gesture Post Type:", "Male"],
                "favorite":["Posted to Social Network:", "no"],
                "iq":["Emotional Gauge:", "27"],
                "date":["Date Sent:", "2011-11-12"],
                "notes":["My Posted Message is:", "I'm such a NumbSkull!"]
            },
            "contact18": {
                "group":["Gesture Request Sent:", "Bonehead"],
                "fname":["Name of FRIEND:", "Robbie"],
                "lname":["Last Name of FRIEND:", "Mandagie"],
                "email":["Email of FRIEND:", "Robbie@Jo.com"],
                "sex":["Gesture Post Type:", "Male"],
                "favorite":["Posted to Social Network:", "no"],
                "iq":["Emotional Gauge:", "73"],
                "date":["Date Sent:", "2011-11-12"],
                "notes":["My Posted Message is:", "I'm such a Bonehead!"]
            },
            "contact19": {
                "group":["Gesture Request Sent:", "Loser"],
                "fname":["Name of FRIEND:", "Nicole"],
                "lname":["Last Name of FRIEND:", "Moojen"],
                "email":["Email of FRIEND:", "Nicole@Nicole.com"],
                "sex":["Gesture Post Type:", "Female"],
                "favorite":["Posted to Social Network:", "no"],
                "iq":["Emotional Gauge:", "13"],
                "date":["Date Sent:", "2011-11-12"],
                "notes":["My Posted Message is:", "I'm such a Loser!"]
                        },
            "contact20": {
                "group":["Gesture Request Sent:", "Dork"],
                "fname":["Name of FRIEND:", "Paul"],
                "lname":["Last Name of FRIEND:", "Mandagie"],
                "email":["Email of FRIEND:", "Paul@Jo.com"],
                "sex":["Gesture Post Type:", "Male"],
                "favorite":["Posted to Social Network:", "no"],
                "iq":["Emotional Gauge:", "74"],
                "date":["Date Sent:", "2011-11-12"],
                "notes":["My Posted Message is:", "I'm a Dork!"]
            }
        };
        //Store The JSON into local storage
        for(var n in json){
            var id                  = Math.floor(Math.random()*100000001);
            localStorage.setItem(id, JSON.stringify(json[n]));
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
        deleteLink.addEventListener("click", deleteItem);
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
        
        //save the key value when we save the data we edited
        editSubmit.addEventListener("click", validate);
        editSubmit.key = this.key;
    }
    function deleteItem(){
        var ask =confirm("Are you sure you want to delete this contact?");
        if(ask){
            localStorage.removeItem(this.key);
             alert("Contact was deleted.")
            window.location.reload();
        }else{
            alert("Contact was NOT deleted.")
        }
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
                getGroup.style.border = "1px solid red";
                getFname.style.border = "1px solid red";
                getLname.style.border = "1px solid red";
                getEmail.style.border = "1px solid red";
                
            // Get Error Messages
            var messageAry = [];
            
            // Group Validation
            if(getGroup.value ==="--add Forgiveness Gesture-"){
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
                        "Dork",
                        "Loser",
                        "Bonehead",
                        "NumbSkull",
                        "Dufus",
                        "DingleBerry",
                        "PotatoHead",
                        "Minkey",
                        "Kook",
                        "Dweeb",
                        "Ditwad",
                        "LooneyToon",
                        "Dorfus",
                        "Catonk",
                        "Dork",
                        "LoLo",
                        "MonkeySpanker",
                        "ButtHead",
                        "PinHead"
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
