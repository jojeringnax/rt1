import React from 'react';
import axios from 'axios';
import {Placemark} from "react-yandex-maps";
import {store} from "../../../index";
import {setSpots, setAutocolumns, setBadSpots, setBounds} from "../../../actions";

class Autocolumn extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            children: [],
            bounds: [],
            template: props.template,
        };

        this.createTemplateLayoutFactory = (ymaps) => {
            if (ymaps && !this.state.template) {
                this.setState({
                    template: ymaps.templateLayoutFactory.createClass(
                        '<div class="bb"><span class="bb-num">'
                        + this.props.carsNumber
                        + '</span> <span id="auto_name" class="bb-name">'
                        + this.props.name
                        +'</span></div>'
                    ),
                });
            }
        };
    }



    handleClick = (e) => {
        store.dispatch(setAutocolumns({divisions: []}));
        store.dispatch(setBadSpots({divisions: []}));
        store.dispatch(setSpots({divisions: this.state.children}));
        store.dispatch(setBounds(this.state.bounds))
    };


    componentDidMount() {
        let url = '/api/autocolumn/' + this.props.id + '/children';
        axios.get(url)
            .then(res => {
                this.setState({
                    children: res.data.divisions,
                    bounds: res.data.bounds.bounds
                })
            })
    }

    render () {
        return (
            <Placemark
                onLoad={this.createTemplateLayoutFactory}
                geometry={[this.props.x_pos, this.props.y_pos]}
                properties={{
                    iconCaption : 'asd'
                }}
                modules={[
                    "geoObject.addon.hint"
                ]}

                options={{
                    iconLayout: 'default#imageWithContent',
                    iconImageHref: '',
                    iconImageSize: [62, 67.5],
                    iconContentOffset: [-74, 83],
                    iconImageOffset: [-24, -24],
                    preset: 'islands#greenDotIconWithCaption',
                    iconContentLayout: this.state.template
                }}
                onClick={this.handleClick}
            />
        )
    }
}


export default Autocolumn;