import { page } from "./script/component-elements.js";
import { stateEnum } from "./script/state-enum.js";
import { machine } from "./script/state-machine.js";

const setBookingBtn = page.homePage.elements.setBookingBtn;
setBookingBtn.addEventListener('click', function() {
    const x = page.homePage.elements.containerDiv;
    x.style.display = "none";
    /*
you stopped here, go watch some more vidwos on finite state
fir some reason inside the 'pick_service' method thats inside the 
home transition method is not working, debug and find that out. 
you got to the point inthe UI where you delete the homepage div
when youclick the set booking button
    */
    machine.dispatch('pick_service', { action: 'pick_service' });

})