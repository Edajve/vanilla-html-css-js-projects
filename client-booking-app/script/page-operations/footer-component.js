import { isFirstStep } from "./progress-bar.js"

function prevBtnClicked(){
    const onStepOne = isFirstStep()
    // if we arent on step one use the state machine,
    //depending on where you are in the
    //state go to previous step
    if (!onStepOne) {
   
    }
}

export default {
    prevBtnClicked
}