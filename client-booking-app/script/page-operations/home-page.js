import { page } from "../component-elements.js";
const homePageContainerDiv = page.homePage.elements.pageContainer;

export function closePage() {
    homePageContainerDiv.style.display = "none";
}

export function openPage() {
    homePageContainerDiv.style.display = ''
}

export default {
    closePage,
    openPage
}