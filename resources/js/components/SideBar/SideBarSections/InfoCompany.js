import React from 'react';
import 'react-circular-progressbar/dist/styles.css';
import CircularProgressbar from 'react-circular-progressbar';
import axios from 'axios';

class InfoCompany extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            show: this.props.show,
            statistic: {},
            withoutTerminal: false
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.show !== this.props.show) {
            this.setState({
                show: this.props.show
            });
            axios.get('api/statistics')
                .then(res => {
                    this.setState({
                        statistic: res.data
                    });
                });
        }
    }

    componentDidMount() {
        axios.get('/api/statistics')
            .then(res => {
                this.setState({
                    statistic: res.data
                });
            });
    }


    render() {
        console.log(this.state.statistic);
        return(
            <div id="info-company" className={"istatisticDepartmentnfo-company item-sideBar" + (this.state.show ? '' : ' hide')}>
                <div>
                    <div className="ts-title">
                        <span className="img">
                            <img src='/img/delivery-truck.svg' alt="deliveryTruck" className="" />
                        </span>
                        <span className="ts-text">Транспортные средства</span>
                    </div>
                    <div className="item-info">
                        <span className="item-info-title">Всего, шт.</span>
                        <span id="compAmOfTs" className="figures">{this.state.statistic.carsTotal}</span>
                    </div>
                    <div className="item-info">
                        <span className="item-info-title">Готовы, шт.</span>
                        <span id="compReady" className="figures">{this.state.statistic.carsReady}</span>
                    </div>
                    <div className="item-info">
                        <span className="item-info-title">На ремонте, шт.</span>
                        <span id="compOnRep" className="figures">{this.state.statistic.carsRepair}</span>
                    </div>
                    <div className="item-info">
                        <span className="item-info-title">На ТО, шт.</span>
                        <span id="compOnTo" className="figures">{this.state.statistic.carsTO}</span>
                    </div>
                    <div className="item-info">
                        <span className="trans-auto">На линии, шт.</span>
                        <span id="compOnLine" className="figures">{this.state.statistic.carsInline}</span>
                    </div>
                    <div className="item-info">
                            <span id="without-terminal" onClick={()=>{this.setState({withoutTerminal: !this.state.withoutTerminal})}} className={!this.state.withoutTerminal ? "trans-auto" : "trans-auto hide"} style={{cursor:"pointer"}}>
                                ...
                            </span>
                    </div>
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
                            <span id="OnLine" className="figures">{parseInt(this.state.statistic.carsTotal) - parseInt(this.state.statistic.carsTerminal)}</span>
                        </div>
                        <div className="d-flex justify-content-between" style={{width: "100%"}}>
                            <span id="" className="trans-auto" style={{marginLeft: '0.9vh', paddingLeft: '10px'}}>
                                На карте</span>
                            <span id="OnLine" className="figures">{parseInt(this.state.statistic.carsOnMap)}</span>
                        </div>
                    </div>
                </div>

                <div id="request" className="">
                    <div className="request-title">
                        <span className="img"><img src='/img/copy.svg' alt="copy" className="span-yan/img-h3-2nd" /></span>
                        <span className="text">Заявки</span>
                    </div>
                    <div className="item-info">
                        <span className="trans-auto">Выполнено, шт.</span>
                        <span id="comp_applications_executed" className="figures">{this.state.statistic.applications_total}</span>
                    </div>
                    <div className="item-info">
                        <span className="trans-auto">Отменено, шт.</span>
                        <span id="comp_applications_canceled" className="figures">{this.state.statistic.applications_canceled}</span>
                    </div>
                    <div className="item-info">
                        <span className="trans-auto">Переданы на СП, шт.</span>
                        <span id="comp_applications_sub" className="figures">{this.state.statistic.applications_sub}</span>
                    </div>
                </div>

                <div id="indicators" className="indicators-class">
                    <div className="indicators-title">
                        <span className="img"><img src='/img/pie.svg' alt="pie" className="span-yan/img-h3-3nd" /></span>
                        <span className="text">Показатели компании</span>
                    </div>
                    <div className="item-bar">
                        <div className="circle-block" >
                            <span id="comp_applications_ac_per" className="p-bar">
                                {
                                    (this.state.statistic.applications_ac/this.state.statistic.applications_total).toFixed(2)*100
                                }%
                            </span>
                            {/*<div id="comp_applications_ac" className="circle"></div>*/}
                            <CircularProgressbar
                                percentage={
                                        (this.state.statistic.applications_ac/this.state.statistic.applications_total).toFixed(2)*100
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
                        </div>
                        <div className="div-bar-text">
                            <span id="filed" className="p-bar-text">Поданы через АС<br/>"Авто-Контроль", %</span>
                        </div>
                    </div>
                    <div className="item-bar">
                        <div className="circle-block" >
                            <span id="comp_waybills_total_per" className="p-bar">
                                {
                                    (this.state.statistic.waybills_processed  === 0 && this.state.statistic.waybills_total === 0) ? 0 :
                                        (this.state.statistic.waybills_processed/this.state.statistic.waybills_total).toFixed(2)*100
                                }%
                            </span>
                            <CircularProgressbar
                                percentage={
                                    (this.state.statistic.waybills_processed  === 0 && this.state.statistic.waybills_total === 0) ? 0 :
                                        (this.state.statistic.waybills_processed/this.state.statistic.waybills_total).toFixed(2)*100
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
                        </div>
                        <div className="div-bar-text">
                            <span id="processed" className="p-bar-text-str">Обработано ПЛ, %</span>
                        </div>
                    </div>
                    <div className="item-bar">
                        <div className="circle-block" >
                            <p id="comp_accidents_total_per" className="p-bar">
                                {
                                    (this.state.statistic.accidents_guilty  === 0 && this.state.statistic.accidents_total === 0) ? 0 :
                                        (this.state.statistic.accidents_guilty/this.state.statistic.accidents_total).toFixed(2)*100
                                }%
                            </p>
                            <CircularProgressbar
                                percentage={
                                    (this.state.statistic.accidents_guilty  === 0 && this.state.statistic.accidents_total === 0) ? 0 :
                                        (this.state.statistic.accidents_guilty/this.state.statistic.accidents_total).toFixed(2)*100
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
                        </div>
                        <div className="div-bar-text">
                            <span id="dtp" className="p-bar-text">ДТП по вине<br/>компании, %</span>
                        </div>
                    </div>
                    <div className="item-bar">
                        <div className="circle-block" >
                            <span id="comp_WB_M_per" className="p-bar">
                                {
                                    (this.state.statistic.WB_M === 0 || this.state.statistic.WB_ALL ===0) ? 0 :
                                        ((this.state.statistic.WB_M/this.state.statistic.WB_ALL).toFixed(2)*100)
                                }%
                            </span>
                            <CircularProgressbar
                                percentage={
                                    (this.state.statistic.WB_M === 0 || this.state.statistic.WB_ALL ===0) ? 0 :
                                        ((this.state.statistic.WB_M/this.state.statistic.WB_ALL).toFixed(2)*100)
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
                        </div>
                        <div className="div-bar-text">
                            <span id="mileage-bsmt" className="p-bar-text">Принятый пробег<br/>по БСМТ, %</span>
                        </div>
                    </div>

                    <div className="indic-bot">
                        <div className="div-pr25">
                            <span id="lmch-2" className="p-meanings-2nd"><span id="comp_fuel" className="span-figures-2nd">
                                {
                                    (this.state.statistic.fuel === 0 && this.state.statistic.time === 0) ? 0 :
                                    ((this.state.statistic.time/this.state.statistic.fuel).toFixed(2))
                                }

                            </span> мч\л<br/>ТМЧ</span>
                        </div>{/*END__INFO_COMPANY*/}
                        <div className="div-meanings">
                            <span id="" className="p-meanings-2nd"><span id="comp_terminals" className="span-figures-2nd">{this.state.statistic.carsTerminal}</span><br/>Терминалов</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default InfoCompany;
