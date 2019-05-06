import React from 'react';
import { YMaps, Map } from 'react-yandex-maps';
import {setBounds} from "../../actions";
import SideBar from "../SideBar/SideBar";
import {store} from "../../index";
import Organization from "./divisions/Organization";
import ClustererAutocolumns from './clusterers/ClustererAutocolumns';
import ClustererBadSpots from "./clusterers/ClustererBadSpots";
import ClustererSpots from "./clusterers/ClustererSpots";
import ClustererBrigades from "./clusterers/ClustererBrigades";
import ClustererCars from './clusterers/ClustererCars';
import BackButton from "../BackButton";

class MapApp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            template: null,
            clickedCar: false
        };
    }

    handleBoundsChange = (event) => {
        store.dispatch(setBounds(event.get('newBounds')));
    };

    render() {
        return(
            <div className="app">
                <SideBar level={this.props.level} showAnimation={this.props.animationSideBar} />
                <YMaps
                    query={{
                        apikey: '27544797-3131-4759-9f4b-54f17c827eb2&lang=ru_RU',
                    }}
                    version={"2.1"}
                    >
                    <div className="app-map">
                        <div className={(this.props.animationMap ? '' : 'hide')+ " overlay_block"}></div>
                        <div className={(this.props.animationMap ? 'loading_process' : '')}>
                            <BackButton />
                            <Map
                                onBoundsChange={this.handleBoundsChange}
                                width={"100%"}
                                height={"100vh"}
                                defaultState={{
                                    center: [55.751574, 37.573856],
                                    zoom: 5,
                                    behaviors: ['default', 'scrollZoom'],
                                    controls: []
                                }}
                                state={{bounds: this.props.bounds}}
                                modules={["templateLayoutFactory", "layout.ImageWithContent"]}
                            >
                                {
                                    this.props.organizations.divisions.map(organization => {
                                        return (
                                            <Organization
                                                key={organization.organization.id}
                                                id={organization.organization.id}
                                                company_id={'113'}
                                                description={organization.organization.description}
                                                address={organization.organization.addess}
                                                x_pos={organization.organization.x_pos}
                                                y_pos={organization.organization.y_pos}
                                                carsNumber={organization.carsNumber}
                                            />
                                        )
                                    })
                                }
                                <ClustererAutocolumns />
                                <ClustererBadSpots />
                                <ClustererSpots />
                                <ClustererBrigades/>
                                <ClustererCars />

                            </Map>
                        </div>
                    </div>
                </YMaps>
            </div>
        )
    }
}

export default MapApp;


