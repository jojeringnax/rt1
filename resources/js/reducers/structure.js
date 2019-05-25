
const structure = (state = {
    company: {id: 113, name: 'ООО Ресурс Транс'},
    organization: {id: null, name: 'Нет имени'},
    autocolumn: {id: null, name: 'Нет имени'},
    badSpot: {id: null, name: 'Нет имени'},
    spot: {id: null, name: 'Нет имени'},
    brigade: {id: null, name: 'Нет имени'},
    car: {id: null, name: 'Нет имени'}
}, action) => {

    switch(action.type) {
        case 'RESET_APP':
            return state = {
                company: {id: 113, name: 'ООО Ресурс Транс'},
                organization: {id: null, name: 'Нет имени'},
                autocolumn: {id: null, name: 'Нет имени'},
                badSpot: {id: null, name: 'Нет имени'},
                spot: {id: null, name: 'Нет имени'},
                brigade: {id: null, name: 'Нет имени'},
                car: {id: null, name: 'Нет имени'}
            };
        case 'SET_STRUCTURE':
            let result = {};
            for(let key in state) {
                result[key] = {
                    id: state.id,
                    name: state.name
                };
                if (action.division === key) {
                    result[key]['id'] = action.id;
                    result[key]['name'] = action.name ? action.name : 'Нет имени'
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