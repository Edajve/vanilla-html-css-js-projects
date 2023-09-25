import { page } from "../component-elements.js"

const arrayOfBars = page.navBar.elements.allProgressionBars
const progressText = page.navBar.elements.progressStepsText

const state = ['Step 1: Service', 'Step 2: Booking', 'Step 3: Information', 'Step 4: Finalize']

function lastHighlightedBar() {
    for (let i = 0; i < arrayOfBars.length - 1; i++) {
        const currentHighlighted = arrayOfBars[i].classList.contains('highlighted-bar')
        const nextHighlighted = arrayOfBars[i + 1].classList.contains('highlighted-bar')
        if (i === 0 && (!currentHighlighted)) return - 1
        if (currentHighlighted && !nextHighlighted) return i;
    }
    return arrayOfBars.length - 1
}

function updateNavText(index) {
    progressText.innerHTML = state[index]
}

export function increaseBarIcon(){
    const targetIndex = lastHighlightedBar() + 1
    document.getElementById(`progression_${targetIndex}`).classList.add('highlighted-bar')
    updateNavText(targetIndex)
}

export default {
    increaseBarIcon
}