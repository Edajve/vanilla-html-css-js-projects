import { page } from "../component-elements.js"

export function navigate() {
    const pricesContainer = page.pricesPage.elements.container
    pricesContainer.style.display = ""
}

export default {
    navigate
}