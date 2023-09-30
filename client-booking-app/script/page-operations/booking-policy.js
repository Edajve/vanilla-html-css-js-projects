import { page } from "../component-elements.js";

const container = page.bookinPolicyPage.elements.pageContainer

export function openPage() {
    container.style.display = ""
}

export function closePage() {
    container.style.display = 'none'
}

export default {
    openPage,
    closePage
}