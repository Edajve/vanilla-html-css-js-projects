import { page } from "../component-elements.js"
import database from "../db/database.js"

const title = page.setBookingPage.subPage.dayUI.elements.titleDate

function showBookingTimeTitle() {
    title.innerHTML = `${database.database.booking.month}, ${database.database.booking.date} ${database.database.booking.day}`
}

function onTimeSlotClick(slot) {
    let targetElement;
    const child = slot.target

    if (child.classList.contains('exact-time')) {
        targetElement = child.parentNode
    } else {
        targetElement = child
    }

    clearAnyPrevChosenTime()
    const target = targetElement.parentNode.id
    targetElement = document.getElementById(`specific-time-${target}`)
    targetElement.parentNode.insertAdjacentElement("afterend", createFillerElement())
}

function clearAnyPrevChosenTime() {
    const allSlots = page.setBookingPage.subPage.dayUI.elements.allTimeSlots
    allSlots.forEach(slot => {
        if (slot.children.length === 2) {
            const secondChild = slot.children[1];
            slot.removeChild(secondChild);
        }
    })
}

function createFillerElement() {
    const parent = document.createElement('div')
    parent.classList.add('time-box', 'highlighted-slot')
    parent.id = 'filler'

    const child = document.createElement('div')
    child.classList.add('colored-slit', 'highlighted-slit')

    const childSibling = document.createElement('div')
    childSibling.classList.add('empty-space')

    parent.appendChild(child)
    parent.appendChild(childSibling)

    return parent
}

function onSliderMove() {
    const value = page.setBookingPage.subPage.dayUI.elements.slider.value
    page.setBookingPage.subPage.dayUI.elements.sliderText.innerHTML = `Length: ${value} minutes`

    const filler = document.getElementById('filler')
    if (filler) filler.style.height = `${value - 10}px`
}

page.setBookingPage.subPage.dayUI.elements.timeSlots.forEach(slot => { slot.addEventListener('click', slot => onTimeSlotClick(slot)) })
page.setBookingPage.subPage.dayUI.elements.slider.addEventListener('input', onSliderMove)

export default {
    showBookingTimeTitle
}