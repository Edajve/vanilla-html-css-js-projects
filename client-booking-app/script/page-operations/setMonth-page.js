import { calendar } from "../calendar/calendar.js";
import { page } from "../component-elements.js";

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
  const monthName = months[dateObject.getMonth()]
  const currentYear = dateObject.getFullYear()
  return [currentDay, currentDate, monthName, currentYear]
}

const calendayTime = page.setBookingPage.subPage.monthUI.elements.calendayTime;
const [currentDay, currentDate, monthName, currentYear] = returnCurrentDate()
const allCalendarSpaces = page.setBookingPage.subPage.monthUI.elements.allCalendarSpaces;

function clearCalendarBody() {
  for (let calendarSlot = 7; calendarSlot < allCalendarSpaces.length; calendarSlot++) {
    allCalendarSpaces[calendarSlot].classList.remove('highlighted')
    allCalendarSpaces[calendarSlot].classList.remove('doubleDigit')
    allCalendarSpaces[calendarSlot].children[0].innerHTML = ''
  }
}

function displayCalendar() {
  // display current day in UI of calendar
  calendayTime.innerHTML =
   `<i class="fas fa-calendar-day"></i>${currentDay}, 00 ${monthName} ${currentYear}`
  
   renderCalendarBody(monthName)
}

function renderCalendarBody(monthName) {

  const monthIndex = months.indexOf(monthName)

  const dayOfTheMonth = 0 // 0 based
  const day = getMonthDayAndDateFromJson(monthIndex, dayOfTheMonth).day;

  const daysInThisMonth = getMonthFromJson(monthIndex).length
  let dateCalendarUI = 1
  const TOTAL_SQUARES = 49

  // starting at index 7 because the calendar UI's first row is the day
  for (let calendarSlot = 7; calendarSlot < TOTAL_SQUARES; calendarSlot++) {
    const indexToStartAfter = addIndexDependingOnFirstDay(day) + 7
    const indexIsBeforeStartLimit = calendarSlot < indexToStartAfter
    const indexIsOutOfEndLimit = dateCalendarUI > daysInThisMonth

    if (indexIsBeforeStartLimit || indexIsOutOfEndLimit) continue

    if (dateCalendarUI > 9) allCalendarSpaces[calendarSlot].children[0].classList.add('doubleDigit')
    allCalendarSpaces[calendarSlot].classList.add('highlighted')
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

/*
  TODOS: Add the date that the user has choosen and add it to a json file acting as a DB
*/
function handleCalendarBoxClick(element) {
    highlightCalendarSlot(element)
}

function highlightCalendarSlot(element) {
  try {
    let parentEl;
    
    if (
      element.target.classList.contains('days-of-week-container') ||
      element.target.classList.contains('day-name')
    ) return

    if (!element.target.classList.contains('highlighted')) return

    if (element.target.classList.contains('date-num')) {
      parentEl = element.target.parentNode
    } else {
      parentEl = element.target
    }
    
    page.setBookingPage.subPage.monthUI.elements.allCalendarSpaces.forEach(slot => {
      slot.classList.remove('clicked-time-slot')
    })

    parentEl.classList.add('clicked-time-slot')

  } catch (error) {
    console.error(error)
  }
}

function updateMonthUI(currentDay, targetMonth) {
  const newDate = `<i class="fas fa-calendar-day"></i> ${currentDay}, 00 ${targetMonth} 2023`;
  calendayTime.innerHTML = newDate;
}

function handleLeftSlider() {    
  const targetMonth = returnPreviousMonth(calendayTime.innerHTML);
  updateMonthUI(currentDay, targetMonth);
  clearCalendarBody()
  renderCalendarBody(targetMonth)
}

function handleRightSlider() {
  const targetMonth = returnNextMonth(calendayTime.innerHTML);
  updateMonthUI(currentDay, targetMonth);
  clearCalendarBody()
  renderCalendarBody(targetMonth)
}

//give the clickable days a event listner
page.setBookingPage.subPage.monthUI.elements.allCalendarSpaces.forEach(slot => {
  slot.addEventListener('click', element => handleCalendarBoxClick(element))
})

export default {
  dayOfFirstDateOfTheMonth: getMonthDayAndDateFromJson,
  returnPreviousMonth,
  returnNextMonth,
  displayCalendar,
  handleLeftSlider,
  handleRightSlider,
  handleCalendarBoxClick
};