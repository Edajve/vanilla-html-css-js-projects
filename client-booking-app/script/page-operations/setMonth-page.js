import { calendar } from "../calendar/calendar.js";
import { page } from "../component-elements.js";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function dayOfFirstDateOfTheMonth(monthIndex) {
  return calendar.October[monthIndex].day;
}

function returnPreviousMonth(currentCalDate) {
  const literalElement = currentCalDate.split('</i>')[1];
  const month = literalElement.trim().split(' ')[2];
  let index = months.indexOf(month);
  if (index === 0) {
    index = months.length;
  }
  return months[index - 1];
}

function returnNextMonth(currentCalDate) {
  const literalElement = currentCalDate.split('</i>')[1];
  const month = literalElement.trim().split(' ')[2];
  return months[(months.indexOf(month) + 1) % 12];
}

function returnCurrentDate() {
  var dateObject = new Date()
  const day = days[dateObject.getDay()]
  const date = dateObject.getDate()
  const month = months[dateObject.getMonth()]
  const year = dateObject.getFullYear()
  return `${day}, ${date} ${month} ${year}`
}

const calendayTime = page.setBookingPage.subPage.monthUI.elements.calendayTime;

function displayCalendar() {
  // display current day in UI of calendar
  calendayTime.innerHTML = `<i class="fas fa-calendar-day"></i>${returnCurrentDate()}`

  // display body of calendar based off the current day and month
  const allCalendarSpaces = page.setBookingPage.subPage.monthUI.elements.allCalendarSpaces;
  /*
  TODO refactor the json object so that you can dynamically change the month
  depending on the index of what you pass in
  */
  const firstDay = dayOfFirstDateOfTheMonth(0);
  const j = days.indexOf(firstDay);

  let calendarNum = 1;
  for (let i = 7 + j; i < 35; i++) {
    allCalendarSpaces[i].children[0].innerHTML = calendarNum;
    calendarNum += 1;
  }
}

function updateMonthUI(targetMonth) {
  const newDate = `<i class="fas fa-calendar-day"></i> Wednesday, 27 ${targetMonth} 2023`;
  calendayTime.innerHTML = newDate;
}

function handleLeftSlider() {    
  const targetMonth = returnPreviousMonth(calendayTime.innerHTML);
  updateMonthUI(targetMonth);
}

function handleRightSlider() {
  const targetMonth = returnNextMonth(calendayTime.innerHTML);
  updateMonthUI(targetMonth);
}

export default {
  dayOfFirstDateOfTheMonth,
  returnPreviousMonth,
  returnNextMonth,
  displayCalendar,
  handleLeftSlider,
  handleRightSlider
};