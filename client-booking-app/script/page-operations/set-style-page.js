import { page } from "../component-elements.js";

export function openSetBookingPage() {
    const setBookingContainerDiv = page.setServicePage.elements.container;
    setBookingContainerDiv.style.display = ""
}

export default {
    openSetBookingPage
}