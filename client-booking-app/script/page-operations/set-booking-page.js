import { page } from "../component-elements.js"
import footerComponent from "./footer-component.js"
import setDayTime from "./set-day-time.js"

const subPages = page.setBookingPage.elements.allSubPages

function handleNextButtonInSubPagesPage() {
    const currentPage = indexOfShownPage()
    subPages[currentPage].style.display = 'none'
    subPages[currentPage + 1].style.display = ''

    setDayTime.showBookingTimeTitle()
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
    handleNextButtonInSubPagesPage,
    closePage,
    openPage
}