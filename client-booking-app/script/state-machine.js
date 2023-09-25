import { stateEnum } from "./state-enum.js"
import homePage from "./page-operations/home-page.js"
import setBookingPage from "./page-operations/set-booking-page.js";
import footerComponent from "./page-operations/footer-component.js";
import progressBar from "./page-operations/progress-bar.js";
import pricesPage from "./page-operations/prices-page.js";

export const machine = {
    state: stateEnum.HOME,
    transitions: {
        'home': {
            navigation: function (action) {
                if (action.type === 'pick_service') {
                    progressBar.increaseBarIcon()
                    homePage.closeHomePage()
                    setBookingPage.openSetBookingPage()
                    this.changeState("pick_service")
                } else if (action.type === 'price_navigation') {
                    homePage.closeHomePage()
                    pricesPage.navigate()
                    this.changeState("price_navigation")
                }
            }
        },
        'pick_service': {
            navigation: function (action) {
                if (action.type === 'previous_button') {
                    footerComponent.prevBtnClicked()
                }
            }
        },
        'price_navigation': {

        },
        'setBooking': {

        },
        'about_me': {

        },
        'know_your_cutsomer': {

        },
        'booking': {

        },
        'finalize': {

        }
    },
    dispatch(actionName, ...payload) {
                const actions = this.transitions[this.state];
                const action = this.transitions[this.state][actionName];
        
                if (action) {
                    action.apply(machine, ...payload);
                } else {
                    console.log("action is not valid for current state");
                }
            },
            changeState(newState) {
                this.state = newState;
            }
};
