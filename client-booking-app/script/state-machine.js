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
                    this.changeState(state.NAV_PRICE, true)
                } else if (action.type === state.BOOKING_POLICY) {
                    bookingPolicy.openPage()
                    this.changeState(state.BOOKING_POLICY, true)
                } else if (action.type === state.ABOUT_ME) {
                    aboutMePage.openPage()
                    this.changeState(state.ABOUT_ME, true)
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

                } else if (action.type === 'nav-to-nav') {
                    pricesPage.closePage()

                    switch(this.state) {
                        case state.NAV_PRICE:
                            bookingPolicy.openPage()
                            this.changeState(state.BOOKING_POLICY)
                            break;
                    }
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
                }
            }
        },
        'about_me': {
            navigation: function(action) {
                if (action.type === 'returnWhereYouCameFrom') {
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
        /*only save previous state when you are navigating from 
        a non-nav page to a nav page. dont save when 
        going from nav to nav, non-nav to non-nav
        or from nav to non-nav, only
        from non-nav to nav*/
    changeState(newState, savePrevState = false) {
        if (savePrevState) {this.previousState = this.state; }
        this.state = newState;
    }
};
