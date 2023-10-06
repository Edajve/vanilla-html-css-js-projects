import { calendar } from "../calendar/calendar.js"
import { page } from "../component-elements.js";

const months = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];

function dayOfFirstDateOfTheMonth(monthIndex) {
    return calendar.January[monthIndex].day
}

function returnPreviousMonth(currentCalDate) {
    const literalElement = currentCalDate.split('</i>')[1]
    const month = literalElement.trim().split(' ')[2]
    let index = months.indexOf(month)
    if (index === 0) {
        index = months.length
        return months[index - 1 ]
    }else return months[index - 1 ]
}

function returnNextMonth(currentCalDate) {
    const literalElement = currentCalDate.split('</i>')[1]
    const month = literalElement.trim().split(' ')[2]
    return months[months.indexOf(month) + 1 ]
}

function displayCalendar() {
    let allCalendarSpaces = page.setBookingPage.subPage.monthUI.elements.allCalendarSpaces
    const firstDay = dayOfFirstDateOfTheMonth(0)
    //start calendar based on what day the first date of the week starts
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const j = days.indexOf(firstDay)

    var calendarNum = 1
    for (let i = 7 + j; i < 35; i++) {
        allCalendarSpaces[i].children[0].innerHTML = calendarNum
        calendarNum += 1
    }
}

const calendayTime = page.setBookingPage.subPage.monthUI.elements.calendayTime

function handleLeftSlider() {    
    const targetMonth = returnPreviousMonth(calendayTime.innerHTML)
    // inside of the parent p tag is an icon and text
    const newDate = `<i class="fas fa-calendar-day"></i>
    Wednesday, 27 ${targetMonth} 2023`
    calendayTime.innerHTML = newDate
}

function handleRightSlider() {
    const targetMonth = returnNextMonth(calendayTime.innerHTML)
    // inside of the parent p tag is an icon and text
    const newDate = `<i class="fas fa-calendar-day"></i>
    Wednesday, 27 ${targetMonth} 2023`
    calendayTime.innerHTML = newDate
}


export default {
   dayOfFirstDateOfTheMonth,
   returnPreviousMonth,
   returnNextMonth,
   displayCalendar,
   handleLeftSlider,
   handleRightSlider
}