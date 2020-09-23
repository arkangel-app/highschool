import React, { Component } from "react";
import { Form, Input, Modal, Button, Label,Alert,message,Select,Checkbox,DatePicker, Row, Col } from 'antd';
import {
  Redirect,
  HashRouter,
  withRouter,
  Link
} from "react-router-dom";
import Footer from '../Footer2'
import restClient from '../network/restClient';

class Mvv extends Component {
    constructor(props) {
    super(props);
        this.state = {
            loading:false,
            mision:'',
            vision:'',
            valores:[],
            image:''
        }
    }

    componentDidMount(){
            this.getPageContent();
      }

     getPageContent = ()=>{
               this.setState({loading:true});
               restClient.getIdearioContent().then(response=>{
                let coreValues = [];
                let ms;
                let vs;
                let cover;
                console.log(response)
                 response.data.map(ideario=>{
                           if(ideario.tipo=='valores') {
                                 ideario.key=`p-${ideario.id_ideario}`;
                                 coreValues.push(ideario);
                                }
                           if(ideario.nombre=='mision') {
                               ms=ideario.valor;
                           }
                           if(ideario.nombre=='vision') {
                               vs=ideario.valor;
                           }
                           if(ideario.nombre=='bg-photo'){
                               cover=ideario.valor;
                           }
                      })
                 this.setState({mision:ms,
                                vision:vs,
                                valores:coreValues,
                                image:cover,
                                loading:false})
                 }).catch(error=>{
                     this.setState({loading:false});
                     message.error(error.message);
               });
        }

  render() {
     const{mision,vision,valores,image}=this.state
    return (
    <div className="wrapper">
     <Row type="flex" className="rowHeader">
            <Col md={12} xs={24}>
                <div class="headerBackground ideario" style={{backgroundImage:`url(${image})`}}>

                    </div>
            </Col>
            <Col md={12} xs={24} className="bgColorHeader">
                <div className="headerText">
                    <div className="bigTitHeader mvv">
                        NUESTRA MISIÓN
                    </div>
                  <p className="shortPar colorWhite">
                     {mision}
                  </p>
                  <div className="bigTitHeader mvv">
                      NUESTRA VISIÓN
                  </div>
                <p className="shortPar colorWhite">
                    {vision}
                </p>
                </div>
            </Col>
        </Row>

        <Row className="coreValuesRow">

            <div className="valueTit light big">
                NUESTROS VALORES
            </div>
            {valores.map(coreValue=>
                <div className="valuesList">
                    <strong>
                        {coreValue.nombre}  <br></br>
                    </strong>
                    {coreValue.valor}
                </div>
            )}
        </Row>

        <Footer/>

    </div>
    )
    }
}
export default Mvv;
