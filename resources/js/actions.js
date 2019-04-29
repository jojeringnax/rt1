import axios from "axios";

export const setLevel = level => ({
    type: 'SET_LEVEL',
    level
});

export const clickPoint = (id, pointType) => (
    {
        type: 'CLICK_POINT',
        id,
        pointType
    }
);

export function someFunction(dispatch) {
        axios.get('/api/organizations')
            .then((res) => {
                dispatch(setPoints(res.data));
            });
}


export const setPoints = points => ({
    type: 'SET_POINTS',
    points
});

export const Levels = {
    company: 'company',
    organization: 'organization',
    autocolumn: 'autocolumn',
    badSpot: 'badSpot',
    spot: 'spot',
    brigade: 'brigade',
    car: 'car'
};