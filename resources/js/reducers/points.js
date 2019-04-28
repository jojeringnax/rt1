import axios from "axios";



const points = (state = [{
    point: {
        id:12,
        x_pos:11.22,
        y_pos: 50.2,
        description: 'faf'
    },
    type: 'organization'
}], action) => {
    switch (action.type) {
        case 'CLICK_POINT':
            return 1;
        default:
            return state
    }
};

export default points