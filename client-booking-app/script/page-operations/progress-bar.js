import { page } from "../component-elements.js"

const arrayOfBars = page.navBar.elements.allProgressionBars
const progressText = page.navBar.elements.progressStepsText

const state = ['Step 1: Service', 'Step 2: Booking', 'Step 3: Information', 'Step 4: Finalize', 'Step 0: Intro']

function lastHighlightedBar() {
    for (let i = 0; i < arrayOfBars.length - 1; i++) {
        const currentHighlighted = arrayOfBars[i].classList.contains('highlighted-bar')
        const nextHighlighted = arrayOfBars[i + 1].classList.contains('highlighted-bar')
        if (i === 0 && (!currentHighlighted)) return 0
        if (currentHighlighted && !nextHighlighted) return i;
    }
    return arrayOfBars.length - 1
}

function updateNavText(index) {
    progressText.innerHTML = state[index]
}

export function isFirstStep() {
    var amountHighlighted = 0;
    const array = Array.from(arrayOfBars)
    
    for (let i = 0; i < array.length; i++) {
        if (array[i].classList.contains('highlighted-bar')) {
            amountHighlighted += 1
        }
    }

    if (amountHighlighted === 1) {
        if (array[0].id === 'progression_0') {
            return true
        }
    }
    return false;
}

export function increaseBarIcon(){
    const targetIndex = lastHighlightedBar()
    for (let i = 0; i <= targetIndex; i++) {
        document.getElementById(`progression_${i}`).classList.add('highlighted-bar')
    }
    updateNavText(targetIndex)
}

/*
Need to finish working on this method, trying to get the bar icon to decrease
as well with the text. Going to work on the next button because its easeir, the home page
is an edge case that has its own special logic
*/
export function decreaseBarIcon(){
    const targetIndex = lastHighlightedBar()
    if (targetIndex === 0) {
        console.log("here")
        updateNavText(3)
    } {
        for (let i = targetIndex; i > 0; i--) {
            document.getElementById(`progression_${i}`).classList.add('highlighted-bar')
        }
        updateNavText(targetIndex)
    }
}

export default {
    increaseBarIcon,
    isFirstStep,
    decreaseBarIcon
}