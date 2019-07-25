import React from "react"
import { compose, withProps, lifecycle } from "recompose"
import {withScriptjs, withGoogleMap, GoogleMap, Marker, Circle} from "react-google-maps"
import SideBar from "../SideBar/SideBar";
import {store} from "../../index";


export const MapComponent = compose(withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAUQZgcnYy14S85AN26rfzzvG--hwL2w8w&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px`, width: "80%" }} />,
        mapElement: <div style={{ height: `100%` }} />,
        lang: "ru"
    }),
    withScriptjs,
    withGoogleMap,
    lifecycle({
        componentWillMount() {
            const refs = {};

            this.setState({
                bounds: null,
                markers: [],
                onMapMounted: ref => {
                    const bounds = store.getState().organizations.bounds;
                    console.log(bounds);
                    ref.fitBounds({
                        east: bounds.bounds[1][0],
                        west: bounds.bounds[1][1],
                        north: bounds.bounds[0][0],
                        south: bounds.bounds[0][1]
                    })
                },
                onTilesLoaded: () => {


                }
            })
        },

    }),
)((props) =>
    <GoogleMap
        ref={props.onMapMounted}
        defaultZoom={4}
        defaultCenter={{ lat: 0, lng: 0 }}
    >
    </GoogleMap>
);

export default class Map extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            template: null,
            clickedCar: false
        };
    }

    render() {
        return (
            <div className="app">
                <SideBar level={this.props.level} showAnimation={this.props.animationSideBar} />
                <MapComponent lat={0} lng={0}/>
            </div>
        )
    }
}

