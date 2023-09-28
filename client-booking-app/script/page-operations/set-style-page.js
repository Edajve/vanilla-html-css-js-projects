import { page } from "../component-elements.js";
import footerComponent from "./footer-component.js";

const setBookingContainerDiv = page.setServicePage.elements.container;

export function toggleColor() {
   console.log("here");
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