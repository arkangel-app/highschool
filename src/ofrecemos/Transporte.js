import React, { Component } from "react";
import { Form, Input, Modal, Button, Label,Alert,message,Select,Checkbox,DatePicker, Row, Col } from 'antd';
import {
  Redirect,
  HashRouter,
  withRouter,
  Link
} from "react-router-dom";
import Footer from '../Footer2'
import location from '../images/activity-26.png'
import email from '../images/services-29.png'
import phone from '../images/services-30.png'
import grace from '../images/services-32.png'
import restClient from '../network/restClient';


class Transporte extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            data:'',
            contacto:''
        }
    }

    componentDidMount(){
          this.setState({loading:true})
          this.getContent()
    }

    scrollToMyRef = () => {

        window.scrollTo({
            top:160,
            // behavior: "smooth" // optional
        });
    };

    getContent = ()=>{
             this.setState({loading:true});
             restClient.getContentById({id_page:14}).then(response=>{
               this.setState({ data:response.data[0],
                               contacto:response.data[1],
                               loading:false},()=>this.scrollToMyRef())
               }).catch(error=>{
                   this.setState({loading:false});
             });
    }

  render() {
    const{data,contacto}=this.state

    return (
    <div className="wrapper">
        <div class="headerServicios header3" style={{backgroundImage:`url(${data.valor1})`}}>
            <div className="headerMask bar">
                <div className="bigTitHeader bar">
                    TRANSPORTE
                </div>
            </div>
        </div>
        <Row className="center" className="ptop">
              <div className="darkLine">
              </div>
              <div className="boldTextEquipo center">
                SERVICO DE
              </div>
              <div className="lightTextEquipo center">
                  TRANSPORTE
              </div>
        </Row>
        <Row type="flex" className="servicesRow transp">

            <Col lg={5} md={8} xs={24} className="imageCol">
                <div className="imageBox">
                    <img src={grace} className="serviceImg"/>
                </div>
            </Col>
            <Col lg={19} md={16} xs={24} className="textServiceCol">
                <div className="largeText">
                {data.valor2}
                </div>
            </Col>
        </Row>
        <Row type="flex" className="servicesRow transp icons">
            <Col md={8} xs={24} className="atencionCol trasnp">
                <div className="bigIcon">
                    <img src={location} className="bigIconImg"/>
                </div>
                <div className="textAtencion trans">{contacto.valor3}</div>
            </Col>
            <Col md={8} xs={24} className="atencionCol trasnp">
                <div className="bigIcon">
                    <img src={email} className="bigIconImg"/>
                </div>
                <div className="textAtencion trans">{contacto.valor1}</div>
            </Col>
            <Col md={8} xs={24} className="atencionCol trasnp">
                <div className="bigIcon">
                    <img src={phone} className="bigIconImg"/>
                </div>
                <div className="textAtencion trans">{contacto.valor2}</div>
            </Col>
        </Row>
        <Footer/>
    </div>
    )
    }
}
export default Transporte;
