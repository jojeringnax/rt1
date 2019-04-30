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
                dispatch(setOrganizations(res.data));
                dispatch(setBounds(res.data.bounds.bounds));
            });
}


export const setPoints = points => ({
    type: 'SET_POINTS',
    points
});

export const setOrganizations = organizations => ({
    type: 'SET_ORGANIZATIONS',
    organizations
});

export const setAutocolumns = autocolumns => ({
    type: 'SET_AUTOCOLUMNS',
    autocolumns
});

export const setBadSpots = badSpots => ({
    type: 'SET_BAD_SPOTS',
    badSpots
});

export const setSpots = spots => ({
    type: 'SET_SPOTS',
    spots
});

export const setBrigades = brigades => ({
    type: 'SET_BRIGADES',
    brigades
});

export const setCars = cars => ({
    type: 'SET_CARS',
    cars
});

export const setBounds = bounds => ({
    type: 'SET_BOUNDS',
    bounds
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