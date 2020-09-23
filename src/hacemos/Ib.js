import React, { Component } from "react";
import { Form, Input, Modal, Button, Label,Alert,message,Select,Checkbox,DatePicker, Row, Col } from 'antd';
import {
  Redirect,
  HashRouter,
  withRouter,
  Link
} from "react-router-dom";
import ib from '../images/ib.png'
import Footer from '../Footer2'
import restClient from '../network/restClient';


class Ib extends Component {
    constructor(props) {
    super(props);
    this.state = {
        loading:false,
        data:'',
        areas:[]
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
             restClient.getContentById({id_page:8}).then(response=>{
              let metodologias = [];
              let areas = [];
               response.data.map(tipo=>{
                 if(tipo.parametro=='tipo_ib') {
                         tipo.key=`a-${tipo.id_contenido}`;
                         areas.push(tipo);
                 }
                    })
               this.setState({ data:response.data[0],
                               areas:areas,
                               loading:false},()=>this.scrollToMyRef())
               }).catch(error=>{
                   this.setState({loading:false});
                   message.error(error.message);
             });
  }
  render() {
    const{data,areas}=this.state
    return (
    <div className="wrapper">
  

        
<Row type="flex" className="rowHeader">
                <Col md={12} xs={24}>
                <div class="headerBackground top" style={{backgroundImage:`url(${data.valor1})`}}>

                    </div>
                </Col>
                <Col md={12} xs={24} className="bgColorHeader">
                    <div className="headerText">
                     <div className="bigTitHeader acad shortTit pBottom">
                     <div className="ibBoxImg">
                        <a href="https://www.ibo.org/" target="_blank"  className="ibLink">
                            <img src={ib} className="ibImg"></img>
                        </a>
                    </div>
                     </div>
                      <p className="shortPar espaceTop forma">
                          {data.valor2}
                      </p>
                    </div>
                </Col>
            </Row>

        <Row type="flex" className="rowSubjects ib">
        <Col md={24} xs={24} className="colTitsubjects">
            <div className="smallBar dark2"></div>
            <div className="titleBd ib">
                ASIGNATURAS QUE OFRECEMOS
                
            </div>
            <div className="titleLt ib">
                DE ACUERDO A LOS INTERESES DE LAS ALUMNAS
            </div>
        </Col>
            {areas.map(area=>
                <Col md={6} xs={12} className="subjectBox">
                    <div className="subjectImgBox">
                        <img src={area.valor1} className="subjectImg ib"></img>
                    </div>
                </Col>
            )}

        </Row>
        <Footer/>

    </div>
    )
    }
}
export default Ib;
