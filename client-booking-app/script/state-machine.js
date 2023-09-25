import { stateEnum } from "./state-enum.js"
import homePage from "./page-operations/home-page.js"
import setBookingPage from "./page-operations/set-booking-page.js";
import progressBar from "./page-operations/progress-bar.js";

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
                }
            }
        },
        'pick_service': {

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
