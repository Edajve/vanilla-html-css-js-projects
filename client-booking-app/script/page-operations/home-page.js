import { page } from "../component-elements.js";
const homePageContainerDiv = page.homePage.elements.containerDiv;

export function closeHomePage() {
    homePageContainerDiv.style.display = "none";
}

export function openPage() {
 homePageContainerDiv.style.display = ''
}

export default {
    closeHomePage,
    openPage
}