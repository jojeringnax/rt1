import React from 'react';
import ReactDOM from 'react-dom';
import { YMaps, Map, Clusterer, Placemark } from 'react-yandex-maps';
import '../css/MapApp.css';
import SideBar from "../SideBar/SideBar";
import axios from "axios";

export default class MapApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            map: false,
            organizationsPoints: []
        }
    }

    getOrganizations = () => {
        axios.get('/api/organizations')
            .then(res => {
                console.log(res.data);
                this.setState({organizationsPoints: res.data});
            })
            .catch(err => {

            })
    };

    componentDidMount() {
        this.getOrganizations();
    }

    render() {
        const carTypes = {
            light: 0,
            truck: 1,
            bus: 2,
            spec: 3
        };
        const widthMap = "100%";
        const heightMap = "100vh";
        const mapState = {
            center: [55.751574, 37.573856],
            zoom: 5,
            behaviors: ['default', 'scrollZoom'],
            controls: []
        };
        return(
            <div className="app">
                <SideBar />
                <YMaps>
                    <div className="app-map">
                        <Map width={widthMap} height={heightMap} defaultState={mapState}>
                                {
                                    this.state.organizationsPoints.map(point => {
                                        return <Placemark
                                            key={point.description}
                                            geometry={[point.x_pos, point.y_pos]}
                                            properties= {{
                                                hintContent: point.description,
                                                balloonContentLayout: 'Это балун'
                                            }}
                                            modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                                        />
                                    })
                                }
                        </Map>
                    </div>
                </YMaps>
            </div>
        )
    }
}


if (document.getElementById('root')) {
    ReactDOM.render(<MapApp />, document.getElementById('root'));
}
