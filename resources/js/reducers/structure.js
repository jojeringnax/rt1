
const structure = (state = {
    company: {id: 113, name: 'ООО РесурсТранс'},
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
                company: {id: 113, name: 'ООО РесурсТранс'},
                organization: {id: null, name: 'Нет имени'},
                autocolumn: {id: null, name: 'Нет имени'},
                badSpot: {id: null, name: 'Нет имени'},
                spot: {id: null, name: 'Нет имени'},
                brigade: {id: null, name: 'Нет имени'},
                car: {id: null, name: 'Нет имени'}
            };
        case 'SET_STRUCTURE':
            let result = state;
            let arr = [];
            switch (action.division) {
                case 'organization':
                    result.organization = {
                        id:  action.id, name: action.name ? action.name : 'Нет имени'
                    };
                    arr = ['autocolumn', 'badSpot', 'spot', 'brigade', 'car'];
                    break;
                case 'autocolumn':
                    result.autocolumn = {
                        id:  action.id, name: action.name ? action.name : 'Нет имени'
                    };
                    arr = ['spot', 'badSpot', 'brigade', 'car'];
                    break;
                case 'badSpot':
                    result.badSpot = {
                        id:  action.id, name: action.name ? action.name : 'Нет имени'
                    };
                    arr = ['brigade', 'car'];
                    break;
                case 'spot':
                    result.spot = {
                        id:  action.id, name: action.name ? action.name : 'Нет имени'
                    };
                    arr = ['brigade', 'car'];
                    break;
                case 'brigade':
                    result.brigade = {
                        id:  action.id, name: action.name ? action.name : 'Нет имени'
                    };
                    arr = ['car'];
                    break;
                case 'car':
                    result.car = {
                        id:  action.id, name: action.name ? action.name : 'Нет имени'
                    };

            }
            arr.map(key => {
                result[key] = {id: null, name: 'Нет имени'}
            });
            return result;
        default:
            return state;
    }

};

export default structure;
