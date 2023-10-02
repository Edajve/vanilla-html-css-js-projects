import { page } from "../component-elements.js"
import footer from "./progress-bar.js"

const container = page.footer.elements.pageContainer
const allPageSteps = page.allPages.pageContainerClasses

export function getCurrentPageIndex() {
    const shownPage = allPageSteps
    let index;
    for (let i = 0; i < shownPage.length; i++) {
        const page = shownPage[i]
        const hasDisplayNone = page.style.display
        if (!hasDisplayNone) index = i
    }
    return index
}

function previousClicked(){
    const currentIndex = getCurrentPageIndex()
    allPageSteps[currentIndex].style.display = 'none'
    allPageSteps[currentIndex - 1].style.display = ''
    if (currentIndex === 1) closeFooter()
    // footer.decreaseBarIcon()
}

function nextClicked() {
    const currentIndex = getCurrentPageIndex()
    allPageSteps[currentIndex].style.display = 'none'
    allPageSteps[currentIndex + 1].style.display = ''
}

function showFooter() {
    container.style.display = ''
}

function closeFooter() {
    container.style.display = 'none'
}

export default {
    previousClicked,
    showFooter,
    closeFooter,
    getCurrentPageIndex,
    nextClicked   
}