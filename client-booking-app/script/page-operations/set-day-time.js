import { page } from "../component-elements.js"
import database from "../db/database.js"

const title = page.setBookingPage.subPage.dayUI.elements.titleDate

function showBookingTimeTitle() {
    console.log(database)
    title.innerHTML = `${database.database.booking.month}, ${database.database.booking.date} ${database.database.booking.day}`
}

export default {
    showBookingTimeTitle
}