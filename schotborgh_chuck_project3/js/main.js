	/*Activity 2
	 Chuck Schotborgh Visual Frameworks 11/2011 project 2
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
    //Storing Data to local storage finding random ID num and the values 
	function storeData(){
	var id        		  = Math.floor(Math.random()*100000001);
	getSelectedRadio();
	getSelectedRadio();
	    var item          = {};
	    item.group        = ["My Emotion:", $('groups').value];
	    item.fname        = ["First Name:", $('fname').value];
	    item.lname        = ["Last Name:", $('lname').value];
		item.email 		  = ["Email:", $('email').value];
		item.sex          = ["Gender Offender:", sexValue];
	    item.favorite     = ["Posted Online:", favoriteValue ];	  
	    item.iq           = ["Rage Gauge:", $('iq').value];
	    item.date         = ["Date:", $('date').value];
	    item.notes        = ["My Entry:", $('notes').value];
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
		//editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		var breakTag =document.createElement('br');
		linksLi.appendChild(breakTag);
		
		var deleteLink = document.createElement('a');
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Contact";
		//deleteLink.addEventListener("click", editItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
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
    
    /*Variable defaults*/
    var contactGroups = ["--Current State of Mind--",
						 "Exhuasted",
						 "Suspicious",
						 "Shocked",
						 "Overwhelmed",
						 "Frustrated",
						 "Sad",
						 "Hysterical",
						 "Embarrassed",
						 "Angry",
						 "Confused",
						 "Enraged",
						 "Ashamed",
						 "Lonely",
						 "Frightend",
						 "Smug",
						 "Jealous",
						 "Suprised",
						 "Anxious",
						 "Mischievous",
						 "PissedOff",
						 "Disgusted",
						 ],
    sexValue,
    favoriteValue = "No"
    ;
    makeCats();
     
    var displaylink = $('displayLink');
    displayLink.addEventListener("click", getData);
    var clearLink = $('clear');
    clearLink.addEventListener("click", clearLocal);
    var save = $('submit');
    save.addEventListener("click", storeData);
});