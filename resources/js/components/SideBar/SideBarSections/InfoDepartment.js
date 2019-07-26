import React from 'react';

import 'react-circular-progressbar/dist/styles.css';
import CircularProgressbar from 'react-circular-progressbar';
import {store} from "../../../index";
import {setCars} from "../../../actions";

export const images = {
    active:{
        0: '/img/auto_icon/point_0.svg',
        1: '/img/auto_icon/point_1.svg',
        2: '/img/auto_icon/point_2.svg',
        3: '/img/auto_icon/point_3.svg'
    },
    notActive: {
        0: '/img/auto_icon/point_blue_0.svg',
        1: '/img/auto_icon/point_blue_1.svg',
        2: '/img/auto_icon/point_blue_2.svg',
        3: '/img/auto_icon/point_blue_3.svg'
    }
};

class InfoDepartment extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            show: this.props.show,
            cars: [],
            withoutTerminal: false,
        };

    }

    findChild = (obj, selector) => {
        for (let i = 0; i < obj.children.length; i++) {
            if(obj.children[i].children.length !== 0) {
                if(obj.children[i].querySelector(selector)) {
                    return obj.children[i].querySelector(selector);
                }else {
                    this.findChild(obj.children[i], selector);
                }
            }
        }
    };

    handleClickTypeTs = (e) => {
        const isActive = e.currentTarget.classList.contains('activeTransport');
        if(isActive){
            return false;
        }

        if (store.getState().level.level !== 'spot' && store.getState().level.level !== 'badSpot' && store.getState().level.level !== 'brigade') {
            return false;
        }

        const numberImgTransportDepartment = document.querySelectorAll('.img-transport');
        numberImgTransportDepartment.forEach(function(elementImg){
            elementImg.setAttribute('src', images.notActive[parseInt(elementImg.getAttribute('data-imgtypecar'))]);
        });

        const numberTransportDepartment = document.querySelectorAll('.transport-department');
        numberTransportDepartment.forEach(function(elem){
            elem.classList.remove('activeTransport');
        });

        e.currentTarget.classList.add('activeTransport');
        let resCars = [];

        if(parseInt(e.currentTarget.getAttribute('data-typecar')) === 4 ) {
            return store.dispatch(setCars(this.state.cars));
        }


        let img = this.findChild(e.currentTarget, '.img-transport');
        img.setAttribute("src", images.active[parseInt(img.getAttribute('data-imgtypecar'))]);

        this.state.cars.map(car => {
            if(car.type === parseInt(e.currentTarget.getAttribute('data-typecar'))){
                resCars.push(car);
            }
        });

        store.dispatch(setCars(resCars));

    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.show !== this.props.show) {
            this.setState({
                show: this.props.show
            });
        }

        if(prevProps.statistic !== this.props.statistic) {
            this.setState({
                cars: store.getState().cars
            })
        }
    }


    render() {
        return(
            <div id="info-department" className={"info-department item-sideBar" + (this.state.show ? '' : ' hide')}>
                <div className="">
                    <div className="">
                        <div className="ts-title">
                            <span className="img"><img src="/img/delivery-truck.svg" alt="deliveryTruck" className="span-yan/img-h3"/></span>
                            <span id="tranport-means" className="ts-text h3-main">Транспортные средства</span>

                        </div>
                        <div id="" className="item-info">
                            <span id="" className="trans-auto">Всего, шт.</span>
                            <span id="totTs" className="figures">{this.props.statistic.carsTotal}</span>
                        </div>
                        <div className="item-info">
                            <span className="trans-auto">Готовы, шт.</span>
                            <span id="OnReady" className="figures">{this.props.statistic.carsReady}</span>
                        </div>
                        <div className="item-info">
                            <span id="on-repair" className="trans-auto">На ремонте, шт.</span>
                            <span id="OnRep" className="figures">{this.props.statistic.carsRepair}</span>
                        </div>
                        <div className="item-info">
                            <span id="on-to" className="trans-auto">На ТО, шт.</span>
                            <span id="onTo" className="figures">{this.props.statistic.carsTO}</span>
                        </div>
                        <div className="item-info">
                            <span id="on-line-department" className="trans-auto">На линии, шт.</span>
                            <span id="OnLine" className="figures">{this.props.statistic.carsInline}</span>
                        </div>
                        <div className="item-info">
                            <span id="without-terminal" onClick={()=>{this.setState({withoutTerminal: !this.state.withoutTerminal})}} className={!this.state.withoutTerminal ? "trans-auto" : "trans-auto hide"} style={{cursor:"pointer"}}>
                                ...
                            </span>
                        </div>
                        {/*<div className={this.state.withoutTerminal ? "item-info" : "item-info hide"} onClick={()=>{this.setState({withoutTerminal: !this.state.withoutTerminal})}} style={{cursor:'pointer'}}>*/}
                        {/*    <span id="" className="trans-auto"><img src="/img/arrow_top.svg" alt="" style={{*/}
                        {/*        margin:"0 10px 0 0",*/}
                        {/*        height:'0.9vh',*/}
                        {/*        width: '0.9vh'*/}
                        {/*    }}/>Без терминала</span>*/}
                        {/*    <span id="OnLine" className="figures">{parseInt(this.props.statistic.carsTotal) - parseInt(this.props.statistic.carsTerminal)}</span>*/}
                        {/*</div>*/}
                        <div className={this.state.withoutTerminal ? "item-info d-flex flex-column" : "item-info hide d-flex flex-column"} onClick={()=>{this.setState({withoutTerminal: !this.state.withoutTerminal})}} style={{cursor:'pointer'}}>
                            <div className="d-flex justify-content-between" style={{width: "100%"}}>
                              <span id="" className="trans-auto">
                                    <img src='/img/arrow_top.svg' alt="" style={{
                                        margin:"0 10px 0 0",
                                        height:'0.9vh',
                                        width: '0.9vh'
                                    }}/>
                                    Без терминала
                            </span>
                                <span id="OnLine" className="figures">{parseInt(this.props.statistic.carsTotal) - parseInt(this.props.statistic.carsTerminal)}</span>
                            </div>
                            <div className="d-flex justify-content-between" style={{width: "100%"}}>
                            <span id="" className="trans-auto" style={{marginLeft: '0.9vh', paddingLeft: '10px'}}>
                                На карте</span>
                                <span id="OnLine" className="figures">{parseInt(this.props.statistic.carsOnMap)}</span>
                            </div>
                        </div>
                    </div>



                    <div className="div-transport">
                        <hr className="hr-trans" />
                        <div data-typecar="4" id="all" className="item-info transport-department activeTransport" onClick={this.handleClickTypeTs}>
                            <div className="transport-title">
                                <span id="passenger-car" className="p-type-transport">Все транспортные средства</span>
                            </div>
                        </div>
                        <hr className="hr-trans" />
                        <div data-typecar="0" id="light" className="item-info transport-department" onClick={this.handleClickTypeTs}>
                            <div className="transport-title">
                                <span className="span-h3-filial"><img data-imgtypecar="0" src='/img/auto_icon/point_blue_0.svg' alt="point_0" className="img-transport"/></span>
                                <span id="passenger-car" className="p-type-transport">Легковые</span>
                            </div>
                            <span id="passCar" className="p-quantity">{this.props.statistic.carsLight}</span>
                        </div>
                        <hr className="hr-trans" />
                        <div data-typecar="1" id="truck" className="item-info transport-department" onClick={this.handleClickTypeTs}>
                            <div className="transport-title">
                                <span className="span-h3-filial"><img data-imgtypecar="1"  src='/img/auto_icon/point_blue_1.svg' alt="point_1" className="img-transport"/></span>
                                <span id="freight" className="p-type-transport">Грузовые</span>
                            </div>
                            <span id="freightCar" className="p-quantity">{this.props.statistic.carsTruck}</span>
                        </div>
                        <hr className="hr-trans" />
                        <div data-typecar="2" id="bus" className="item-info transport-department" onClick={this.handleClickTypeTs}>
                            <div className="transport-title">
                                <span className="span-h3-filial"><img data-imgtypecar="2"  src='/img/auto_icon/point_blue_2.svg' alt="point_2" className="img-transport"/></span>
                                <span className="p-type-transport">Автобусы</span>
                            </div>
                            <span id="busCar" className="p-quantity">{this.props.statistic.carsBus}</span>
                        </div>
                        <hr className="hr-trans" />
                        <div data-typecar="3" id="spec" className="item-info transport-department" onClick={this.handleClickTypeTs}>
                            <div className="transport-title">
                                <span className="span-h3-filial"><img data-imgtypecar="3"  src='/img/auto_icon/point_blue_3.svg' alt="point_3" className="img-transport"/></span>
                                <span id="spec" className="p-type-transport">Спецтехника</span>
                            </div>
                            <span id="specCar" className="p-quantity">{this.props.statistic.carsSpec}</span>
                        </div>
                        <hr className="hr-trans" />
                    </div>
                </div>

                <div className="">
                    <div id="request-department" className="">
                        <div className="request-title">
                            <span className="img"><img src='/img/copy.svg' alt="copy" className="span-yan/img-h3-2nd"/></span>
                            <span id="title-request" className="text">Заявки</span>
                        </div>
                        <div className="item-info">
                            <span className="trans-auto">Выполнено, шт.</span>
                            <span id="applications_executed" className="figures">{this.props.statistic.applications_executed}</span>
                        </div>
                        <div className="item-info">
                            <span className="trans-auto">Отменено, шт.</span>
                            <span id="applications_canceled" className="figures">{this.props.statistic.applications_canceled}</span>
                        </div>
                        <div className="item-info">
                            <span id="" className="trans-auto">Переданы на СП, шт.</span>
                            <span id="applications_sub" className="figures">{this.props.statistic.applications_sub}</span>
                        </div>
                    </div>
                </div>
                <div id="indicators-department" className="indicators-class">
                    <div className="indicators-title">
                        <span className="img"><img src='/img/pie.svg' alt="pie" className="span-yan/img-h3-3nd"/></span>
                        <span id="h3-indicator" className="text">Показатели компании</span>
                    </div>
                    <div className="item-bar">
                        <div className="ilia" >
                            <span id="applications_ac_per" className="p-bar">
                                {
                                    Math.round(((this.props.statistic.applications_ac/this.props.statistic.applications_total).toFixed(2))*100)
                                }%
                            </span>
                            <CircularProgressbar
                                percentage={(this.props.statistic.applications_ac/this.props.statistic.applications_total).toFixed(2)*100}
                                text={""}
                                styles={{
                                    path: {
                                        stroke: "#27AE60",
                                        strokeLinecap: 'butt',
                                        transition: 'stroke-dashoffset 3s ease 1s',
                                    }
                                }}
                            />
                        </div>
                        <div className="div-bar-text">
                            <span id="filed" className="p-bar-text">Поданы через АС<br/>"Авто-Контроль", %</span>
                        </div>
                    </div>
                    <div className="item-bar">
                        <div className="ilia" >

                            <span id="waybills_total_per" className="p-bar">
                                {
                                    (this.props.statistic.waybills_processed  === 0 && this.props.statistic.waybills_total === 0) ? 0 :
                                    (this.props.statistic.waybills_processed/this.props.statistic.waybills_total).toFixed(2)*100
                                }%
                            </span>
                            <CircularProgressbar
                                percentage={ (this.props.statistic.waybills_processed  === 0 && this.props.statistic.waybills_total === 0) ? 0 :
                                    (this.props.statistic.waybills_processed/this.props.statistic.waybills_total).toFixed(2)*100}
                                text={""}
                                styles={{
                                    path: {
                                        stroke: "#27AE60",
                                        strokeLinecap: 'butt',
                                        transition: 'stroke-dashoffset 3s ease 1s',
                                    }
                                }}
                            />
                        </div>
                        <div className="div-bar-text">
                            <span id="processed" className="p-bar-text-str">Обработано ПЛ, %</span>
                        </div>
                    </div>
                    <div className="item-bar">
                        <div className="ilia">
                            <span id="accidents_total_per" className="p-bar">
                                {
                                (this.props.statistic.accidents_guilty  === 0 && this.props.statistic.accidents_total === 0) ? 0 :
                                    (this.props.statistic.accidents_guilty/this.props.statistic.accidents_total).toFixed(2)*100
                                }%
                            </span>
                            <CircularProgressbar
                                percentage={(this.props.statistic.accidents_guilty  === 0 && this.props.statistic.accidents_total === 0) ? 0 :
                                    (this.props.statistic.accidents_guilty/this.props.statistic.accidents_total).toFixed(2)*100}
                                text={""}
                                styles={{
                                    path: {
                                        stroke: "#27AE60",
                                        strokeLinecap: 'butt',
                                        transition: 'stroke-dashoffset 3s ease 1s',
                                    }
                                }}
                            />
                            {/*<div id="accidents_total" className="circle"></div>*/}
                        </div>
                        <div className="div-bar-text">
                            <span id="dtp" className="p-bar-text">ДТП по вине<br/>компании, %</span>
                        </div>
                    </div>
                    <div className="item-bar">
                        <div className="ilia" >
                            <p id="WB_M_per" className="p-bar">
                                {
                                    (this.props.statistic.WB_M  === 0 && this.props.statistic.WB_M === 0) ? 0 :
                                    (this.props.statistic.WB_M/this.props.statistic.WB_M).toFixed(2)*100
                                }%
                            </p>
                            <CircularProgressbar
                                percentage={
                                    (this.props.statistic.WB_M  === 0 && this.props.statistic.WB_M === 0) ? 0 :
                                        (this.props.statistic.WB_M/this.props.statistic.WB_M).toFixed(2)*100
                                }
                                text={""}
                                styles={{
                                    path: {
                                        stroke: "#27AE60",
                                        strokeLinecap: 'butt',
                                        transition: 'stroke-dashoffset 3s ease 1s',
                                    }
                                }}
                            />
                            {/*<div id="WB_M" className="circle"></div>*/}
                        </div>
                        <div className="div-bar-text">
                            <p id="" className="p-bar-text">Принятый пробег<br/>по БСМТ, %</p>
                        </div>
                    </div>
                </div>
                <div className="indic-bot">
                    <div className="div-pr25">
                        <span id="lmch-2" className="p-meanings-2nd"><span id="fuel" className="span-figures-2nd">
                            {
                                (this.props.statistic.fuel === 0 && this.props.statistic.time === 0) ? 0 :
                                (this.props.statistic.time/this.props.statistic.fuel).toFixed(2)
                            }
                        </span> мч\л<br/>ТМЧ</span>
                        </div>
                    <div className="div-meanings">
                        <span id="" className="p-meanings-2nd"><span id="terminals" className="span-figures-2nd">{this.props.statistic.carsTerminal}</span><br/>Терминалов</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default InfoDepartment;
