import React, { Component } from "react";

import efqmImg from '../images/efqm logo.jpg';
import Footer from '../Footer2'
import {
  Redirect,
  HashRouter,
  withRouter,
  Link
} from "react-router-dom";
import { Form, Input, Modal, Button, Label,Alert,message,Select,Checkbox,DatePicker, Row, Col } from 'antd';
import restClient from '../network/restClient';

class Calidad extends Component {
    constructor(props) {
    super(props);
        this.state = {
            calidad:[],
            efqm:[],
            componente1:'',
            componente2:'',
            componente3:''
        }
        this.myRef = React.createRef();
    }

    scrollToMyRef = () => {

        window.scrollTo({
            top:160,
            // behavior: "smooth" // optional
        });
    };

    componentDidMount(){
        this.getPageContent();
         this.scrollToMyRef()
    }

    getPageContent = ()=>{
             this.setState({loading:true});
             restClient.getContentById({id_page:4}).then(response=>{
              let componentesEfqm = [];
              let calidad = [];
              let efqm = [];
              let cover;
              console.log(response)
               response.data.map(data=>{
                         if(data.parametro=='componentes_efqm') {
                               data.key=`p-${data.id_contenido}`;
                               componentesEfqm.push(data);
                              }
                         if(data.parametro=='calidad') {
                             calidad=data;
                         }
                         if(data.parametro=='efqm') {
                             efqm=data;
                         }
                    })
               console.log(calidad.valor2)
               this.setState({calidad:calidad,
                              efqm:efqm,
                              componente1:componentesEfqm[0],
                              componente2:componentesEfqm[1],
                              componente3:componentesEfqm[2],
                              loading:false},()=>this.scrollToMyRef())
               }).catch(error=>{
                   this.setState({loading:false});
                   message.error(error.message);
             });
         }

  render() {
      const{calidad,componente1,componente2,componente3,efqm}=this.state
    return (
      <div>
         <Row type="flex" className="rowHeader">
                <Col md={12} xs={24}>
                <div class="headerBackground" style={{backgroundImage:`url(${calidad.valor1})`}}>
                       <div className="banner-caption">
                             Marilú de Ginatta, Directora General UEBD, y Gianluca Mule, EFQM COO.
                       </div>
                    </div>
                </Col>
                <Col md={12} xs={24} className="bgColorHeader">
                    <div className="headerText">
                     <div className="bigTitHeader acad shortTit pBottom">
                            CALIDAD
                     </div>
                      <p className="shortPar espaceTop calidad">
                          {calidad.valor2}
                      </p>
                    </div>
                </Col>
            </Row>

        <Row>
          <div className="calidadBox">
              <div className="calidadText"> 
                {calidad.valor3}
              </div>
          </div>
        </Row>

        <Row type="flex" className="rowCalidad">
           <Col md={6} xs={24} className="colCalidad">
              <div className="fqmBox">
                  <a href="http://www.efqm.org" className="greyText" target="_blank"><img src={efqmImg} className="efqmImg"></img></a>
              </div>
              
           </Col>
           <Col md={18} xs={24} className="colCalidad">
                <div className="boldTextFqm">
                    {efqm.valor1}
                <span className="textFqm">
                    {efqm.valor2}
                </span>
            </div>
            </Col>
        </Row>



          <Row>
            <div className="detailCalidad4Row">
              <div className="smallBarCalidad2"></div>
            </div>
          </Row>


        <Footer/>
      </div>
    );
  }
}

export default Calidad;
