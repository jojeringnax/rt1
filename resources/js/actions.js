export const setMapLevel = level => ({
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