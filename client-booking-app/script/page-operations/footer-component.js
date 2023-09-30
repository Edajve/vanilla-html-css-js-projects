import { isFirstStep } from "./progress-bar.js"
import { page } from "../component-elements.js"

const container = page.footer.elements.pageContainer

function prevBtnClicked(){
    const onStepOne = isFirstStep()
    // if we arent on step one use the state machine,
    //depending on where you are in the
    //state go to previous step
    if (!onStepOne) {
   
    }
}

function showFooter() {
    container.style.display = ''
}

function closeFooter() {
    container.style.display = 'none'
}

export default {
    prevBtnClicked,
    showFooter,
    closeFooter      
}