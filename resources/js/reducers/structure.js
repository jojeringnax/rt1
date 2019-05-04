
const structure = (state = {
    company: 113,
    organization: null,
    autocolumn: null,
    badSpot: null,
    spot: null,
    brigade: null,
    car: null
}, action) => {

    switch(action.type) {
        case 'RESET_APP':
            return state = {
                company: 113,
                organization: null,
                autocolumn: null,
                badSpot: null,
                spot: null,
                brigade: null,
                car: null
            };
        case 'SET_STRUCTURE':
            let result = {};
            for(let key in state) {
                if (action.division === key) {
                    result[key] = action.id;
                } else {
                    result[key] = state[key];
                }
            }
            return result;
        default:
            return state;
    }

};

export default structure;