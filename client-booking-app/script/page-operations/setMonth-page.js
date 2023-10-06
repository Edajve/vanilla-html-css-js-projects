import { calendar } from "../calendar/calendar.js"

function dayOfFirstDateOfTheMonth(monthIndex) {
    return calendar.January[monthIndex].day
}

export default {
   whatDayIsTheFirstOfThisMonth: dayOfFirstDateOfTheMonth
}