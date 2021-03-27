/*This code uses a date object to create a calender UI that a user can
interact with*/

var currentDay = new Date(); //Creates a date object
var date = currentDay.getDate(); // Retrieves the date value of the date object

/* Retrieves the year and month value of the date object
this variable will be used to set the calender to the current month when necessary*/
var thisYear = currentDay.getFullYear();
var thisMonth = currentDay.getMonth();

var monthAndYear = document.getElementById("monthandyear"); //monthandyear HTML element


var currentMonth = currentDay.getMonth();//sets initial month value
var currentYear = currentDay.getFullYear();//sets initial year value

var cal = document.getElementById("cal");//HTML div containing the calender
var upcoming = document.getElementById("uc");//HTML div to display list item details
var selectYear = document.getElementById("year");// HTML dropdown for selecting year
var selectMonth= document.getElementById("month");// HTML dropdown for selecting month

// The months and days arrays will be used to set the month and day using array index
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

/* This function will be called whenever monthn and/or year
value changes to recreate calender. It takes two arguments for
month and year*/
function creatCalender(month, year){

var today = new Date(year, month); // New date object

let firstDay = today.getDay(); // returns first day of the month. this will be used
							   // used to calculate blank days before first day
var month = month; //
var year = year;

selectYear.value = year; //Sets the year value of HTML dropdown
selectMonth.value = month; //Sets the month value of HTML dropdown
monthAndYear.innerHTML = months[month] + " " + year; // Updates current year and month headind

cal.innerHTML = " "; //sets the calender div content to empty space

// Iterate through the days array, creates div elements and displays days Sunday to Monday
for (var i=0;i<7;i++){
  cell = document.createElement("div");
  cell.classList.add("days");
  cellText = document.createTextNode(days[i]);
  cell.appendChild(cellText);
  cal.appendChild(cell);
}

/*The colNum value increments after each date div is created. will be used to position add "ul-left"
class to lists that overflow to the right*/
var colNum = 0; 
var rowNum = 0;

for (var i=0;i<firstDay;i++){//this iteration creates empty divs before the first day
  cell = document.createElement("div");
  cell.classList.add("cal-div");
  cellText = document.createTextNode(" ");  
  cell.appendChild(cellText);
  cal.appendChild(cell);
  colNum++;
  
}

/*Iterate through the number of days in a month and create div elements 
to contain the dates. Span elements are used to prevent errors when clicks 
are made to dispay details*/
for (var i=1;i<= daysInMonth(month, year);i++){
 var cell = document.createElement("div");
 var cellSpan = document.createElement("span");
 var bubble = document.createElement("div");
 var bubbleSpan = document.createElement("span");
 var iul= document.createElement("ul");// this list will contain information from the database
 bubble.classList.add("bubble");
 cellSpan.classList.add("cellSpan");
 bubbleSpan.classList.add("bubbleSpan");
 
  if (i===date && year === thisYear && thisMonth === month){
    cell.classList.add("today"); // This class uses a different color to mark this present day   
   }
   else{
     cell.classList.add("cal-div");
   } 
  
  cellSpan.addEventListener("click", updateCell);//Binds the span element"s click event to the updatecell function
  cellText = document.createTextNode(i);
  cellSpan.appendChild(cellText);
  cell.appendChild(cellSpan);
  
  /* The code block bellow works with data from then database. The server side script
  prints the javascript array to be manipulate. to prevent errors, the code checks if 
  the variable has been set before doing manipulation.*/
	if (items){
		var bubbleText = 0;		
		for (var j=0;j<items.length;j++){
			var d = new Date(items[j][1]);
			
			//if date matches current day, increment bubbleText and create a new list item
			if (i===d.getDate() && year ===d.getFullYear()  && d.getMonth() === month){
				bubbleText++;  
				var ili= document.createElement("li");
				var icon = document.createElement("i");
				var dLink = document.createElement("a");
				var liSpan = document.createElement("span");
				liSpan.classList.add("lispan");
				dLink.setAttribute("href", "action.php?id="+items[j][0]+"&y="+currentYear+"&m="+currentMonth+"");
				icon.setAttribute("class", "fa fa-trash");
				dLink.setAttribute("title", "Delete");
				dLink.appendChild(icon);
				liSpan.innerHTML=items[j][2];
				liSpan.setAttribute("id", items[j][1]);
				liSpan.addEventListener("click", updateDisplay);
				ili.appendChild(liSpan);
				ili.appendChild(dLink);
				iul.appendChild(ili);
				if (colNum > 4){//console.log(colNum);
					iul.classList.add("ul-left");					
				}
				
			}
		}
		
		// Ensures only bubbles with items are displayed
		if (bubbleText>0){
		var cellT = document.createTextNode(bubbleText);
		bubbleSpan.appendChild(cellT);
		bubble.appendChild(bubbleSpan);
		bubble.appendChild(iul);
		cell.appendChild(bubble);}
	}
  cal.appendChild(cell);
  
  colNum++;
  if (colNum>6){//reset to 0
		colNum=0;
		rowNum++;
	}
}
}
creatCalender(thisMonth, thisYear);//Creates initial calender

function jump() {// Jumps to whatever month or year is selected
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    creatCalender(currentMonth, currentYear);
}

function next() {//creates next month from current month
 currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
   
 creatCalender(currentMonth, currentYear);
}

function previous() {//creates previous month from current month
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    creatCalender(currentMonth, currentYear);
}

function today() {//Returnes to the current month. called by the today button
    currentYear = thisYear;
    currentMonth = thisMonth;
    creatCalender(currentMonth, currentYear);
}

/*this function is called when a cell is clicked on. It retrieves the month and year
 values from the month and year list and uses them to create a date object*/
function updateCell(){modal.style.display = "block";
	var line = document.createElement("p");
	var d = new Date (selectYear.value, selectMonth.value, this.innerHTML).getDay();	
	line.innerHTML = days[d] + " " + months[selectMonth.value] + " " + this.innerHTML +", "+ selectYear.value;
	var message = days[d] + " " + months[selectMonth.value] + " " + this.innerHTML +", "+ selectYear.value;
	document.getElementById("form-h3").innerHTML=message;
	document.getElementById("date").value=message;
}

// This funtion returnes the number of days in the month
function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}

// This funtion is called when a list item is clicked on
function updateDisplay(){
	document.getElementById("display-h4").innerHTML = this.getAttribute("id");
	document.getElementById("display-div").innerHTML = this.innerHTML;
}