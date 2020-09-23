import React, { Component } from "react";
import { Form, Input, Modal, Button, Label,Alert,message,Select,Checkbox,DatePicker, Row, Col } from 'antd';

import Footer from '../Footer2'
import restClient from '../network/restClient';

class Academico extends Component {

    constructor(props) {
    super(props);
    this.state = {
        loading:false,
        data:'',
        metodologias:[],
        areas:[],
    }
    this.myRef = React.createRef();

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
             restClient.getContentById({id_page:7}).then(response=>{
              let metodologias = [];
              let areas = [];
               response.data.map(tipo=>{
                 if(tipo.parametro=='metodologia') {
                       tipo.key=`m-${tipo.id_contenido}`;
                       metodologias.push(tipo);
                 }
                 if(tipo.parametro=='areas_de_estudios') {
                         tipo.key=`a-${tipo.id_contenido}`;
                         areas.push(tipo);
                 }
                    })
               this.setState({ data:response.data[0],
                               areas:areas,
                               metodologias:metodologias,
                               loading:false},()=>this.scrollToMyRef())
               }).catch(error=>{
                   this.setState({loading:false});
                   message.error(error.message);
             });
         }

    render() {
    const{data,metodologias,areas}=this.state
    return (
        <div class="wrapper">
       <Row type="flex" className="rowHeader">
                <Col md={12} xs={24}>
                <div class="headerBackground top" style={{backgroundImage:`url(${data.valor1})`}}>

                    </div>
                </Col>
                <Col md={12} xs={24} className="bgColorHeader">
                    <div className="headerText">
                     <div className="bigTitHeader acad shortTit">
                            Académico
                     </div>
                      <p className="shortPar espaceTop forma">
                          {data.valor2}
                      </p>
                    </div>
                </Col>
            </Row>

            <Row type="flex" className="rowTextIp">
            <Col md={24} xs={24} className="colTitsubjects">
                <div className="smallBar dark2"></div>
                <div className="titleBd">
                    METODOLOGÍAS
                </div>

            </Col>
            {metodologias.map(metodo=>
                <Col md={8} xs={24} className="subjectBox">
                    <div className="titIp center">
                        {metodo.valor2}
                    </div>
                    <div className="textIp center">
                        {metodo.valor3}
                    </div>
                </Col>
            )}

            </Row>
            <Row type="flex" className="rowSubjects">
            <Col md={24} xs={24} className="colTitsubjects">
                <div className="smallBar dark2"></div>
                <div className="titleBd">
                    ÁREAS
                </div>
                <div className="titleLt">
                    DE ESTUDIO
                </div>
            </Col>
            {areas.map(area=>
                <Col md={8} xs={12} className="subjectBox">
                    <div className="subjectImgBox">
                        <img src={area.valor1} className="subjectImg"></img>
                        </div>
                </Col>
            )}
            </Row>

        <Footer/>

        </div>
    )}
}

export default Academico;
