import axios from "axios";

export const setLevel = (level, id=null) => ({
    type: 'SET_LEVEL',
    level,
    id
});


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

export const setStatisticDepartment = statistic => ({
    type: 'SET_STATISTIC_DEPARTMENT',
    statistic
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



export function setOrganizationsPreload(dispatch) {
    axios.get('/api/organizations')
        .then((res) => {
            dispatch(setOrganizations(res.data));
            dispatch(setBounds(res.data.bounds.bounds));
        });
}