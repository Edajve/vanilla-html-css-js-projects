import { page } from "./script/component-elements.js";
import { machine } from "./script/state-machine.js";
import { stateEnum } from "./script/state-enum.js";

page.homePage.elements.setBookingBtn.addEventListener('click', function() {
    machine.dispatch(stateEnum.PICK_SERVICE, [{ type: 'pick_service' }]);
})