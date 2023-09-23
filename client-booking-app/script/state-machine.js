import { stateEnum } from "./state-enum.js"

export const machine = {
    state: stateEnum.HOME,
    transitions: {
        'home': {
            pick_service: function(payload) {
                if (payload.action === 'pick_service') {
                    console.log("this is true");
                    this.changeState(stateEnum.PICK_SERVICE);
                    console.log("State is now", this.state);
                }
            },
            navigation: function(payload) {
                if (payload.action === 'price')
                this.changeState(stateEnum.NAV_PRICE)
                //navigate to price page in nav
            }
        },
        NAV_PRICE: {

        },
        BOOKING_POLICY: {

        },
        ABOUT_ME: {

        },
        PICK_SERVICE: {

        },
        KYC: {

        },
        BOOKING: {

        },
        FINALIZE: {

        }
    },
    dispatch(actionName, ...payload) {
        const actions = this.transitions[this.state];
        
        if (actions) {
            const action = actions[actionName];
            if (typeof action === 'function') {
                action.apply(machine, ...payload);
                console.log(`Action '${actionName}' dispatched.`);
            } else {
                console.error(`Invalid action '${actionName}' for state '${this.state}'.`);
            }
        } else {
            console.error(`No valid actions defined for state '${this.state}'.`);
        }
    },
    changeState(newState) {
        this.state = newState;
    }
};