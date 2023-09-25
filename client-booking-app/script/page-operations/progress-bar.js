import { page } from "../component-elements.js"

const arrayOfBars = page.navBar.elements.allProgressionBars
const progressText = page.navBar.textArea

function lastHighlightedBar() {
    for (let i = 0; i < arrayOfBars.length - 1; i++) {
        const currentHighlighted = arrayOfBars[i].classList.contains('highlighted-bar')
        const nextHighlighted = arrayOfBars[i + 1].classList.contains('highlighted-bar')
        if (i === 0 && (!currentHighlighted)) return - 1
        if (currentHighlighted && !nextHighlighted) return i;
    }
    return arrayOfBars.length - 1
}

export function increaseBarIcon(){
    const targetBar = lastHighlightedBar() + 1
    document.getElementById(`progression_${targetBar}`).classList.add('highlighted-bar')
}

export default {
    increaseBarIcon
}