import { stateEnum } from "./state-enum.js"
import homePage from "./page-operations/home-page.js"
import setBookingPage from "./page-operations/set-booking-page.js";
import progressBar from "./page-operations/progress-bar.js";

export const machine = {
    state: stateEnum.HOME,
    transitions: {
        'home': {
            pick_service: function (action) {
                if (action.type === 'pick_service') {
                    homePage.closeHomePage()
                    setBookingPage.openSetBookingPage()
                    progressBar.increaseBarIcon()
                    this.changeState("pick_service")
                } else {
                    console.log('this is the else statement')
                }
            }
        },
        'price_navigation': {

        },
        'setBooking': {

        },
        'about_me': {

        },
        'pick_service': {

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

// export const machine =  {
//     state: "SOBER",
//     transitions: {
//         SOBER: {
//             drink: function (beverage) {
//                 console.log('current state', this.state);
//                 console.log('\tdrinking ', beverage.type);
//                 if (beverage.type === 'alcohol') {
//                     console.log('\tAdios inhibitions!')
//                     this.changeState("DRUNK")
//                 } else {
//                     console.log('\tThat quenched my thirst!')
//                 }
//             }
//         },
//         DRUNK: {
//             drink: function (beverage) {
//                 console.log('current state', this.state);
//                 console.log('\tdrinking ', beverage.type);
//                 if (beverage.type === 'alcohol') {
//                     console.log('\tAdios pants!')
//                     this.changeState("REALLYDRUNK")
//                 } else {
//                     console.log("\tI said what?")
//                     this.changeState("SOBER")
//                 }
//             }
//         },
//         REALLYDRUNK: {
//             drink: function (beverage) {
//                 console.log('current state', this.state);
//                 console.log('\tdrinking ', beverage.type);
//                 if (beverage.type === 'alcohol') {
//                     let dice = Math.floor(Math.random() * 2);  // 0 or 1
//                     if (dice) {
//                         this.dispatch("throwup", {});
//                     } else {
//                         this.dispatch("passout", {});
//                     }
//                 } else {
//                     this.changeState("DRUNK")
//                 }
//             },
//             passout: function() {
//                 console.log('\tPassing out. zzzzzzzzzzz')
//                 this.changeState('ASLEEP')
//             },
//             throwup: function() {
//                 console.log('\tBlaaaaaaaaaaaa....When did I eat that?');
//                 this.dispatch('passout', {});
//             }
//         },
//         ASLEEP: {
//             wake: function() {
//                 console.log('current state', this.state);
//                 console.log('\tWaking up');
//                 this.changeState("HUNGOVER")
//             }
//         },
//         HUNGOVER: {
//             openEyes: function() {
//                 console.log("current state", this.state);
//                 console.log("\tTurn off the sun please");
//             },
//             drink: function(beverage) {
//                 console.log('current state', this.state);
//                 console.log('\tdrinking ', beverage.type);
//                 if (beverage.type === 'alcohol') {
//                     console.log('\tIs it never again yet?');
//                     this.changeState('DRUNK')
//                 } else {
//                     console.log('\tNever again');
//                     this.changeState('SOBER')
//                 }
//             }
//         }
//     },
//     dispatch(actionName, ...payload) {
//         const actions = this.transitions[this.state];
//         const action = this.transitions[this.state][actionName];

//         if (action) {
//             action.apply(machine, ...payload);
//         } else {
//             //action is not valit for current state
//         }
//     },
//     changeState(newState) {
//         this.state = newState;
//     }
// };