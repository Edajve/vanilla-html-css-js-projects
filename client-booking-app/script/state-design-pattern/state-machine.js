import { state, stepsOrder } from "./state.js"
import homePage from "../page-operations/home-page.js"
import setStylesPage from "../page-operations/set-style-page.js";
import footerComponent from "../page-operations/footer-component.js";
import progressBar from "../page-operations/progress-bar.js";
import pricesPage from "../page-operations/prices-page.js";
import bookingPolicy from "../page-operations/booking-policy.js";
import aboutMePage from "../page-operations/about-me-page.js";
import setStylePage from "../page-operations/set-style-page.js";
import setBookingPage from "../page-operations/set-booking-page.js";

export const machine = {
    state: state.HOME,
    previousState: null,
    transitions: {
        'home': {
            navigation: function (action) {
                homePage.closePage()

                if (action.type === state.PICK_SERVICE) {
                    progressBar.increaseBarIcon()
                    setStylesPage.openPage()
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
                }
            },
            navToNav: function(action) {
                console.log(action.type);
                if (action.type === state.BOOKING_POLICY) {
                    bookingPolicy.closePage()
                }
            }
        },
        'pick_service': {
            navigation: function (action) {
                setStylesPage.closePage()

                if (action.type === state.PICK_SERVICE) {
                    pricesPage.navigate()
                    this.changeState(state.NAV_PRICE, true)
                } else if (action.type === state.BOOKING_POLICY) {
                    bookingPolicy.openPage();
                    this.changeState(state.BOOKING_POLICY, true)
                } else if (action.type === state.ABOUT_ME) {
                    aboutMePage.openPage()
                    this.changeState(state.ABOUT_ME, true)
                }
            },
            footer: function (action) {
                if (action.type === 'previous_button_in_footer') {
                    footerComponent.previousClicked()
                    progressBar.decreaseBarIcon()
                    const currentIndex = footerComponent.getCurrentPageIndex();
                    const state = stepsOrder[currentIndex]
                    this.changeState(state);
                } else if (action.type === 'next_button_in_footer') {
                    footerComponent.nextClicked()
                    progressBar.increaseBarIcon()
                    setBookingPage.displayCalendar()
                    this.changeState(state.BOOKING)
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
                        case state.PICK_SERVICE:
                            setStylesPage.openPage()
                            this.changeState(state.PICK_SERVICE)
                            break;
                        case state.BOOKING:
                            setBookingPage.openPage()
                            this.changeState(state.BOOKING)
                            break;
                        case null:
                            console.error('this only happens if you get to the prices page without navigating to it. AKA impossible');
                            break;
                        default:
                            console.error("default in state-machine.js, inside price navigation")
                            break;
                    }
                }
            },
            navToNav: function (action) {
                if (action.type === 'nav-to-nav') {
                    pricesPage.closePage()
                    switch(this.state) {
                        case state.NAV_PRICE:
                            aboutMePage.openPage()
                            this.changeState(state.ABOUT_ME)
                            break;
                    }
                } else if (action.type === state.BOOKING_POLICY){
                    pricesPage.closePage()
                    bookingPolicy.openPage()
                    this.changeState(state.BOOKING_POLICY)
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
                        case state.PICK_SERVICE:
                            setStylesPage.openPage()
                            this.changeState(state.PICK_SERVICE)
                            break;
                        case state.BOOKING:
                            setBookingPage.openPage()
                            this.changeState(state.BOOKING)
                            break;
                        case null:
                            console.error('this only happens if you get to the prices page without navigating to it. AKA impossible');
                            break;
                        default:
                            console.error("default in state-machine.js, inside price navigation")
                            break;
                    }
                }
            },
            navToNav: function (action) {
                if (action.type === state.NAV_PRICE) {
                    bookingPolicy.closePage()
                    switch(this.state) {
                        case state.BOOKING_POLICY:
                            pricesPage.navigate()
                            this.changeState(state.NAV_PRICE)
                            break;
                    }
                } else if (action.type === state.BOOKING_POLICY) {
                    bookingPolicy.closePage()
                    aboutMePage.openPage()
                    this.changeState(state.ABOUT_ME)
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
                            case state.PICK_SERVICE:
                                setStylePage.openPage()
                                this.changeState(state.PICK_SERVICE)
                                break;
                            case state.BOOKING:
                                setBookingPage.openPage()
                                this.changeState(state.BOOKING)
                                break;
                            case null:
                                console.error('this only happens if you get to the prices page without navigating to it. AKA impossible');
                                break;
                            default:
                                console.error("default in state-machine.js, inside price navigation")
                                break;
                        }
                }
            },
            navToNav: function (action) {
                if (action.type === state.BOOKING_POLICY) {
                    aboutMePage.closePage()
                    switch(this.state) {
                        case state.ABOUT_ME:
                            bookingPolicy.openPage()
                            this.changeState(state.BOOKING_POLICY)
                        }  this.changeState(state.BOOKING_POLICY)
                } else if (action.type === state.NAV_PRICE) {
                    aboutMePage.closePage()
                    pricesPage.navigate()
                    this.changeState(state.NAV_PRICE)
                }
            }
        },
        'know_your_cutsomer': {

        },
        'booking_step': {
            navigation: function(action) {
                setBookingPage.closePage()
                if (action.type === state.BOOKING) {
                    pricesPage.navigate()
                    this.changeState(state.NAV_PRICE, true)
                } else if (action.type === state.BOOKING_POLICY) {
                    bookingPolicy.openPage()
                    this.changeState(state.BOOKING_POLICY, true)
                } else if (action.type === state.ABOUT_ME) {
                    aboutMePage.openPage()
                    this.changeState(state.ABOUT_ME, true)
                }
            },
            bookingSteps: function(action) {
                console.log('here')
            },
            footer: function(action) {
                if (action.type === 'previous_button_in_footer') {
                    footerComponent.previousClicked()
                    progressBar.decreaseBarIcon()
                    const currentIndex = footerComponent.getCurrentPageIndex()
                    const state = stepsOrder[currentIndex]
                    this.changeState(state)
                }
            }
        },
        'finalize': {

        }
    },
    dispatch(actionName, ...payload) {
        const action = this.transitions[this.state][actionName];
        
        if (action) {
            action.apply(machine, ...payload);
        } else {
            console.error("action is not valid for current state");
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

export default {
    machine
}