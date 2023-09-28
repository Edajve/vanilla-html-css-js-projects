import { page } from "./script/component-elements.js";
import { machine } from "./script/state-machine.js";
import { state } from "./script/state.js";
import setStylePage from "./script/page-operations/set-style-page.js";

const RETURN_STATE = 'returnWhereYouCameFrom'

const handleSetBookingBtnInRootPage = ()  => machine.dispatch('navigation', [{type: state.PICK_SERVICE}])
const handlePrevBtnInSetServicePage = () => machine.dispatch('navigation', [{type: 'previous_button_in_footer'}])
const handlePrevButtonInNavPricesPage = () => machine.dispatch('navigation', [{type: RETURN_STATE}])
const handleBackButtonInPolicyPageInNav = () => machine.dispatch('navigation', [{type: RETURN_STATE}])
const handleBackButtonInAboutMePageInNav = () => machine.dispatch('navigation', [{type: RETURN_STATE}])

const handleNavPriceButtonClick = () => {
    if (machine.state !== state.NAV_PRICE && machine.state !== state.BOOKING_POLICY && machine.state !== state.ABOUT_ME) {
         if (machine.state === state.HOME) {
            machine.dispatch('navigation', [{type: state.NAV_PRICE}])
        } else if (machine.state === state.PICK_SERVICE) {
            machine.dispatch('navigation', [{type: state.PICK_SERVICE}])
        }
    } else if (machine.state === state.BOOKING_POLICY) {
        machine.dispatch('navToNav', [{type: state.NAV_PRICE}])
    } else if (machine.state === state.ABOUT_ME) {
        machine.dispatch('navToNav', [{type: state.NAV_PRICE}])
    }
}

const handleBookingPolicyButtonInNav = () => {
    if (machine.state !== state.NAV_PRICE && machine.state !== state.BOOKING_POLICY && machine.state !== state.ABOUT_ME) {
        if (machine.state === state.HOME) {
            machine.dispatch('navigation', [{type: state.BOOKING_POLICY}])
        } else if (machine.state === state.PICK_SERVICE) {
            machine.dispatch('navigation', [{type: state.BOOKING_POLICY}])
        }
    } else if (machine.state === state.NAV_PRICE) {
        machine.dispatch('navToNav', [{type: state.BOOKING_POLICY}])
    } else if (machine.state === state.ABOUT_ME) {
        machine.dispatch('navToNav', [{type: state.BOOKING_POLICY}])
    }
}

const handleAboutMeButtonInNav = () => {
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
}

page.homePage.elements.setBookingBtn.addEventListener('click', handleSetBookingBtnInRootPage)
page.footer.elements.prevBtn.addEventListener('click', handlePrevBtnInSetServicePage)
page.navBar.elements.pricesText.addEventListener('click', handleNavPriceButtonClick)
page.pricesPage.elements.leftChevron.addEventListener('click', handlePrevButtonInNavPricesPage)
page.navBar.elements.bookingPolicyText.addEventListener('click', handleBookingPolicyButtonInNav)
page.bookinPolicyPage.elements.leftChevron.addEventListener('click', handleBackButtonInPolicyPageInNav)
page.navBar.elements.aboutMeText.addEventListener('click', handleAboutMeButtonInNav)
page.aboutMePage.elements.leftChevron.addEventListener('click', handleBackButtonInAboutMePageInNav)

page.setServicePage.elements.allServices.forEach(service => {
    service.addEventListener('click', () => setStylePage.toggleColor())
})