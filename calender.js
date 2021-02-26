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

for (var i=0;i<firstDay;i++){
  cell = document.createElement("div");
  cell.classList.add("cal-div");
  cellText = document.createTextNode(" ");
  cell.appendChild(cellText);
  cal.appendChild(cell);
}

for (var i=1;i<= daysInMonth(month, year);i++){
  cell = document.createElement("div");
  if (i===date && year === thisYear && thisMonth === month){
    cell.classList.add("today");
   }
   else{
     cell.classList.add("cal-div");
   }
  cell.addEventListener("click", updateCell);
  cellText = document.createTextNode(i);
  cell.appendChild(cellText);
  cal.appendChild(cell);
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
	upcoming.appendChild(line);
	document.getElementById("date").value=message;
}

function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}
