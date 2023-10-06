import { page } from "../component-elements.js"
import footerComponent from "./footer-component.js"
import month from '../page-operations/setMonth-page.js'

const subPages = page.setBookingPage.elements.allSubPages

function handleNextButtonInKycPage() {
    const currentPage = indexOfShownPage()
    subPages[currentPage].style.display = 'none'
    subPages[currentPage + 1].style.display = ''
}


function displayCalendar() {
    let allCalendarSpaces = page.setBookingPage.subPage.monthUI.elements.allCalendarSpaces
    const firstDay = month.whatDayIsTheFirstOfThisMonth(0)
    //start calendar based on what day the first date of the week starts
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const j = days.indexOf(firstDay)

    var calendarNum = 1
    for (let i = 7 + j; i < 35; i++) {
        allCalendarSpaces[i].children[0].innerHTML = calendarNum
        calendarNum += 1
    }
}

function indexOfShownPage() {
    let index;
    for (let i = 0; i < subPages.length; i++) {
        const hasDisplayNone = subPages[i].style.display
        if (!hasDisplayNone) {
            index = i
        }
    }
    return index
}

const container = page.setBookingPage.elements.mainContainer

function closePage() {
    container.style.display = 'none'
    footerComponent.closeFooter()
}

function openPage() {
    container.style.display = ''
    footerComponent.showFooter()
}

export default {
    handleNextButtonInKycPage,
    closePage,
    openPage,
    displayCalendar
}