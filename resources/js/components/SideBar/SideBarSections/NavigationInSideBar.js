import React from 'react';
import {store} from "../../../index";

class NavigationInSideBar extends React.Component{

    constructor(props) {
        super(props);

        let res = {};
        const str = store.getState().structure;

        for(const level in str) {
            if (str.hasOwnProperty(level)) {
                if (str[level].id !== null) {
                    res[level] = {
                        id: str[level].id,
                        name: str[level].name
                    };
                }
            }
        }


        this.state = {
            structure: res
            }
        };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.level !== this.props.level) {
            const structure = this.state.structure;
            const fullStructure = store.getState().structure;
            for(const key in fullStructure) {
                if (fullStructure[key].id === null) {
                    if (structure.hasOwnProperty(key)){
                        delete structure[key];
                    }
                    continue;
                }
                structure[key] = {
                    id: fullStructure[key].id,
                    name: fullStructure[key].name
                };
            }

            this.setState({
                structure: structure
            });
        }
    }



    render() {
        return(
            <div className="nav-sidebar" style={{display: 'flex', flexDirection: 'column'}} id="firm">
                {
                    Object.keys(this.state.structure).map(level =>  {
                        const id = this.state.structure[level].id;
                        const name = this.state.structure[level].name;
                        return (
                            <div
                                className={'nav-' + level}
                                onClick={window.onclick[level][id]}
                                key={id}
                            >{name}</div>
                        )
                    })
                }
            </div>
        )
    }
}

export default NavigationInSideBar;