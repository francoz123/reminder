var currentDay = new Date();
var date = currentDay.getDate();
var thisYear = currentDay.getFullYear();

var thisMonth = currentDay.getMonth();
var monthAndYear = document.getElementById("monthandyear");


var currentMonth = currentDay.getMonth();
var currentYear = currentDay.getFullYear();

var cal = document.getElementById("cal");
var upcoming = document.getElementById("uc");
var selectYear = document.getElementById("year");
var selectMonth= document.getElementById("month");


var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

var days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];


function creatCalender(month, year){

var today = new Date(year, month);

let firstDay = today.getDay();

var month = today.getMonth();
var year = today.getFullYear();
selectYear.value = year;
selectMonth.value = month;
monthAndYear.innerHTML = months[month] + " " + year;

var cal = document.getElementById("cal");
cal.innerHTML = " ";

for (var i=0;i<7;i++){
  cell = document.createElement("div");
  cell.classList.add("days");
  cellText = document.createTextNode(days[i]);
  cell.appendChild(cellText);
  cal.appendChild(cell);
}

var colNum = 0;
for (var i=0;i<firstDay;i++){
  cell = document.createElement("div");
  cell.classList.add("cal-div");
  cellText = document.createTextNode(" ");  
  cell.appendChild(cellText);
  cal.appendChild(cell);
  colNum++;
  
}
//var z = 31;

for (var i=1;i<= daysInMonth(month, year);i++){
 var cell = document.createElement("div");
 var cellSpan = document.createElement("span");
 var bubble = document.createElement("div");
 var bubbleSpan = document.createElement("span");
 var iul= document.createElement("ul");
 bubble.classList.add("bubble");
 cellSpan.classList.add("cellSpan");
 bubbleSpan.classList.add("bubbleSpan");
 //bubble.appendChild(cellT);
    //bubble.appendChild(iul);
    //cell.appendChild(bubble);
  //iul.appendChild(ili);
  //iul.appendChild(ili2);
  if (i===date && year === thisYear && thisMonth === month){
    cell.classList.add("today");    
   }
   else{
     cell.classList.add("cal-div");
   } 
  //cell.style.zIndex = z;
  cellSpan.addEventListener("click", updateCell);
  cellText = document.createTextNode(i);
  cellSpan.appendChild(cellText);
  cell.appendChild(cellSpan);
	if (items){
		var bubbleText = 0;		
		for (var j=0;j<items.length;j++){
			var d = new Date(items[j][1]);
			if (i===d.getDate() && year ===d.getFullYear()  && d.getMonth() === month){
				bubbleText++;  
				var ili= document.createElement("li");
				var icon = document.createElement("i");
				var dLink = document.createElement("a");
				var liSpan = document.createElement("span");
				liSpan.classList.add("lispan");
				dLink.setAttribute("href", "calender.php?id="+items[j][0]+"&y="+currentYear+"&m="+currentMonth+"");
				icon.setAttribute("class", "fa fa-trash");
				dLink.setAttribute("title", "Delete");
				dLink.appendChild(icon);
				//icon.innerHTML = "delete";
				liSpan.innerHTML=items[j][2];
				liSpan.setAttribute("id", items[j][1]);
				liSpan.addEventListener("click", updateDisplay);
				ili.appendChild(liSpan);
				ili.appendChild(dLink);
				iul.appendChild(ili);
				if (colNum > 4){console.log(colNum);
					iul.classList.add("ul-left");
					
				}
		
			}
		}
		if (bubbleText>0){
		var cellT = document.createTextNode(bubbleText);
		bubbleSpan.appendChild(cellT);
		bubble.appendChild(bubbleSpan);
		bubble.appendChild(iul);
		cell.appendChild(bubble);}
	}
  cal.appendChild(cell);
  //z--;
  colNum++;
  if (colNum>6){
		colNum=0;
	}
}
}
creatCalender(thisMonth, thisYear);

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    creatCalender(currentMonth, currentYear);
}

function next() {
 currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
   
 creatCalender(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    creatCalender(currentMonth, currentYear);
}

function today() {
    currentYear = thisYear;
    currentMonth = thisMonth;
    creatCalender(currentMonth, currentYear);
}

function updateCell(){modal.style.display = "block";
	var line = document.createElement("p");
	var d = new Date (selectYear.value, selectMonth.value, this.innerHTML).getDay();	
	line.innerHTML = days[d] + " " + months[selectMonth.value] + " " + this.innerHTML +", "+ selectYear.value;
	var message = days[d] + " " + months[selectMonth.value] + " " + this.innerHTML +", "+ selectYear.value;
	document.getElementById("form-h3").innerHTML=message;
	upcoming.appendChild(line);
	document.getElementById("date").value=message;
}

function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}

function updateDisplay(){
	document.getElementById("display-h4").innerHTML = this.getAttribute("id");
	document.getElementById("display-div").innerHTML = this.innerHTML;
}