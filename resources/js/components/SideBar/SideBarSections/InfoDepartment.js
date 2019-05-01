import React from 'react';
import ReactDOM from 'react-dom';
import deliveryTruck from "../../img/delivery-truck.svg"
import copy from "../../img/copy.svg";
import pie from "../../img/pie.svg";
import point_0 from "../../img/auto_icon/point_blue_0.svg"
import point_1 from "../../img/auto_icon/point_blue_1.svg"
import point_2 from "../../img/auto_icon/point_blue_2.svg"
import point_3 from "../../img/auto_icon/point_blue_3.svg"
import 'react-circular-progressbar/dist/styles.css';
import CircularProgressbar from 'react-circular-progressbar';

class InfoDepartment extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            show: this.props.show
        };
    }


    componentDidUpdate(prevProps, prevState) {
        if (prevProps.show !== this.props.show) {
            this.setState({
                show: this.props.show
            });
        }
    }

    render() {
        return(
            <div id="info-department" className={"info-department item-sideBar" + (this.state.show ? '' : ' hide')}>
                <div className="">
                    <div className="">
                        <div className="ts-title">
                            <span className="img"><img src={deliveryTruck} alt="deliveryTruck" className="span-yan/img-h3"/></span>
                            <span id="tranport-means" className="ts-text h3-main">Транспортные средства</span>
                        </div>
                        <div id="" className="item-info">
                            <span id="" className="trans-auto">Всего, шт.</span>
                            <span id="totTs" className="figures">311</span>
                        </div>
                        <div className="item-info">
                            <span className="trans-auto">Готовы, шт.</span>
                            <span id="OnReady" className="figures">4</span>
                        </div>
                        <div className="item-info">
                            <span id="on-repair" className="trans-auto">На ремонте, шт.</span>
                            <span id="OnRep" className="figures">3</span>
                        </div>
                        <div className="item-info">
                            <span id="on-to" className="trans-auto">На ТО, шт.</span>
                            <span id="onTo" className="figures">4</span>
                        </div>
                        <div className="item-info">
                            <span id="on-line-department" className="trans-auto">На линии, шт.</span>
                            <span id="OnLine" className="figures">124</span>
                        </div>
                    </div>

                    <div className="div-transport">
                        <hr className="hr-trans" />
                        <div id="all" className="item-info transort-department ">
                            <div className="transport-title">
                                <span id="passenger-car" className="p-type-transport">Все транспортные средства</span>
                            </div>
                        </div>
                        <hr className="hr-trans" />
                        <div id="light" className="item-info transort-department">
                            <div className="transport-title">
                                <span className="span-h3-filial"><img src={point_0} alt="point_0" className="img-transport"/></span>
                                <span id="passenger-car" className="p-type-transport">Легковые</span>
                            </div>
                            <span id="passCar" className="p-quantity">40</span>
                        </div>
                        <hr className="hr-trans" />
                        <div id="truck" className="item-info transort-department">
                            <div className="transport-title">
                                <span className="span-h3-filial"><img src={point_1} alt="point_1" className="img-transport"/></span>
                                <span id="freight" className="p-type-transport">Грузовые</span>
                            </div>
                            <span id="freightCar" className="p-quantity">221</span>
                        </div>
                        <hr className="hr-trans" />
                        <div id="bus" className="item-info transort-department">
                            <div className="transport-title">
                                <span className="span-h3-filial"><img src={point_2} alt="point_2" className="img-transport"/></span>
                                <span className="p-type-transport">Автобусы</span>
                            </div>
                            <span id="busCar" className="p-quantity">20</span>
                        </div>
                        <hr className="hr-trans" />
                        <div id="spec" className="item-info transort-department">
                            <div className="transport-title">
                                <span className="span-h3-filial"><img src={point_3} alt="point_3" className="img-transport"/></span>
                                <span id="spec" className="p-type-transport">Спецтехника</span>
                            </div>
                            <span id="specCar" className="p-quantity">12</span>
                        </div>
                        <hr className="hr-trans" />
                    </div>
                </div>

                <div className="">
                    <div id="request-department" className="">
                        <div className="request-title">
                            <span className="img"><img src={copy} alt="copy" className="span-yan/img-h3-2nd"/></span>
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
                        <span className="img"><img src={pie} alt="pie" className="span-yan/img-h3-3nd"/></span>
                        <span id="h3-indicator" className="text">Показатели компании</span>
                    </div>
                    <div className="item-bar">
                        <div className="ilia" >
                            <span id="applications_ac_per" className="p-bar">
                                {
                                    (this.props.statistic.applications_ac/this.props.statistic.applications_total).toFixed(2)*100
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
                            {/*<div id="applications_ac" className="circle"></div>*/}
                        </div>
                        <div className="div-bar-text">
                            <span id="filed" className="p-bar-text">Поданы через АС<br/>"Авто-Контроль", %</span>
                        </div>
                    </div>
                    <div className="item-bar">
                        <div className="ilia" >
                            {console.log('---acc', this.props.statistic.waybills_processed,this.props.statistic.waybills_total, (this.props.statistic.waybills_processed/this.props.statistic.waybills_total).toFixed(2)*100)}
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
                            {/*<div id="waybills_total" className="circle"></div>*/}
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
                                    (this.props.statistic.WB_M/this.props.statistic.WB_ALL).toFixed(2)*100
                                }%
                            </p>
                            <CircularProgressbar
                                percentage={(this.props.statistic.WB_M/this.props.statistic.WB_ALL).toFixed(2)*100}
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
                        <span id="lmch-2" className="p-meanings-2nd"><span id="fuel" className="span-figures-2nd">{(this.props.statistic.fuel/this.props.statistic.time).toFixed(2)}</span> л\мч<br/>ТМЧ</span>
                        </div>
                    <div className="div-meanings">
                        <span id="" className="p-meanings-2nd"><span id="terminals" className="span-figures-2nd">110</span><br/>Терминалов</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default InfoDepartment;