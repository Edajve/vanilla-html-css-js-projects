import { page } from "./script/component-elements.js";
import { machine } from "./script/state-design-pattern/state-machine.js";
import { state } from "./script/state-design-pattern/state.js";
import setStylePage from "./script/page-operations/set-style-page.js";
import setBookingPage from "./script/page-operations/set-booking-page.js";
import setMonthPage from "./script/page-operations/setMonth-page.js";

const RETURN_STATE = 'returnWhereYouCameFrom'

const handleSetBookingBtnInRootPage = ()  => machine.dispatch('navigation', [{type: state.PICK_SERVICE}])
const handleFooterPreviousClick = () => machine.dispatch('footer', [{type: 'previous_button_in_footer'}])
const handleFooterNextClick = () => machine.dispatch('footer',  [{type: 'next_button_in_footer'}])
const handlePrevButtonInNavPricesPage = () => machine.dispatch('navigation', [{type: RETURN_STATE}])
const handleBackButtonInPolicyPageInNav = () => machine.dispatch('navigation', [{type: RETURN_STATE}])
const handleBackButtonInAboutMePageInNav = () => machine.dispatch('navigation', [{type: RETURN_STATE}])

const handleNavPriceButtonClick = () => {
    if (machine.state !== state.NAV_PRICE && machine.state !== state.BOOKING_POLICY && machine.state !== state.ABOUT_ME) {
         if (machine.state === state.HOME) {
            machine.dispatch('navigation', [{type: state.NAV_PRICE}])
        } else if (machine.state === state.PICK_SERVICE) {
            machine.dispatch('navigation', [{type: state.PICK_SERVICE}])
        } else if (machine.state === state.BOOKING) {
            machine.dispatch('navigation', [{type: state.BOOKING}])
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
        } else if (machine.state === state.BOOKING) {
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
        } else if (machine.state === state.BOOKING) {
            machine.dispatch('navigation', [{type: state.ABOUT_ME}])
        }
    } else if (machine.state === state.NAV_PRICE) {
        machine.dispatch('navToNav', [{type: 'nav-to-nav'}])
    } else if (machine.state === state.BOOKING_POLICY) {
        machine.dispatch('navToNav', [{type: state.BOOKING_POLICY}])
    }
}

// Homepage
page.homePage.elements.setBookingBtn.addEventListener('click', handleSetBookingBtnInRootPage)

// Nav bar
page.navBar.elements.pricesText.addEventListener('click', handleNavPriceButtonClick)
page.navBar.elements.bookingPolicyText.addEventListener('click', handleBookingPolicyButtonInNav)
page.navBar.elements.aboutMeText.addEventListener('click', handleAboutMeButtonInNav)

// Prices element in nav
page.pricesPage.elements.leftChevron.addEventListener('click', handlePrevButtonInNavPricesPage)

// Booking policy element in nav
page.bookinPolicyPage.elements.leftChevron.addEventListener('click', handleBackButtonInPolicyPageInNav)

// About me page in nav
page.aboutMePage.elements.leftChevron.addEventListener('click', handleBackButtonInAboutMePageInNav)

// Set booking price elements
page.setBookingPage.subPage.monthUI.elements.nextButton.addEventListener('click', setBookingPage.handleNextButtonInSubPagesPage)
page.setBookingPage.subPage.dayUI.elements.nextButton.addEventListener('click', setBookingPage.handleNextButtonInSubPagesPage)
page.setBookingPage.subPage.monthUI.elements.leftMonthSlider.addEventListener('click', setMonthPage.handleLeftSlider)
page.setBookingPage.subPage.monthUI.elements.rightMonthSlider.addEventListener('click', setMonthPage.handleRightSlider)

// Footer elements
page.footer.elements.prevBtn.addEventListener('click', handleFooterPreviousClick)
page.footer.elements.nextBtn.addEventListener('click', handleFooterNextClick)

// Set service elements
page.setServicePage.elements.allIndividualServices.forEach(service => {
    service.addEventListener('click', (element) => setStylePage.toggleColor(element))
})