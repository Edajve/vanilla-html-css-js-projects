import { page } from "../component-elements.js"

const pricesContainer = page.pricesPage.elements.container

export function navigate() {
    pricesContainer.style.display = ""
}

export function closePage() {
    pricesContainer.style.display = "none"
}

export default {
    navigate,
    closePage
}