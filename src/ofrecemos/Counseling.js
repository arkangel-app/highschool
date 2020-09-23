import React, { Component } from "react";
import { Form, Input, Modal, Button, Label,Alert,message,Select,Checkbox,DatePicker, Row, Col } from 'antd';
import draImg from '../images/dr-17.png';
import Footer from '../Footer2'
import restClient from '../network/restClient';
class DptoMedico extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            data:'',
            textos:'',
            tipos:[]
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
             restClient.getContentById({id_page:11}).then(response=>{
              let tipos = [];
              let textos = '';
               response.data.map(tipo=>{
                 if(tipo.parametro=='examples') {
                       tipo.key=`p-${tipo.id_contenido}`;
                       tipos.push(tipo);
                      }
                  if(tipo.parametro=='counseling_parrafos') {
                      textos = tipo
                   }    
                    })
               this.setState({ data:response.data[0],
                               tipos:tipos,
                               textos,
                               loading:false},()=>this.scrollToMyRef())
               }).catch(error=>{
                   this.setState({loading:false});
             });
    }

  render() {
    const{data,tipos}=this.state

    return (
     <div class="wrapper">
       <Row type="flex" className="rowHeader">
                <Col md={12} xs={24}>
                <div class="headerBackground" style={{backgroundImage:`url(${data.valor1})`}}>

                    </div>
                </Col>
                <Col md={12} xs={24} className="bgColorHeader">
                    <div className="headerText">
                     <div className="bigTitHeader acad shortTit">
                     COUNSELING
                     </div>
                      <p className="shortPar espaceTop forma">
                          {data.valor2}
                      </p>
                    </div>
                </Col>
            </Row>

         <Row type="flex" gutter={[48, 16]} className="rowcounse">
             <Col md={12} xs={24}>
                 <div className="parrBox counse left">
                   {this.state.textos.valor1}
                 </div>
             </Col>
             <Col md={12} xs={24}>

                 <div className="parrBox counse right">
            {this.state.textos.valor2}
                </div>
            </Col>


        </Row>

        <Row type="flex" className="counRow" gutter={[48, 16]}>
            {tipos.map(tipo=>
                <Col md={8} xs={24} className="counCol">
                    <div class="medicServiceCard coun">

                        <div class="lightTextGray count">
                            {tipo.valor1}
                        </div>
                    </div>
                </Col>
            )}
        </Row>

        <Row type="flex" >
            <Col md={24} xs={24}>

                <div className="parrBox counse last">
                        {this.state.textos.valor3}
                </div>
           </Col>
        </Row>

        <Footer/>
     </div>
    )
    }
}

export default DptoMedico;
