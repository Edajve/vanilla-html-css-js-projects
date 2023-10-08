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

    const target = targetElement.parentNode.id = 1
    targetElement = document.getElementById(`specific-time-${target}`)
    targetElement.parentNode.insertAdjacentElement("afterend", createFillerElement())
}

function createFillerElement() {
    const parent = document.createElement('div')
    parent.classList.add('time-box', 'highlighted-slot')

    const child = document.createElement('div')
    child.classList.add('colored-slit', 'highlighted-slit')

    const childSibling = document.createElement('div')
    childSibling.classList.add('empty-space')

    parent.appendChild(child)
    parent.appendChild(childSibling)

    return parent
}

page.setBookingPage.subPage.dayUI.elements.timeSlots.forEach(slot => { slot.addEventListener('click', slot => onTimeSlotClick(slot)) })
page.setBookingPage.subPage.dayUI.elements.slider.addEventListener('input', function() {
    const value = page.setBookingPage.subPage.dayUI.elements.slider.value
    page.setBookingPage.subPage.dayUI.elements.sliderText.innerHTML = `Session Length: ${value} minutes`
    console.log(value)
})

export default {
    showBookingTimeTitle
}