import { state } from "./state.js"
import homePage from "./page-operations/home-page.js"
import setStylesPage from "./page-operations/set-style-page.js";
import footerComponent from "./page-operations/footer-component.js";
import progressBar from "./page-operations/progress-bar.js";
import pricesPage from "./page-operations/prices-page.js";
import bookingPolicy from "./page-operations/booking-policy.js";
import aboutMePage from "./page-operations/about-me-page.js";

export const machine = {
    state: state.HOME,
    previousState: null,
    transitions: {
        'home': {
            navigation: function (action) {
                homePage.closePage()

                if (action.type === state.PICK_SERVICE) {
                    progressBar.increaseBarIcon()
                    setStylesPage.openSetBookingPage()
                    this.changeState(state.PICK_SERVICE)
                } else if (action.type === state.NAV_PRICE) {
                    pricesPage.navigate()
                    this.changeState(state.NAV_PRICE)
                } else if (action.type === state.BOOKING_POLICY) {
                    bookingPolicy.openPage()
                    this.changeState(state.BOOKING_POLICY)
                } else if (action.type === state.ABOUT_ME) {
                    aboutMePage.openPage()
                    this.changeState(state.ABOUT_ME)
                } else {
                    console.error("this should never get to this state, im in "
                    + "file \'state-machine.js\' file in the else block of navigation")
                }
            }
        },
        'pick_service': {
            navigation: function (action) {
                if (action.type === 'previous_button') {
                    footerComponent.prevBtnClicked() //this doesnt do anything yet
                }
            }
        },
        'price_navigation': {
            navigation: function(action) {
                if (action.type === 'returnWhereYouCameFrom') {
                    pricesPage.closePage()
                    console.log('this is the previous state ', this.previousState);

                    switch (this.previousState) {
                        case state.HOME:
                            homePage.openPage()
                            this.changeState(state.HOME)
                            break;
                        case null:
                            console.log('this only happens if you get to the prices page without navigating to it. AKA impossible');
                            break;
                        default:
                            console.error("default in state-machine.js, inside price navigation")
                            break;
                    }

                } else {
                    console.log("the action.type is not \'returnWhereYouCameFrom\'," +
                    "but this page is only meant to visit and navigate back to where you came from");
                }
            }
        },
        'booking_policy': {
            navigation: function(action) {
                if (action.type === 'returnWhereYouCameFrom') {
                    bookingPolicy.closePage()

                    switch (this.previousState) {
                        case state.HOME:
                            homePage.openPage()
                            this.changeState(state.HOME)
                            break;
                        case null:
                            console.log('this only happens if you get to the prices page without navigating to it. AKA impossible');
                            break;
                        default:
                            console.error("default in state-machine.js, inside price navigation")
                            break;
                    }

                } else {
                    console.log("the action.type is not \'returnWhereYouCameFrom\'," +
                    "but this page is only meant to visit and navigate back to where you came from");
                }
            }
        },
        'about_me': {
            navigation: function(action) {
                if (action.type === 'returnWhereYouCameFrom') {
                        // close the about me page
                        aboutMePage.closePage()

                        switch (this.previousState) {
                            case state.HOME:
                                homePage.openPage()
                                this.changeState(state.HOME)
                                break;
                            case null:
                                console.log('this only happens if you get to the prices page without navigating to it. AKA impossible');
                                break;
                            default:
                                console.error("default in state-machine.js, inside price navigation")
                                break;
                        }

                } else {
                    console.log("the action.type is not \'returnWhereYouCameFrom\'," +
                    "but this page is only meant to visit and navigate back to where you came from");
                }
            }

        },
        'know_your_cutsomer': {

        },
        'booking_step': {

        },
        'finalize': {

        }
    },
    dispatch(actionName, ...payload) {
        const action = this.transitions[this.state][actionName];
        
        if (action) {
            action.apply(machine, ...payload);
        } else {
            console.log("action is not valid for current state");
        }
    },
    changeState(newState) {
        this.previousState = this.state;
        this.state = newState;
    }
};
