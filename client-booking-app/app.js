import { page } from "./script/component-elements.js";
import { machine } from "./script/state-machine.js";

// homepage
page.homePage.elements.setBookingBtn.addEventListener('click', function() {
    machine.dispatch('navigation', [{ type: 'pick_service' }]);
})

// selecting service page
page.footer.elements.prevBtn.addEventListener('click', function() {
    machine.dispatch('navigation', [{type: 'previous_button'}])
})

// prices navigation
page.navBar.elements.pricesText.addEventListener('click', function() {
    machine.dispatch('navigation', [{type: 'price_navigation'}])
})