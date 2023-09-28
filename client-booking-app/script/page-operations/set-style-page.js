import { page } from "../component-elements.js";
import footerComponent from "./footer-component.js";

const setBookingContainerDiv = page.setServicePage.elements.container;

export function toggleColor(element) {
    const id = element.currentTarget.id;
    const parentElement = document.getElementById(id);
    if (parentElement) parentElement.querySelector('.select-button').classList.toggle('selected')
}

export function openPage() {
    setBookingContainerDiv.style.display = ""
    footerComponent.showFooter()
}

export function closePage() {
    setBookingContainerDiv.style.display = 'none'
    footerComponent.closeFooter()
}

export default {
    openPage,
    closePage,
    toggleColor
}