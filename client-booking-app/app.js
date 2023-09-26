import { page } from "./script/component-elements.js";
import { machine } from "./script/state-machine.js";
import { state } from "./script/state.js";

// homepage
page.homePage.elements.setBookingBtn.addEventListener('click', function() {
    machine.dispatch('navigation', [{ type: state.PICK_SERVICE}])
})

// selecting service page
page.footer.elements.prevBtn.addEventListener('click', function() {
    machine.dispatch('navigation', [{type: 'previous_button'}])
})

// prices navigation
page.navBar.elements.pricesText.addEventListener('click', function() {
    machine.dispatch('navigation', [{type: state.NAV_PRICE}])
})

// back button in prices
page.pricesPage.elements.leftChevron.addEventListener('click', function() {
    machine.dispatch('navigation', [{type: 'returnWhereYouCameFrom'}])
})

// booking policy page navigation
page.navBar.elements.bookingPolicyText.addEventListener('click', function() {
    machine.dispatch('navigation', [{type: state.BOOKING_POLICY}])
})