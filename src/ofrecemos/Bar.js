import React, { Component } from "react";
import { Form, Input, Modal, Button, Label,Alert,message,Select,Checkbox,DatePicker, Row, Col } from 'antd';
import {
  Redirect,
  HashRouter,
  withRouter,
  Link
} from "react-router-dom";
import Footer from '../Footer2'
import location from '../images/services-28.png'
import email from '../images/services-29.png'
import phone from '../images/services-30.png'
import grace from '../images/services-31.png'
import restClient from '../network/restClient';

class Bar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            data:'',
            servicios:[],
            contacto:''
        }


    }

    componentDidMount(){
          this.setState({loading:true})
          this.getContent()
    }

    scrollToMyRef = () => {

        window.scrollTo({
            top:200,
            // behavior: "smooth" // optional
        });
    };

    getContent = ()=>{
             this.setState({loading:true});
             restClient.getContentById({id_page:13}).then(response=>{
              let services = [];
              let contact = '';
               response.data.map(tipo=>{
                 if(tipo.parametro=='servicios_bar') {
                       tipo.key=`p-${tipo.id_contenido}`;
                       services.push(tipo);
                      }
                 if(tipo.parametro=='contacto') {
                     contact=tipo;
                 }
                    })
               this.setState({ data:response.data[0],
                               contacto:contact,
                               servicios:services,
                               loading:false},()=>this.scrollToMyRef())
               }).catch(error=>{
                   this.setState({loading:false});
             });
    }

  render() {
    const{data,servicios,contacto}=this.state
    return (
    <div className="wrapper">
        <div class="headerServicios header3" style={{backgroundImage:`url(${data.valor1})`}}>
            <div className="headerMask bar">
                <div className="bigTitHeader bar">
                    BAR Y ALMUERZOS
                </div>
            </div>
        </div>
        <Row className="center" className="ptop">
              <div className="darkLine">
              </div>
              <div className="boldTextEquipo center">
              FULL OF GRACE
              </div>
              <div className="lightTextEquipo center">
                  SNACKS
              </div>
        </Row>
        <Row type="flex" className="servicesRow">

            <Col lg={5} md={8} xs={24} className="imageCol">
                <div className="imageBox">
                    <img src={grace} className="serviceImg"/>
                </div>
            </Col>
            <Col lg={19} md={16} xs={24} className="textServiceCol">
                <div className="largeText">
                    {data.valor2}

                </div>
                <div className="smallTitulo"><strong>Servicios:</strong></div>
                <ul className="lista">
                {servicios.map(service=>
                    <li className="activity">
                    {service.valor1}
                    </li>
                )}
                </ul>
            </Col>
        </Row>
        <Row type="flex" className="servicesRow icons">

            <Col md={12} xs={24} className="atencionCol">
                <div className="bigIcon">
                    <img src={email} className="bigIconImg"/>
                </div>
                <div className="textAtencion">{contacto.valor1}</div>
            </Col>
            <Col md={12} xs={24} className="atencionCol">
                <div className="bigIcon">
                    <img src={phone} className="bigIconImg"/>
                </div>
                <div className="textAtencion">{contacto.valor2}</div>
            </Col>

        </Row>
        <Footer/>

    </div>
    )
    }
}
export default Bar;
