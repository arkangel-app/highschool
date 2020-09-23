import React, { Component } from "react";
import { Form, Input, Modal, Button, Label,Alert,message,Select,Checkbox,DatePicker, Row, Col } from 'antd';
import {
  Redirect,
  HashRouter,
  withRouter,
  Link
} from "react-router-dom";
import restClient from '../network/restClient';
import Footer from '../Footer2'
class Historia extends Component {
    constructor(props) {
    super(props);
        this.state = {
            loading:false,
            data:'',
            intro:''
        }
    }

    componentDidMount(){
        this.setState({loading:true})
        this.getContent()
    }

    getContent = ()=>{
           this.setState({loading:true});
           restClient.getContentById({id_page:2}).then(response=>{
             this.setState({ intro:response.data[1].valor1,
                             data:response.data[0],
                             loading:false})
             }).catch(error=>{
                 this.setState({loading:false});
                 message.error(error.message);
           });
       }

  render() {
    const {data,intro} = this.state
    return (
    <div className="wrapper">
        <div class="headerText">
                <div className="bigTitHeader Historia">
                    HISTORIA
                </div>
        </div>
        <Row type="flex history">
            <Col md={12} xs={24} className="peLeft history">
                <div className="justifyText hpadding">
                    {data.valor1}
                </div>
            </Col>
            <Col md={12} xs={24} className="peRight history">
                <div className="rightText history hpadding">
                {data.valor2}
                </div>
            </Col>
            <Row type="flex" className="normalRow history">
                <div className="historyBox">
                {data.valor3}
                </div>
            </Row>
        </Row>
        <Row className="rowNewH">
            <Col md={12} xs={24} className="peLeft history foto">
                <div className="imgHistoriaBox">
                    <img src={intro} className="imgHistoria"></img>
                </div>
            </Col>
            <Col md={12} xs={24} className="hcol">
                <div className="history hpadding text">
                 Las actividades espirituales se realizarían enmarcadas en los principios fundamentales de la doctrina católica y con el mayor respeto a la libertad de las conciencias.
                </div>
            </Col>

        </Row>
        <Footer/>

    </div>
    )
    }
}
export default Historia;
