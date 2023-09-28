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

 // nav price button
page.navBar.elements.pricesText.addEventListener('click', function() {
    if (machine.state !== state.NAV_PRICE && machine.state !== state.BOOKING_POLICY && machine.state !== state.ABOUT_ME) {
         if (machine.state === state.HOME) {
            machine.dispatch('navigation', [{type: state.NAV_PRICE}])
        } else if (machine.state === state.PICK_SERVICE) {
            machine.dispatch('navigation', [{type: state.PICK_SERVICE}])
        }
    } else if (machine.state === state.BOOKING_POLICY) {
        machine.dispatch('navToNav', [{type: state.NAV_PRICE}])
    } else if (machine.state === state.ABOUT_ME) {
        console.log(machine.state);
        machine.dispatch('navToNav', [{type: state.NAV_PRICE}])
    }
})

// back button in prices
page.pricesPage.elements.leftChevron.addEventListener('click', function() {
    machine.dispatch('navigation', [{type: 'returnWhereYouCameFrom'}])
})

// booking policy button in nav
page.navBar.elements.bookingPolicyText.addEventListener('click', function() {
        if (machine.state !== state.NAV_PRICE && machine.state !== state.BOOKING_POLICY && machine.state !== state.ABOUT_ME) {
            if (machine.state === state.HOME) {
                machine.dispatch('navigation', [{type: state.BOOKING_POLICY}])
            } else if (machine.state === state.PICK_SERVICE) {
                
                machine.dispatch('navigation', [{type: state.BOOKING_POLICY}])
            }
        } else if (machine.state === state.NAV_PRICE) {
            machine.dispatch('navToNav', [{type: 'nav-to-nav'}])
        } else if (machine.state === state.ABOUT_ME) {
            machine.dispatch('navToNav', [{type: state.BOOKING_POLICY}])
        }
})

// back button in booking policy page
page.bookinPolicyPage.elements.leftChevron.addEventListener('click', function() {
    machine.dispatch('navigation', [{type: 'returnWhereYouCameFrom'}])
})

// about me button in nav
page.navBar.elements.aboutMeText.addEventListener('click', () => {
    if (machine.state !== state.NAV_PRICE && machine.state !== state.BOOKING_POLICY && machine.state !== state.ABOUT_ME) {
        if (machine.state === state.HOME) {
            machine.dispatch('navigation', [{type: state.ABOUT_ME}])
        } else if (machine.state === state.PICK_SERVICE) {
            machine.dispatch('navigation', [{type: state.ABOUT_ME}])
        }
    } else if (machine.state === state.NAV_PRICE) {
        machine.dispatch('navToNav', [{type: 'nav-to-nav'}])
    } else if (machine.state === state.BOOKING_POLICY) {
        machine.dispatch('navToNav', [{type: state.BOOKING_POLICY}])
    }
})

// back button in about me page
page.aboutMePage.elements.leftChevron.addEventListener('click', function() {
    machine.dispatch('navigation', [{type: 'returnWhereYouCameFrom'}])
})