import React, { Component } from "react";
import {
  Route,
  NavLink,
  Link,
  HashRouter,
  BrowserRouter
} from "react-router-dom";
import Academico from "./academico";
import Formativo from "./formativo";
import formativo from '../images/formativo.png';
import academico from '../images/academico.png';

import { Row, Col, Icon, Modal, Button, Menu } from 'antd';
import Footer from '../Footer2'
import restClient from '../network/restClient';
class ProyectoEducativo extends Component {

        constructor(props) {
            super(props);
            this.state = {
                loading:false,
                data:'',
                academico:'',
                formativo:'',

            }
      }

        componentDidMount(){
              this.setState({loading:true})
              this.getContent()
        }

        getContent = ()=>{
                 this.setState({loading:true});
                 restClient.getContentById({id_page:5}).then(response=>{
                  let tipos = [];
                   response.data.map(tipo=>{
                     if(tipo.parametro=='tipo_proyecto') {
                           tipo.key=`p-${tipo.id_contenido}`;
                           tipos.push(tipo);
                          }
                        })
                   this.setState({ data:response.data[0],
                                   formativo:tipos[0],
                                   academico:tipos[1],
                                   loading:false})
                   }).catch(error=>{
                       this.setState({loading:false});
                 });
     }

     render() {

         const{data,formativo,academico}=this.state
       return (
        <div class="wrapper">
    

        <Row type="flex" className="rowHeader">
                <Col md={12} xs={24}>
                <div class="headerBackground big" style={{backgroundImage:`url(${data.valor1})`}}>

                    </div>
                </Col>
                <Col md={12} xs={24} className="bgColorHeader">
                    <div className="headerText">
                     <div className="bigTitHeader acad shortTit ped">
                     Proyecto Educativo
                     </div>
                      <p className="shortPar espaceTop forma"
                      dangerouslySetInnerHTML={{ __html: data.valor2 }}>

                      </p>
                    </div>
                </Col>
            </Row>



            <Row type="flex" className="normalRow">
                <Col md={12} xs={24} className="formativoCol">
                    <div className="formativoBox">
                        <div className="peIconBox">
                            <img src={formativo.valor1} className="peIcon"/>
                        </div>

                        <div class="lightTextGray2">
                            {formativo.valor3}
                        </div>
                        <div className="readMoreBtn peBtn">
                        <Link to="/formativo" className="rmoreLink">
                            <div className="whiteBtn square left proyecto">
                                Leer
                            </div>
                            <span className="lightBtn">
                                 más
                            </span>
                        </Link>
                        </div>
                    </div>
                </Col>
                <Col md={12} xs={24} className="academicoCol">
                    <div className="academicoBox">
                        <div className="peIconBox">
                            <Link to="/academico">
                                <img src={academico.valor1} className="peIcon"/>
                            </Link>
                        </div>

                        <div class="lightTextGray2">
                            {academico.valor3}
                        </div>
                        <div className="readMoreBtn peBtn righ">
                        <Link to="/academico" className="rmoreLinkRev">
                            <div className="whiteBtn square left proyecto">
                                Leer
                            </div>
                            <span className="lightBtn">
                                 más
                            </span>
                        </Link>
                        </div>
                    </div>
                </Col>
            </Row>
            <Footer/>
        </div>




       )
     }
}

 export default ProyectoEducativo;
