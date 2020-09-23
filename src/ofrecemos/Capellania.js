import React, { Component } from "react";
import { Form, Input, Modal, Button, Label,Alert,message,Select,Checkbox,DatePicker, Row, Col } from 'antd';
import {
  Redirect,
  HashRouter,
  withRouter,
  Link
} from "react-router-dom";
import Footer from '../Footer2'
import capilla from '../images/capellania.jpg'
import place from '../images/activity-27.png'
import time from '../images/activity-26.png'
import restClient from '../network/restClient';

class Capellania extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            data:'',
            diarias:[],
            complementarias:[],
            retiros:[],
            horariosSacerdotes:[]
        }
    }

    componentDidMount(){
          this.setState({loading:true})
          this.getContent()
          this.getSacerdotes()
           this.getCapellaniaText()
        }

    scrollToMyRef = () => {

        window.scrollTo({
            top:160,
            // behavior: "smooth" // optional
        });
    };

    getCapellaniaText = ()=>{

        restClient.getContentById({id_page:18}).then(response=>{
    
           console.log(response)
             this.setState({ data:response.data[0],
                             loading:false})
             }).catch(error=>{
                 this.setState({loading:false});
                 message.error(error.message);
           });
    }

    getContent = ()=>{
             this.setState({loading:true});
             restClient.getCapellania().then(response=>{
                 console.log(response)
              let diarias = [];
              let complementarias = [];
              let retiros = [];
              response.data.map(activity=>{
                  activity.key=activity.id_actividad;
                  switch(activity.tipo){
                      case 'diarias':
                            diarias.push(activity)
                      break;
                      case 'complementarias':
                            complementarias.push(activity)
                      break;
                      case 'retiros':
                            retiros.push(activity)
                      break;
                      default:
                  }
               })
               this.setState({ 
                               retiros:retiros,
                               complementarias:complementarias,
                               diarias:diarias,
                               loading:false},()=>this.scrollToMyRef())
               }).catch(error=>{
                   this.setState({loading:false});
             });
    }

    getSacerdotes = ()=>{
        this.setState({loading:true});
        restClient.getSacerdotes().then(response=>{
            let sacerdotes = [];
              response.data.map(sacerdote=>{
                sacerdotes.key=sacerdote.id_sacerdote;
                sacerdotes.push(sacerdote)
              })
             this.setState({horariosSacerdotes:sacerdotes})
        }).catch(error=>{
            this.setState({loading:false});
      });
    }

    render() {
    const{data,diarias,complementarias,retiros,horariosSacerdotes}=this.state
    return (
    <div className="wrapper">
        

        <Row type="flex" className="rowHeader">
                <Col md={12} xs={24}>
                <div class="headerBackground headerCapellania">

                    </div>
                </Col>
                <Col md={12} xs={24} className="bgColorHeader">
                    <div className="headerText">
                     <div className="bigTitHeader acad shortTit">
                            CAPELLANÍA
                     </div>
                      <p className="shortPar espaceTop forma">
                        <div dangerouslySetInnerHTML={{ __html: this.state.data.valor2 }}>
                        </div>
      </p>
                    </div>
                </Col>
            </Row>
    
            <div className="horariosSection">
        <Row type="flex" className="horariosRow">
            <Col md={24} xs={24} className="actCol tit">
                <div className="smallBar dark"></div>
                <div className="boldTit act">
                    Horarios
                </div>
                <div className="thinTit act">
                    DE LOS SACERDOTES
                </div>
            </Col>
        </Row>
        {horariosSacerdotes.map(sacerdote=>
            <Row type="flex" className="capellaniaTab">
                <Col md={6} xs={24} className="pName">
                    {sacerdote.nombre_sacerdote}
                </Col>
                <Col md={12} xs={16} className="dias">
                    {sacerdote.dias}
                </Col>
                <Col md={6} xs={8} className="horas">
                    {sacerdote.horario}
                </Col>
            </Row>
        )}
        </div>

        <Row type="flex" className="activitiesTypeRow">
            <Col md={12} xs={24} className="actCol ">
                <div className="activitiesBox">
                    <div className="smallBar dark"></div>
                    <div className="boldTit act">
                        ACTIVIDADES
                    </div>
                    <div className="thinTit act">
                        DIARIAS
                    </div>
                    <ul className="lista">
                    {diarias.map(act=>
                        <li className="activity">
                            {act.actividad}
                        </li>
                    )}
                    </ul>
                </div>
            </Col>
            <Col md={12} xs={24} className="actCol ">
            <div className="activitiesBox">
                <div className="smallBar dark"></div>
                <div className="boldTit act">
                    ACTIVIDADES
                </div>
                <div className="thinTit act">
                    COMPLEMENTARIAS
                </div>
                <ul className="lista">
                    {complementarias.map(act=>
                        <li className="activity">
                            {act.actividad}
                        </li>
                    )}
                </ul>
            </div>
            </Col>
            </Row>
            <Col md={24} xs={24} className="colActividadesTit">
                <div className="activitiesBox">
                    <div className="smallBar dark"></div>
                    <div className="boldTit act">
                        retiros mensuales
                    </div>
                    <div className="thinTit act">
                        PARA SEÑORAS
                    </div>
                </div>
            </Col>
            <Row className="retirosRow">
                {retiros.map(retiro=>
                    <Col md={12} xs={24} className="actCol capellania">
                        <ul className="lista">
                            <li className="activity">
                                {retiro.actividad}
                            </li>
                            <div className="placeItem">
                                <span><img src={place} className="activityIcon"/></span>
                                    {retiro.lugar}
                                </div>
                                <div className="placeItem">
                                <span><img src={time} className="activityIcon"/></span>
                                    {retiro.hora}
                            </div>
                        </ul>
                    </Col>
                )}
        </Row>
    
        <Footer/>

    </div>
    )
    }
}
export default Capellania;
