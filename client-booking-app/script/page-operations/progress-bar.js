import { page } from "../component-elements.js"

const arrayOfBars = page.navBar.elements.allProgressionBars
const progressText = page.navBar.elements.progressStepsText

const state = ['Step 0: Intro', 'Step 1: Service', 'Step 2: Booking', 'Step 3: Information', 'Step 4: Finalize']

function lastHighlightedBar() {
   return state.indexOf(progressText.innerHTML)
}

function updateNavText(index) {
    progressText.innerHTML = state[index]
}

export function increaseBarIcon(){
    const currentIndex = lastHighlightedBar()
    if (currentIndex === 0) {
        arrayOfBars[0].classList.add('highlighted-bar')
        updateNavText(currentIndex + 1)
    } else {
        for (let i = 0; i < currentIndex + 1; i++) {
            const current = arrayOfBars[i]
            if (!current.classList.contains('highlighted-bar')) {
                current.classList.add('highlighted-bar')
            }
        }
        updateNavText(currentIndex + 1)
    }
}

export function decreaseBarIcon(){
    const currentIndex = lastHighlightedBar()
    const newTargetIndex = currentIndex - 1
    arrayOfBars[newTargetIndex].classList.remove('highlighted-bar')
    updateNavText(newTargetIndex)
}

export default {
    increaseBarIcon,
    decreaseBarIcon
}