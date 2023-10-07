import { calendar } from "../calendar/calendar.js";
import { page } from "../component-elements.js";
import { closePage } from "./home-page.js";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function getMonthDayAndDateFromJson(monthIndex, dayIndex) { return calendar[monthIndex][dayIndex] }
function getMonthFromJson(monthIndex) { return calendar[monthIndex] }

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
  const currentDay = days[dateObject.getDay()]
  const currentDate = dateObject.getDate()
  const currentMonth = months[dateObject.getMonth()]
  const currentYear = dateObject.getFullYear()
  return [currentDay, currentDate, currentMonth, currentYear]
}

const calendayTime = page.setBookingPage.subPage.monthUI.elements.calendayTime;

function displayCalendar() {
  // display current day in UI of calendar
  const [currentDay, currentDate, currentMonth, currentYear] = returnCurrentDate()
  calendayTime.innerHTML =
   `<i class="fas fa-calendar-day"></i>${currentDay}, ${currentDate} ${currentMonth} ${currentYear}`

  // display body of calendar based off the current day and month
  const allCalendarSpaces = page.setBookingPage.subPage.monthUI.elements.allCalendarSpaces;

  const monthIndex = months.indexOf(currentMonth)

  const dayOfTheMonth = 0 // 0 based
  const day = getMonthDayAndDateFromJson(monthIndex, dayOfTheMonth).day;

  const daysInThisMonth = getMonthFromJson(monthIndex).length
  let dateCalendarUI = 1

  // starting at index 7 because the calendar UI's first row is the day
  for (let calendarSlot = 7; calendarSlot < daysInThisMonth + 7; calendarSlot++) {
    const indexToStartFrom = addIndexDependingOnFirstDay(day)
    if (calendarSlot < indexToStartFrom) continue
    allCalendarSpaces[calendarSlot].children[0].innerHTML = dateCalendarUI
    dateCalendarUI++
  }
}

function addIndexDependingOnFirstDay(day) {
  switch (day) {
    case "Sunday":
      return 0
    case "Monday":
      return 1
    case "Tuesday":
      return 2
    case "Wednesday":
      return 3
    case "Thursday":
      return 4
    case "Friday":
      return 5
    case "Saturday":
      return 6
    default:
      console.error("This is not a day of the week")
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
  dayOfFirstDateOfTheMonth: getMonthDayAndDateFromJson,
  returnPreviousMonth,
  returnNextMonth,
  displayCalendar,
  handleLeftSlider,
  handleRightSlider
};