import { page } from "./script/component-elements.js";
import { machine } from "./script/state-machine.js";
import { state } from "./script/state.js";

// homepage -> step one
page.homePage.elements.setBookingBtn.addEventListener('click', function() {
    machine.dispatch('navigation', [{ type: state.PICK_SERVICE}])
})

// clicking back button from step one
page.footer.elements.prevBtn.addEventListener('click', function() {
    machine.dispatch('navigation', [{type: 'previous_button'}])
})

// homepage -> prices in nav
page.navBar.elements.pricesText.addEventListener('click', function() {
    machine.dispatch('navigation', [{type: state.NAV_PRICE}])
})

// back button in prices
page.pricesPage.elements.leftChevron.addEventListener('click', function() {
    machine.dispatch('navigation', [{type: 'returnWhereYouCameFrom'}])
})

// homepage -> booking policy in nav
page.navBar.elements.bookingPolicyText.addEventListener('click', function() {
        if (state.state !== state.NAV_PRICE && state.state !== state.BOOKING_POLICY && state.state !== state.ABOUT_ME) {
            machine.dispatch('navigation', [{type: state.BOOKING_POLICY}])
        }
         machine.dispatch('navigation', [{type: 'nav-to-nav'}])
})

// back button in booking policy page
page.bookinPolicyPage.elements.leftChevron.addEventListener('click', function() {
    machine.dispatch('navigation', [{type: 'returnWhereYouCameFrom'}])
})

// homepage -> about me page in nav
page.navBar.elements.aboutMeText.addEventListener('click', () => {
    machine.dispatch('navigation', [{type: state.ABOUT_ME}])
})

// back button in about me page
page.aboutMePage.elements.leftChevron.addEventListener('click', function() {
    machine.dispatch('navigation', [{type: 'returnWhereYouCameFrom'}])
})