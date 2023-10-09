import { page } from "../component-elements.js"
import database from "../db/database.js"

const title = page.setBookingPage.subPage.dayUI.elements.titleDate

function showBookingTimeTitle() {
    title.innerHTML = `${database.database.booking.month}, ${database.database.booking.date}`
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
    const guiTime = targetElement.parentNode.getAttribute("gui-date")
    title.innerHTML = `${database.database.booking.month}, ${database.database.booking.date} @${guiTime}`
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
    let value = page.setBookingPage.subPage.dayUI.elements.slider.value
    page.setBookingPage.subPage.dayUI.elements.sliderText.innerHTML = `Length: ${value} minutes`

    const filler = document.getElementById('filler')
    if (filler) filler.style.height = `${fillerAnimation(value)}px`
}

page.setBookingPage.subPage.dayUI.elements.timeSlots.forEach(slot => { slot.addEventListener('click', slot => onTimeSlotClick(slot)) })
page.setBookingPage.subPage.dayUI.elements.slider.addEventListener('input', onSliderMove)

export default {
    showBookingTimeTitle
}

function fillerAnimation(slideVal) {
    const SLIDER_MIN = 0
    const SLIDER_MAX = 240
    slideVal = Math.max(SLIDER_MIN, Math.min(SLIDER_MAX, slideVal));
    const pixels = (slideVal / SLIDER_MAX) * 199
    return pixels;
}
//write a method that grows the filler in day calendar in proportion to the scroll bar

// min 0 on scroll bar
// max 240 on scroll bar
// default scroll bar minutes is 60 minutes
// 240 minutes is 4 hours
// each hour is 48 pixels on the cal