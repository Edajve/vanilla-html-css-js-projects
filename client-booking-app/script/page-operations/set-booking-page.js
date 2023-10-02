import { page } from "../component-elements.js"

const subPages = page.setBookingPage.elements.allSubPages

function handleNextButtonInKycPage() {
    const currentPage = indexOfShownPage()
    subPages[currentPage].style.display = 'none'
    subPages[currentPage + 1].style.display = ''
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

export default {
    handleNextButtonInKycPage
}