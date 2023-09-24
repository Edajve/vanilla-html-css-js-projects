import { page } from "../component-elements.js"

const arrayOfBars = page.navBar.elements.allProgressionBars
const currentBarHighlighted = arrayOfBars[i].classList === 'highlighted-bar'
const nextBarHighlighted = arrayOfBars[i + 1].classList === 'highlighted-bar'
const progressText = page.navBar.textArea

function lastHighlightedBar() {
    for (let i = 0; i < arrayOfBars.length - 1; i++) {
        if (currentBarHighlighted && !nextBarHighlighted) {

        }
    }
}

export function increaseBarIcon() {
    
    for (let i = 0; i < arrayOfBars.length - 1; i++) {
        if (currentBarHighlighted && !nextBarHighlighted) {

        }
    }
}

export function decreaseBarIcon() {
}

export function increaseProgressText() {
}

export function decreaseProgressText() {
}

export default {
    increaseBarIcon,
    decreaseBarIcon,
    increaseProgressText,
    decreaseProgressText
}