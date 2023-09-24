import { page } from "../component-elements.js";

export function closeHomePage() {
    const homePageContainerDiv = page.homePage.elements.containerDiv;
    homePageContainerDiv.style.display = "none";
}

export default {
    closeHomePage
}